import phMark from "@/assets/php-mark.png.asset.json";

const links = ["Services", "Industries", "Meet the Pals", "Resources", "Locations"];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-center gap-3">
        <a
          href="#top"
          aria-label="Palmer House Productions home"
          className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-soft sm:flex"
        >
          <img src={phMark.url} alt="Palmer House Productions" className="size-8 object-contain" />
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-2 shadow-soft backdrop-blur md:flex">
          {links.map((l) => (
            <a
              key={l}
              href="#features"
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </div>

        <a
          href="#pricing"
          className="relative rounded-full p-[1.5px] shadow-soft"
          style={{ backgroundColor: "var(--spotlight)" }}
        >
          <span className="block rounded-full bg-card px-5 py-2.5 text-sm font-semibold">
            Contact
          </span>
        </a>
      </nav>
    </header>
  );
}
