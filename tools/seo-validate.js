#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bizitsolutions.com.au";
const SKIP_DIRS = new Set([".git", ".agents", "node_modules"]);
const SITEMAP_EXCLUDE = new Set([
  "business-it-support.html",
  "it-security.html",
  "managed-services.html",
  "microsoft-365.html",
  "microsoft-azure.html",
  "seo-google-ads.html",
  "web-design-services.html",
]);

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

for (const file of htmlFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const html = fs.readFileSync(file, "utf8");
  const label = rel;
  const cleanUrl = `${SITE}${cleanUrlForFile(file)}`;

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) failures.push(`${label}: missing title tag`);

  const metaDescription = html.match(/<meta\s+[^>]*name=["']description["'][^>]*>/i);
  if (!metaDescription || !getAttr(metaDescription[0], "content")) {
    failures.push(`${label}: missing meta description`);
  }

  const h1s = [...html.matchAll(/<h1\b[^>]*>/gi)];
  if (h1s.length !== 1) failures.push(`${label}: expected one H1, found ${h1s.length}`);

  const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i);
  if (!canonical || !getAttr(canonical[0], "href")) failures.push(`${label}: missing canonical tag`);

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

  if (!sitemapUrls.has(cleanUrl) && !rel.includes("/") && !SITEMAP_EXCLUDE.has(rel)) {
    failures.push(`${label}: canonical clean URL is missing from sitemap.xml`);
  }

  for (const match of html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const target = internalPath(match[1], file);
    if (target && !routeExists(target, fileSet)) {
      failures.push(`${label}:${lineOf(html, match.index)} broken internal link ${match[1]}`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const alt = getAttr(match[0], "alt");
    if (!alt) failures.push(`${label}:${lineOf(html, match.index)} image missing alt text`);
  }
}

if (failures.length) {
  console.error(`SEO validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${htmlFiles.length} HTML file(s).`);
