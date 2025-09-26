## Cloudflare Security & DNS Rules

DNS Rules: CNAME @ to cname.vercel-dns.com (Proxy OFF); CNAME www to cname.vercel-dns.com (Proxy OFF).
WAF Rules: Block bots (Bot Fight Mode ON); Challenge suspicious traffic (Security Level: Medium).
SSL Rules: Full (strict) encryption; Always Use HTTPS; Automatic Rewrites ON.
Rate Limiting Rule: Limit API requests to 100/min per IP for /api/*.
Page Rules: Cache everything for static assets; Minify JS/CSS/HTML.
