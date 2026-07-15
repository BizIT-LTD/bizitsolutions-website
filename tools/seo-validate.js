#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bizitsolutions.com.au";
const SKIP_DIRS = new Set([".git", ".agents", "node_modules"]);
const REQUIRED_FAVICON = "/assets/images/bizitFavicon400x400.png";

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return SKIP_DIRS.has(entry.name) ? [] : walk(full);
    }
    return entry.isFile() && entry.name.endsWith(".html") ? [full] : [];
  });
}

function cleanUrlForFile(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}`;
  return `/${rel.slice(0, -".html".length)}`;
}

function routeExists(urlPath, files) {
  if (!urlPath || urlPath.startsWith("#")) return true;
  const stripped = urlPath.split("#")[0].split("?")[0];
  if (!stripped || stripped === "/") return files.has("index.html");
  const noSlash = stripped.replace(/^\/+|\/+$/g, "");
  return files.has(`${noSlash}.html`) || files.has(`${noSlash}/index.html`);
}

function getAttr(tag, attr) {
  const re = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, "i");
  const match = tag.match(re);
  return match ? match[1].trim() : "";
}

function internalPath(value, currentFile) {
  if (!value || /^(mailto:|tel:|javascript:|#)/i.test(value)) return null;
  try {
    if (/^https?:\/\//i.test(value)) {
      const parsed = new URL(value);
      return parsed.origin === SITE ? `${parsed.pathname}${parsed.search}${parsed.hash}` : null;
    }
  } catch {
    return null;
  }
  if (value.startsWith("/")) return value;
  const base = path.posix.dirname(cleanUrlForFile(currentFile));
  return path.posix.normalize(`${base}/${value}`);
}

function lineOf(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

const htmlFiles = walk(ROOT);
const fileSet = new Set(htmlFiles.map((file) => path.relative(ROOT, file).replace(/\\/g, "/")));
const sitemapPath = path.join(ROOT, "sitemap.xml");
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim()));
const failures = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();

function remember(map, value, label) {
  if (!value) return;
  const key = value.replace(/\s+/g, " ").trim().toLowerCase();
  const existing = map.get(key) || [];
  existing.push(label);
  map.set(key, existing);
}

for (const file of htmlFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const html = fs.readFileSync(file, "utf8");
  const label = rel;
  const cleanUrl = `${SITE}${cleanUrlForFile(file)}`;

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) failures.push(`${label}: missing title tag`);
  remember(titles, title, label);

  const metaDescription = html.match(/<meta\s+[^>]*name=["']description["'][^>]*>/i);
  if (!metaDescription || !getAttr(metaDescription[0], "content")) {
    failures.push(`${label}: missing meta description`);
  }
  const descriptionContent = metaDescription ? getAttr(metaDescription[0], "content") : "";
  remember(descriptions, descriptionContent, label);

  const h1s = [...html.matchAll(/<h1\b[^>]*>/gi)];
  if (h1s.length !== 1) failures.push(`${label}: expected one H1, found ${h1s.length}`);

  const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i);
  if (!canonical || !getAttr(canonical[0], "href")) failures.push(`${label}: missing canonical tag`);

  const favicon = [...html.matchAll(/<link\s+[^>]*rel=["']icon["'][^>]*>/gi)];
  if (favicon.length !== 1 || getAttr(favicon[0]?.[0] || "", "href") !== REQUIRED_FAVICON) {
    failures.push(`${label}: expected one favicon link to ${REQUIRED_FAVICON}`);
  }
  const appleTouchIcon = [...html.matchAll(/<link\s+[^>]*rel=["']apple-touch-icon["'][^>]*>/gi)];
  if (appleTouchIcon.length !== 1 || getAttr(appleTouchIcon[0]?.[0] || "", "href") !== REQUIRED_FAVICON) {
    failures.push(`${label}: expected one apple-touch-icon link to ${REQUIRED_FAVICON}`);
  }
  if (/\/favicon\.ico(?:["'?]|$)/i.test(html)) failures.push(`${label}: contains old /favicon.ico reference`);

  for (const property of ["og:type", "og:title", "og:description", "og:url"]) {
    const found = new RegExp(`<meta\\s+[^>]*property=["']${property}["'][^>]*>`, "i").test(html);
    if (!found) failures.push(`${label}: missing Open Graph ${property}`);
  }

  for (const match of html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1].trim());
    } catch (error) {
      failures.push(`${label}:${lineOf(html, match.index)} invalid JSON-LD (${error.message})`);
    }
  }

  if (!sitemapUrls.has(cleanUrl)) failures.push(`${label}: clean URL is missing from sitemap.xml`);

  for (const match of html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const target = internalPath(match[1], file);
    if (target && !routeExists(target, fileSet)) {
      failures.push(`${label}:${lineOf(html, match.index)} broken internal link ${match[1]}`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const hasAlt = /\balt\s*=\s*["'][^"']*["']/i.test(match[0]);
    const decorative = /\b(?:aria-hidden\s*=\s*["']true["']|role\s*=\s*["']presentation["'])/i.test(match[0]);
    if (!hasAlt && !decorative) failures.push(`${label}:${lineOf(html, match.index)} image missing alt text`);
    if (!/\bwidth\s*=/i.test(match[0]) || !/\bheight\s*=/i.test(match[0])) {
      warnings.push(`${label}:${lineOf(html, match.index)} image has no explicit width and height`);
    }
  }
}

for (const [title, files] of titles) {
  if (files.length > 1) failures.push(`duplicate title "${title}" in ${files.join(", ")}`);
}
for (const [description, files] of descriptions) {
  if (files.length > 1) failures.push(`duplicate meta description "${description}" in ${files.join(", ")}`);
}

if (failures.length) {
  console.error(`SEO validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${htmlFiles.length} HTML file(s).`);
if (warnings.length) {
  console.warn(`SEO validation completed with ${warnings.length} warning(s):`);
  for (const warning of warnings) console.warn(`- ${warning}`);
}
