import { portfolio } from "@/lib/portfolio";

export function Socials({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {portfolio.socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.link}
            target={social.link.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="text-sm underline-offset-4 opacity-60 transition-opacity hover:opacity-100 hover:underline"
          >
            {social.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
