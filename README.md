# WhoInventedBitcoin.com — Static restoration

Restored from April 2026 website files, May 2026 homepage/SEO updates and SQLite published blog content.

## Deploy on Cloudflare Pages
1. Create a GitHub repository (prefer **private**). Upload the contents of this folder to its root.
2. In Cloudflare, choose Workers & Pages → Create → Pages → Connect to Git → select repo.
3. Framework preset: None. Build command: **leave blank**. Build output directory: `/` (repository root).
4. Test the temporary `*.pages.dev` URL.
5. Add custom domain `whoinventedbitcoin.com` and `www.whoinventedbitcoin.com`, configure DNS and choose canonical redirect.
6. Check that email DNS records (MX, SPF, DKIM) are preserved.

## Notes
- No PHP, database, admin panel, API credentials or private configuration included.
- The static blog currently contains the published article exported from the backup.
- Original `/blog/<slug>` URLs may be served extensionlessly by Cloudflare Pages. Verify after deployment.
- Contact form sends to third-party FormSubmit, which may require email verification.
- External Google Analytics, AdSense, Google Fonts and Font Awesome dependencies may require consent/privacy review.
- Revoke all hosting, database, admin and API passwords/keys exposed to the prior hacked host.
- This package is a migration candidate, not a guarantee of malware-free operation.
