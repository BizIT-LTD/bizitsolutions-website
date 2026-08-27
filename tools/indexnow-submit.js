#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const HOST = "bizitsolutions.com.au";
const SITE = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_FILE = "indexnow-key.txt";
const KEY_PATH = path.join(ROOT, KEY_FILE);

function printUsage() {
  console.log(`Usage:
  node tools/indexnow-submit.js /contact /services
  node tools/indexnow-submit.js contact.html blog/index.html
  node tools/indexnow-submit.js https://bizitsolutions.com.au/contact
  node tools/indexnow-submit.js

With no URL arguments, changed and untracked HTML files reported by Git are submitted.`);
}

function gitFiles(args) {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" })
      .split(/\r?\n/)
      .filter(Boolean);
  } catch (error) {
    throw new Error(`Unable to inspect Git changes: ${error.message}`);
  }
}

function changedHtmlFiles() {
  const tracked = gitFiles(["diff", "--name-only", "--diff-filter=AM", "HEAD", "--"]);
  const untracked = gitFiles(["ls-files", "--others", "--exclude-standard"]);
  return [...new Set([...tracked, ...untracked])].filter((file) => /(?:^|\/)index\.html$|\.html$/i.test(file));
}

function toUrl(input) {
  let value = input.trim().replace(/\\/g, "/");
  if (/^https?:\/\//i.test(value)) {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== HOST || url.port) {
      throw new Error(`URL must use ${SITE}: ${input}`);
    }
    url.hash = "";
    return url.href;
  }

  value = value.replace(/^\.\//, "").replace(/^\//, "");
  if (/^index\.html$/i.test(value)) {
    value = "";
  } else if (/(?:^|\/)index\.html$/i.test(value)) {
    value = value.replace(/index\.html$/i, "");
  } else if (/\.html$/i.test(value)) {
    value = value.replace(/\.html$/i, "");
  }

  return new URL(`/${value}`, `${SITE}/`).href;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    printUsage();
    return;
  }

  const inputs = args.length ? args : changedHtmlFiles();
  const urlList = [...new Set(inputs.map(toUrl))];
  if (!urlList.length) {
    console.log("No changed or new website HTML URLs to submit.");
    return;
  }

  const key = fs.readFileSync(KEY_PATH, "utf8").trim();
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    throw new Error(`${KEY_FILE} does not contain a valid IndexNow key.`);
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `${SITE}/${KEY_FILE}`,
      urlList
    })
  });
  const responseBody = await response.text();

  console.log(`Submitted ${urlList.length} URL(s) to ${ENDPOINT}`);
  urlList.forEach((url) => console.log(`- ${url}`));
  console.log(`HTTP ${response.status} ${response.statusText}`);
  if (responseBody) console.log(responseBody);

  if (!response.ok) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
