import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  ...props,
});

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M23.5 6.9a3 3 0 0 0-2.1-2.1C19.5 4.3 12 4.3 12 4.3s-7.5 0-9.4.5A3 3 0 0 0 .5 6.9 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.1 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.1ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.8-.1Zm0 3.1A6.7 6.7 0 1 0 18.7 12 6.7 6.7 0 0 0 12 5.3Zm0 11A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3Zm6.9-11.2a1.6 1.6 0 1 1-1.6-1.6 1.6 1.6 0 0 1 1.6 1.6Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M16.6 2h-3.2v13.2a2.6 2.6 0 1 1-2.6-2.6c.2 0 .5 0 .7.1V9.4a6 6 0 0 0-.7 0 5.8 5.8 0 1 0 5.8 5.8V8.7a7 7 0 0 0 4.1 1.3V6.8a3.9 3.9 0 0 1-4.1-3.8V2Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8.1 18.7H5.2V9.6h2.9ZM6.6 8.3a1.7 1.7 0 1 1 1.7-1.7 1.7 1.7 0 0 1-1.7 1.7Zm12.1 10.4h-2.9v-4.4c0-1.1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3v4.5H9.8V9.6h2.7v1.2h.1a3 3 0 0 1 2.7-1.5c2.9 0 3.4 1.9 3.4 4.3Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9a15 15 0 0 1 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export function ThreadsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M16.9 11.2a6.5 6.5 0 0 0-.6-.3c-.2-2.7-1.7-4.2-4.2-4.2a4.1 4.1 0 0 0-3.6 1.9l1.4.9a2.4 2.4 0 0 1 2.2-1.2c1.4 0 2.3.7 2.5 2.1a9 9 0 0 0-2.3-.2c-2.4.1-3.9 1.4-3.8 3.2a2.9 2.9 0 0 0 1.2 2.3 3.7 3.7 0 0 0 2.3.7c1.9-.1 3.1-1.3 3.4-3.2a3 3 0 0 1 1.3 2.5c0 1.7-1.5 3.7-4.7 3.7-3.2 0-5-1.9-5-6.4S8.7 6.6 12 6.6c2.4 0 4.1 1 5 2.9l1.5-.8C17.3 6.2 15 4.9 12 4.9 7.6 4.9 5 7.7 5 12.9S7.6 21 12 21c3.9 0 6.4-2.4 6.4-5.4a4.3 4.3 0 0 0-1.5-3.4Zm-4.7 3.6c-.9.1-1.8-.3-1.9-1.2 0-.7.5-1.4 1.9-1.5h.5a7.3 7.3 0 0 1 1.7.2c-.2 1.7-1 2.4-2.2 2.5Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.6 21H2.5l7-8-6.7-10h6.1l4.3 5.6ZM16.4 19.2h1.7L8.1 4.7H6.3Z" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export type PlatformKey =
  | "youtube"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "facebook"
  | "threads"
  | "x"
  | "email"
  | "website"
  | "social";

export const platformMeta: Record<
  PlatformKey,
  { label: string; icon: (props: IconProps) => JSX.Element; brand: string; tint: string }
> = {
  youtube: { label: "YouTube", icon: YouTubeIcon, brand: "#FF0033", tint: "#FFECEF" },
  instagram: { label: "Instagram", icon: InstagramIcon, brand: "#D62976", tint: "#FDECF4" },
  tiktok: { label: "TikTok", icon: TikTokIcon, brand: "#111111", tint: "#F1F1F1" },
  linkedin: { label: "LinkedIn", icon: LinkedInIcon, brand: "#0A66C2", tint: "#E8F1FB" },
  facebook: { label: "Facebook", icon: FacebookIcon, brand: "#1877F2", tint: "#E8F1FE" },
  threads: { label: "Threads", icon: ThreadsIcon, brand: "#111111", tint: "#F1F1F1" },
  x: { label: "X", icon: XIcon, brand: "#111111", tint: "#F1F1F1" },
  email: { label: "Email", icon: MailIcon, brand: "#7C5CFF", tint: "#F0EBFF" },
  website: { label: "Website", icon: GlobeIcon, brand: "#0F766E", tint: "#E6F4F2" },
  social: { label: "Social", icon: GlobeIcon, brand: "#111111", tint: "#F1F1F1" },
};

export function platformInfo(key: string) {
  return platformMeta[(key as PlatformKey) in platformMeta ? (key as PlatformKey) : "social"];
}
