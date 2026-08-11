import type { Service } from "@/types/portfolio";

// portfolio.json stores the repo URL inline in the description, e.g.
// "… goals (https://github.com/junwonkim07/ZYMBROS.)". Split it back out so the
// card can link, instead of printing a bare URL in body text.
function splitDescription(description: string) {
  const match = description.match(/\((https?:\/\/[^\s)]+)\)\s*$/);
  if (!match) return { text: description.trim(), url: undefined };
  return { text: description.slice(0, match.index).trim(), url: match[1] };
}

/**
 * Plain bordered cards, as originally built. The spotlight/gradient-border and
 * pixel-field versions were both tried and dropped; this is a server component
 * again because nothing here needs the client.
 */
export function ProjectsGrid({ services }: { services: Service[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {services.map((service) => {
        const { text, url } = splitDescription(service.description);
        const Card = url ? "a" : "div";

        return (
          <li key={service.id}>
            <Card
              {...(url
                ? { href: url, target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="border-foreground/10 hover:border-foreground/30 bg-background flex h-full flex-col rounded-2xl border p-6 transition-colors"
            >
              <h3 className="t-h3">{service.title}</h3>
              <p className="t-meta mt-2 opacity-60">{text}</p>
              {url && (
                <span className="t-meta mt-auto pt-4 text-[0.7rem] opacity-40">
                  {url.replace(/^https?:\/\//, "")}
                </span>
              )}
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
