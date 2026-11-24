import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { showPlaceholderFlags, site, whatsappHref } from "@/config/site";

type Variant = "primary" | "sun" | "outline" | "night-outline" | "ghost";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 px-5 py-3 font-semiwide text-[0.9375rem] font-semibold leading-tight transition-[background-color,color,border-color,box-shadow] duration-200 ease-[var(--ease-out-expo)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-night-2",
  sun: "bg-sun text-ink hover:bg-sun-hover shadow-[0_1px_0_var(--color-ink)]",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  "night-outline": "border border-moon text-white hover:bg-paper hover:text-ink",
  ghost: "text-ink underline decoration-1 underline-offset-4 hover:decoration-2 px-0",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  arrow = true,
  className = "",
  children,
  ...rest
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean; children: ReactNode }) {
  const external = typeof href === "string" && /^https?:|^tel:|^mailto:/.test(href);
  const Icon = arrow ? <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /> : null;
  if (external) {
    return (
      <a href={href as string} className={buttonClass(variant, className)} {...(rest as ComponentProps<"a">)}>
        {children}
        {Icon}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
      {Icon}
    </Link>
  );
}

export function WhatsAppButton({
  variant = "outline",
  label = "Talk to us on WhatsApp",
  message,
  className = "",
}: {
  variant?: Variant;
  label?: string;
  message?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass(variant, className)}
    >
      <span aria-hidden className="relative inline-flex size-[1.1rem] items-center justify-center">
        <MessageCircle className="size-[1.1rem]" />
        <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-sun ring-1 ring-current" />
      </span>
      {label}
      <span className="sr-only"> (opens WhatsApp)</span>
    </a>
  );
}

export function CallButton({ variant = "outline", className = "" }: { variant?: Variant; className?: string }) {
  const main = site.contact.phones[0];
  return (
    <a href={`tel:${main.tel}`} className={buttonClass(variant, className)}>
      <Phone aria-hidden className="size-[1.1rem]" />
      Call {main.display}
    </a>
  );
}

/** Visible marker for unconfirmed facts and sample content. */
export function Todo({ children = "To confirm", show = true }: { children?: ReactNode; show?: boolean }) {
  if (!showPlaceholderFlags || !show) return null;
  return <span className="todo-flag">{children}</span>;
}

export function SampleTag({ children = "Sample" }: { children?: ReactNode }) {
  if (!showPlaceholderFlags) return null;
  return <span className="todo-flag">{children}</span>;
}

/** Inline text link with a 44px-tall hit area that doesn't change the text's look. */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2 ${className}`}>
      {children}
    </Link>
  );
}

/**
 * Closing band for the end of a page: the night ground, one sentence, and the three ways to reach a person.
 * Every long page ends here so no page runs straight into the footer.
 */
export function CloseBand({
  title = "Tell us what you need to keep running.",
  lede = "Send your appliances and hours of backup, or a site's load profile, and an engineer will come back to you with a recommendation. Phone and online consultations are free.",
  quoteHref = "/contact",
  quoteLabel = "Get a Quote",
}: {
  title?: string;
  lede?: string;
  quoteHref?: string;
  quoteLabel?: string;
}) {
  return (
    <section className="on-night bg-night text-white" aria-labelledby="close-title">
      <HourRule night />
      <div className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <h2 id="close-title" className="h-chapter max-w-[20ch]">{title}</h2>
          <p className="mt-5 max-w-[50ch] text-lg text-moon">{lede}</p>
        </div>
        <div className="flex flex-col gap-3">
          <ButtonLink href={quoteHref} variant="sun">{quoteLabel}</ButtonLink>
          <WhatsAppButton variant="night-outline" />
          <CallButton variant="night-outline" />
        </div>
      </div>
    </section>
  );
}

/**
 * Full-width photographic hero: the photograph fills the band edge to edge and a green-black scrim
 * keeps the white text legible (from the left on desktop, from the bottom on phones).
 */
export function PhotoHero({
  photo,
  tall = false,
  labelledBy,
  as: Tag = "header",
  children,
}: {
  photo: PhotoData;
  tall?: boolean;
  labelledBy?: string;
  as?: "header" | "section";
  children: ReactNode;
}) {
  return (
    <Tag className="on-night relative isolate overflow-hidden bg-night text-white" aria-labelledby={labelledBy}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: photo.focus ?? "50% 50%" }}
      />
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
      <div
        className={`container-x flex flex-col justify-end pt-44 pb-12 sm:pt-56 sm:pb-16 lg:justify-center lg:py-24 ${
          tall ? "min-h-[min(86svh,50rem)]" : "lg:min-h-[32rem]"
        }`}
      >
        <div className="max-w-[44rem]">{children}</div>
      </div>
    </Tag>
  );
}

/**
 * Inner-page header. With a photograph it is a full-width photographic hero with the text on the
 * image; without one (legal pages) it is a quiet concrete band.
 */
export function PageHeader({
  title,
  lede,
  children,
  aside,
  photo,
}: {
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  photo?: PhotoData;
}) {
  if (photo) {
    return (
      <PhotoHero photo={photo}>
        <h1 className="h-page max-w-[18ch] text-white">{title}</h1>
        {lede ? <p className="mt-5 max-w-[54ch] text-lg text-white/90 sm:text-xl">{lede}</p> : null}
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        {aside ? <div className="mt-8">{aside}</div> : null}
      </PhotoHero>
    );
  }
  return (
    <header className="chart-field-faint border-b border-grid">
      <div className="container-x grid gap-8 pt-12 pb-12 sm:pt-16 lg:grid-cols-[1fr_auto] lg:items-center lg:pb-16">
        <div className="lg:self-end">
          <h1 className="h-page max-w-[18ch]">{title}</h1>
          {lede ? <p className="mt-5 max-w-[56ch] text-lg text-ink-2 sm:text-xl">{lede}</p> : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
          {aside ? <div className="mt-8">{aside}</div> : null}
        </div>
      </div>
    </header>
  );
}

/** Former section divider. The pattern was removed at the client's request; kept as a no-op so call sites stay valid. */
export function HourRule(_: { night?: boolean } = {}) {
  void _;
  return null;
}

type PhotoData = {
  src: string;
  width: number;
  height: number;
  alt: string;
  focus?: string;
  credit: { author?: string; site: string; source: string; license: string; licenseUrl?: string };
};

/** A photograph, cropped to `ratio` around the photo's focal point. Credits live in src/content/photos.ts. */
export function Photo({
  photo,
  ratio = "aspect-[4/3]",
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  photo: PhotoData;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="relative">
        <div className={`relative overflow-hidden bg-chart ${ratio}`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={{ objectPosition: photo.focus ?? "50% 50%" }}
          />
        </div>
      </div>
    </figure>
  );
}

export function SectionTitle({
  id,
  children,
  lede,
  className = "",
  as: Tag = "h2",
}: {
  id?: string;
  children: ReactNode;
  lede?: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className={`min-w-0 max-w-[62ch] ${className}`}>
      <Tag id={id} className="h-section">
        {children}
      </Tag>
      {lede ? <p className="mt-4 text-lg text-current/80">{lede}</p> : null}
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw; content is our own config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
