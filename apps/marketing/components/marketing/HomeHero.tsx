import { ButtonLink } from "@/components/ui/Button";
import { brand } from "@/config/brand";
import { PRIMARY_CTA } from "@/config/site";

/** The big idea, with the last line in volt. */
export function BigIdea({
  as: Tag = "h1",
  size = "xl",
  className = "",
}: {
  as?: "h1" | "h2" | "p";
  size?: "xl" | "l";
  className?: string;
}) {
  const lines = brand.bigIdea.split(/(?<=\.)\s+/);
  return (
    <Tag className={`${size === "xl" ? "type-display-xl" : "type-display-l"} text-balance ${className}`}>
      {lines.map((line, i) => (
        <span key={line} className={`block ${i === lines.length - 1 ? "text-volt" : ""}`}>
          {line}
        </span>
      ))}
    </Tag>
  );
}

export default function HomeHero({ headingAs = "h1" }: { headingAs?: "h1" | "p" }) {
  return (
    <section className="bg-ink text-text">
      <div className="mx-auto flex w-full max-w-content flex-col gap-8 px-(--gutter) pt-10 pb-10 md:pt-16">
        <BigIdea as={headingAs} className="max-w-[1100px]" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <p className="max-w-[560px] type-body-l text-text-secondary">{brand.description}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={PRIMARY_CTA.href} size="lg">
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              Compare plans
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
