# Careers implementation report

## New pages and styles

- `careers/index.html`: branded Careers hero, existing business-consulting image, Current Opportunities card and clear contractor terms.
- `careers/independent-business-development-partner/index.html`: full JD content, engagement summary cards, application instructions and email CTAs.
- `assets/css/careers.css`: scoped responsive Careers layout and compact homepage card styles.

## Existing files changed

- `index.html`: compact We're Hiring card, Careers stylesheet and Company footer link.
- `sitemap.xml`: both new canonical URLs, including trailing slashes.
- `llms.txt`: Careers and role links with factual contractor description.
- `tools/seo-validate.js`: accept directory URLs with a trailing slash in the sitemap, preserving compatibility with existing URLs.

Company footer link only on the following existing files:

- `about.html`
- `backup-disaster-recovery-sydney.html`
- `blog/index.html`
- `book.html`
- `business-email-support-sydney.html`
- `cloud-services-sydney.html`
- `contact.html`
- `cyber-security-services-sydney.html`
- `endpoint-management-sydney.html`
- `essential-eight-consulting-sydney.html`
- `it-company-sydney.html`
- `it-consulting-sydney.html`
- `it-helpdesk-sydney.html`
- `it-project-management-sydney.html`
- `it-services-sydney.html`
- `it-support-north-shore-sydney.html`
- `it-support-sydney.html`
- `managed-it-services-sydney.html`
- `managed-service-provider-sydney.html`
- `microsoft-365-migration-sydney.html`
- `microsoft-365-support-sydney.html`
- `network-support-sydney.html`
- `onsite-it-support-sydney.html`
- `outsourced-it-support-sydney.html`
- `privacy/index.html`
- `remote-it-support-sydney.html`
- `seo-google-ads-sydney.html`
- `services.html`
- `small-business-it-support-sydney.html`
- `virtual-it-manager-sydney.html`
- `website-design-small-business-sydney.html`

- `blog/essential-eight-for-small-business.html`
- `blog/how-much-does-it-support-cost-in-sydney.html`
- `blog/how-to-choose-an-it-company-in-sydney.html`
- `blog/managed-it-services-vs-break-fix-it-support.html`
- `blog/microsoft-365-security-checklist-small-business.html`
- `blog/what-to-do-when-your-it-person-leaves.html`
- `booking/index.html`

## JD wording and formatting

Read the full `docs/JD-Independent-Business-Development-Partner.docx` before implementation. All opportunity/about paragraphs, 13 responsibilities, 8 required experience bullets, 4 desirable experience bullets, commercial arrangement paragraphs and application instructions are preserved verbatim.

- Display title: Independent Business Development Partner; the JD's full program title is retained as the role hero subtitle.
- Section headings use consistent title case; Required Skills and Experience is displayed as Required Skills & Experience.
- Engagement terms are split into labelled summary cards; Six months, with possible renewal is displayed across the term and its subtext.
- The How to apply prefix becomes a section heading; the application sentence is unchanged and its email becomes a mailto link.
- Careers intro, navigation labels, homepage card and sidebar guidance are web presentation copy based on the JD. No salary, commission percentage, benefits, territory or additional terms were added.

## SEO and structured data

Both new pages include unique titles, descriptions, canonical URLs, Open Graph tags and BreadcrumbList JSON-LD. JobPosting is omitted because the JD does not establish the original posting date or applicant geographic restrictions; these were not invented. Google reference: https://developers.google.com/search/docs/appearance/structured-data/job-posting

## Verification

- Chromium browser checks and screenshot review at 1440px, 820px and 390px for the homepage and both new pages.
- No horizontal overflow; imagery loads; Company footer links present; Careers absent from primary navigation.
- Mobile navigation toggles correctly and all Apply Now links use mailto:Careers@bizitsolutions.com.au.
- Automated source comparison confirms every JD body paragraph and bullet is preserved.
- Existing non-home HTML changes are limited to Company footer links. Existing homepage head content and primary navigation are preserved apart from the new stylesheet.
- node tools/seo-validate.js: passed for 41 HTML files.
- git diff --check: passed.

GA4, Clarity, forms, existing URLs and existing page SEO remain unchanged. The supplied JD is unchanged. No deployment was performed.

## Pre-deployment audit

- Total HTML files on disk: 41. Total HTML files validated: 41. No HTML files are excluded from this checkout's scan.
- All 39 existing HTML files tracked at HEAD remain at their original paths. No pages were deleted or moved by the Careers changes.
- The earlier 46-page snapshot predates commit efd17a9 (8 September 2026), which deliberately removed seven retired pages: business-it-support.html, it-security.html, managed-services.html, microsoft-365.html, microsoft-azure.html, seo-google-ads.html and web-design-services.html. Their redirects remain in .htaccess, which this work has not modified. Therefore: 46 - 7 + 2 Careers pages = 41.
- The validator's recursive walk and skip directories are unchanged from HEAD. Its only modification accepts trailing-slash directory URLs in sitemap.xml.
- Fixed omitted Careers links in six blog article footers and the booking footer. Each now has a Company heading for Careers; existing footer links remain.
- All 41 HTML pages have exactly one Careers footer link, and no duplicate footer hrefs.
- Both Careers routes exist and are listed in sitemap.xml and llms.txt. Homepage hiring link points to /careers/. All four application email links use mailto:Careers@bizitsolutions.com.au.
- Full-site internal link validation passed. SEO validation passed for all 41 pages. git diff --check passed.
- No deployment performed. Mailto targets are verified; mailbox delivery is not tested.

### Final files changed relative to HEAD

- `about.html`
- `assets/css/careers.css`
- `backup-disaster-recovery-sydney.html`
- `blog/essential-eight-for-small-business.html`
- `blog/how-much-does-it-support-cost-in-sydney.html`
- `blog/how-to-choose-an-it-company-in-sydney.html`
- `blog/index.html`
- `blog/managed-it-services-vs-break-fix-it-support.html`
- `blog/microsoft-365-security-checklist-small-business.html`
- `blog/what-to-do-when-your-it-person-leaves.html`
- `book.html`
- `booking/index.html`
- `business-email-support-sydney.html`
- `careers/independent-business-development-partner/index.html`
- `careers/index.html`
- `cloud-services-sydney.html`
- `contact.html`
- `cyber-security-services-sydney.html`
- `docs/careers-implementation-report.md`
- `endpoint-management-sydney.html`
- `essential-eight-consulting-sydney.html`
- `index.html`
- `it-company-sydney.html`
- `it-consulting-sydney.html`
- `it-helpdesk-sydney.html`
- `it-project-management-sydney.html`
- `it-services-sydney.html`
- `it-support-north-shore-sydney.html`
- `it-support-sydney.html`
- `llms.txt`
- `managed-it-services-sydney.html`
- `managed-service-provider-sydney.html`
- `microsoft-365-migration-sydney.html`
- `microsoft-365-support-sydney.html`
- `network-support-sydney.html`
- `onsite-it-support-sydney.html`
- `outsourced-it-support-sydney.html`
- `privacy/index.html`
- `remote-it-support-sydney.html`
- `seo-google-ads-sydney.html`
- `services.html`
- `sitemap.xml`
- `small-business-it-support-sydney.html`
- `tools/seo-validate.js`
- `virtual-it-manager-sydney.html`
- `website-design-small-business-sydney.html`

The supplied docs/JD-Independent-Business-Development-Partner.docx is an unchanged user-provided source, not an implementation edit.
