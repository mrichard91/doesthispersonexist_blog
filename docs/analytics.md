# Traffic statistics

Cloudflare Web Analytics is enabled through the Cloudflare Pages project. Tracking begins with the analytics-enabled deployment on November 2, 2026. It uses the account’s existing `doesthispersonexist.com` analytics site; filter by **Host = `blog.doesthispersonexist.com`** to see this blog separately from other subdomains.

## View the statistics

1. Open [Cloudflare Web Analytics](https://dash.cloudflare.com/656a018a3eb026f03468c9146f110e0a/web-analytics).
2. Select `doesthispersonexist.com`.
3. Filter **Host** to `blog.doesthispersonexist.com`.
4. Choose a time range to inspect trends, or filter a **Path** to inspect a particular article.

The dashboard includes visits, page views, referrers, popular paths, countries, device/browser information, and loading-performance metrics. Visits are not unique people: Cloudflare defines a visit as a page view from another website or a direct link, and one visit can include multiple page views.

Cloudflare currently retains a rolling **six months** of Web Analytics data. It is not an indefinite archive. Data can take a few minutes to appear; historical visits before instrumentation was enabled cannot be reconstructed by this browser beacon. Browser tracking blockers and JavaScript-disabled visits can be absent, and older aggregate data can be sampled. Verification visits from this setup are included.

## How it is installed

- The Pages project’s `build_config.web_analytics_tag` is `23f8bcc1f25642bfb670fff7cab35ede`.
- Cloudflare holds the matching beacon token in the Pages configuration and injects the script on deployments. Do not add a second snippet to the templates.
- `public/_headers` permits the Cloudflare beacon CDN and collection endpoint in the Content Security Policy.
- All blog content still builds to static HTML. There is no analytics API, database, or custom backend in this repository. Analytics reports remain in the private Cloudflare account dashboard.
- The analytics settings belong to the existing zone; do not disable the zone’s analytics to change only this blog. To stop tracking this Pages project, remove its `web_analytics_tag` and `web_analytics_token` settings and redeploy, then verify the blog no longer includes a beacon.

## References

- [Pages Web Analytics setup](https://developers.cloudflare.com/pages/how-to/web-analytics/)
- [Metrics and definitions](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/)
- [Dimensions and filters](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/)
- [Retention, sampling, CSP, and tracking limitations](https://developers.cloudflare.com/web-analytics/faq/)
