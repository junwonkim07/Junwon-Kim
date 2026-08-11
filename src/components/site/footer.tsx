import { Socials } from "@/components/site/socials";
import { portfolio } from "@/lib/portfolio";

export function Footer() {
  return (
    // Opaque: the site-wide pixel canvas is meant to read behind the hero only.
    <footer className="bg-background relative">
      <div className="mx-auto w-full max-w-7xl px-5 pt-24 pb-10 sm:px-8">
        <h2 className="t-h2">Contact.</h2>
        <Socials className="mt-8" />

        <div className="border-foreground/10 mt-16 flex flex-col gap-1 border-t pt-6 text-xs opacity-40">
          <p>
            © {new Date().getFullYear()} {portfolio.name}. All Rights Reserved.
          </p>
          {/* Required by the Skiper UI free-tier licence. Do not remove unless a
              Skiper UI Pro licence is purchased. */}
          <p>
            UI components by{" "}
            <a
              href="https://skiper-ui.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Skiper UI
            </a>{" "}
            and{" "}
            <a
              href="https://componentry.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Componentry
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
