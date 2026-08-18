// The apex is the VPN panel's; the site has its own subdomain.
// No trailing slash: every consumer appends a path that starts with "/".
// The 3.0 site shipped "https://…app/" here and emitted "//blog/x" everywhere.
export const SITE_URL = "https://im.junwonkim.org";

export const GA_MEASUREMENT_ID = "G-FXZ35BV5QG";
export const ADSENSE_CLIENT = "ca-pub-4942977426656768";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
