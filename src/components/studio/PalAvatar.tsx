import { resolveGuide, type GuideProfile } from "@/lib/pal-directory";

type Size = "xs" | "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  xs: "size-7",
  sm: "size-10",
  md: "size-14",
  lg: "size-24",
};

export function PalAvatar({
  pal,
  size = "sm",
  className = "",
  ring = true,
}: {
  pal?: string | null | GuideProfile;
  size?: Size;
  className?: string;
  ring?: boolean;
}) {
  const guide = typeof pal === "object" && pal !== null ? pal : resolveGuide(pal as string | null);
  const initials = guide.name.slice(0, 1).toUpperCase();
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${sizes[size]} ${className}`}
      style={{
        background: guide.soft,
        boxShadow: ring ? `inset 0 0 0 1.5px ${guide.color}` : undefined,
      }}
      aria-hidden="true"
    >
      {guide.avatar ? (
        <img
          src={guide.avatar}
          alt=""
          className="size-full scale-110 object-cover object-top"
          loading="lazy"
        />
      ) : (
        <span className="text-xs font-black" style={{ color: guide.color }}>
          {initials}
        </span>
      )}
    </span>
  );
}
