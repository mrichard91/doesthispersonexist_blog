# Traffic statistics

Cloudflare Web Analytics is enabled through the existing domain-level automatic injection setting. Tracking begins with the analytics-enabled deployment on November 2, 2026. It uses the account’s existing `doesthispersonexist.com` analytics site; filter by **Host = `blog.doesthispersonexist.com`** to see this blog separately from other subdomains.

## View the statistics

1. Open [Cloudflare Web Analytics](https://dash.cloudflare.com/656a018a3eb026f03468c9146f110e0a/web-analytics).
2. Select `doesthispersonexist.com`.
3. Filter **Host** to `blog.doesthispersonexist.com`.
4. Choose a time range to inspect trends, or filter a **Path** to inspect a particular article.

The dashboard includes visits, page views, referrers, popular paths, countries, device/browser information, and loading-performance metrics. Visits are not unique people: Cloudflare defines a visit as a page view from another website or a direct link, and one visit can include multiple page views.

Cloudflare currently retains a rolling **six months** of Web Analytics data. It is not an indefinite archive. Data can take a few minutes to appear; historical visits before instrumentation was enabled cannot be reconstructed by this browser beacon. Browser tracking blockers and JavaScript-disabled visits can be absent, and older aggregate data can be sampled. Verification visits from this setup are included.

## How it is installed

- The existing domain analytics site ID is `23f8bcc1f25642bfb670fff7cab35ede`, with automatic injection enabled for `doesthispersonexist.com`.
- Cloudflare injects one beacon at the domain edge for eligible browser visits. The separate Pages analytics-injection fields remain unset so the same page does not receive a second beacon. Do not add a snippet to the templates.
- `public/_headers` permits the Cloudflare beacon CDN in the Content Security Policy. Collection uses the blog’s own `/cdn-cgi/rum` endpoint, allowed by `connect-src 'self'`. This policy change allows the existing domain integration to run on the blog.
- All blog content still builds to static HTML. There is no analytics API, database, or custom backend in this repository. Analytics reports remain in the private Cloudflare account dashboard.
- The analytics settings also serve other subdomains; do not disable the zone’s analytics to change only this blog. Use Cloudflare Web Analytics host/path rules if you later need to exclude this blog.
- Command-line requests and bots may receive HTML without an injected beacon. Verify using a real browser, checking that only one beacon is present and that its reporting request is accepted.

## Verification

The live browser received exactly one analytics beacon. Its script loaded successfully, and its `POST` to `https://blog.doesthispersonexist.com/cdn-cgi/rum` returned HTTP **204**. Cloudflare confirmed the deployment uses no Pages Functions. The separate Pages beacon injection is disabled to avoid duplicate collection.

## References

- [Pages Web Analytics setup](https://developers.cloudflare.com/pages/how-to/web-analytics/)
- [Metrics and definitions](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/)
- [Dimensions and filters](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/)
- [Retention, sampling, CSP, and tracking limitations](https://developers.cloudflare.com/web-analytics/faq/)
