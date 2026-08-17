/**
 * Custom asset illustrations.
 *
 * Every library card gets a generated, on-brand illustration instead of a flat
 * placeholder. To add or change a motif, edit ASSET_MOTIFS below: give it a
 * `keywords` list (matched against the asset title/content), a lane color, and
 * a `draw` function that returns SVG children inside a 320x180 viewBox.
 */

type MotifContext = {
  color: string;
  soft: string;
  /** 0-1 deterministic seed derived from the asset title — vary spacing, counts, offsets. */
  seed: number;
};

type Motif = {
  id: string;
  label: string;
  keywords: string[];
  kinds?: string[];
  color: string;
  soft: string;
  draw: (ctx: MotifContext) => React.ReactNode;
};

const LANES = {
  reel: { color: "var(--reel)", soft: "var(--reel-soft)" },
  spotlight: { color: "var(--spotlight)", soft: "var(--spotlight-soft)" },
  evergreen: { color: "var(--evergreen)", soft: "var(--evergreen-soft)" },
  system: { color: "var(--system)", soft: "var(--system-soft)" },
};

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

export const ASSET_MOTIFS: Motif[] = [
  {
    id: "anchor",
    label: "Anchor film",
    keywords: ["anchor", "film", "documentary", "story", "interview", "walkthrough"],
    kinds: ["anchor_script"],
    ...LANES.spotlight,
    draw: ({ color, seed }) => (
      <>
        <rect x="54" y="40" width="150" height="100" rx="10" fill="none" stroke={color} strokeWidth="2" />
        <circle cx="129" cy="90" r="26" fill="none" stroke={color} strokeWidth="2" />
        <circle cx="129" cy="90" r="9" fill={color} opacity=".75" />
        <path d="M204 66 264 44v92l-60-22z" fill="none" stroke={color} strokeWidth="2" />
        {range(6).map((i) => (
          <rect
            key={i}
            x={54}
            y={44 + i * 16 + seed * 4}
            width="8"
            height="8"
            fill={color}
            opacity=".28"
          />
        ))}
      </>
    ),
  },
  {
    id: "short",
    label: "Short form",
    keywords: ["short", "reel", "clip", "tiktok", "hook", "vertical"],
    kinds: ["short_script"],
    ...LANES.reel,
    draw: ({ color, seed }) =>
      range(3).map((i) => (
        <g key={i} transform={`translate(${72 + i * 62} ${34 + (i === 1 ? -8 : 6) + seed * 6})`}>
          <rect width="52" height="104" rx="9" fill="none" stroke={color} strokeWidth="2" />
          <path d="M20 38 36 52 20 66z" fill={color} opacity={0.35 + i * 0.2} />
          <rect x="10" y="82" width="32" height="4" rx="2" fill={color} opacity=".3" />
          <rect x="10" y="90" width="20" height="4" rx="2" fill={color} opacity=".18" />
        </g>
      )),
  },
  {
    id: "caption",
    label: "Social caption",
    keywords: ["caption", "post", "linkedin", "instagram", "thread", "comment"],
    kinds: ["caption", "platform_post"],
    ...LANES.reel,
    draw: ({ color, seed }) => (
      <>
        <g transform={`translate(38 ${34 + seed * 4})`}>
          <rect width="150" height="60" rx="14" fill="none" stroke={color} strokeWidth="2" />
          <path d="M22 60 20 78 44 60z" fill="none" stroke={color} strokeWidth="2" />
          {range(3).map((i) => (
            <rect key={i} x="18" y={16 + i * 13} width={108 - i * 30} height="5" rx="2.5" fill={color} opacity={0.45 - i * 0.12} />
          ))}
        </g>
        <g transform="translate(146 92)">
          <rect width="130" height="52" rx="14" fill={color} opacity=".1" />
          {range(2).map((i) => (
            <rect key={i} x="18" y={16 + i * 14} width={90 - i * 34} height="5" rx="2.5" fill={color} opacity=".45" />
          ))}
        </g>
      </>
    ),
  },
  {
    id: "newsletter",
    label: "Newsletter",
    keywords: ["newsletter", "email", "subscriber", "inbox", "send"],
    kinds: ["newsletter"],
    ...LANES.evergreen,
    draw: ({ color, seed }) => (
      <>
        <rect x="64" y="42" width="192" height="118" rx="10" fill="none" stroke={color} strokeWidth="2" />
        <path d="M64 52 160 112 256 52" fill="none" stroke={color} strokeWidth="2" />
        {range(4).map((i) => (
          <circle key={i} cx={92 + i * 46} cy={28 + (i % 2) * 8 + seed * 5} r="4" fill={color} opacity={0.5 - i * 0.1} />
        ))}
      </>
    ),
  },
  {
    id: "carousel",
    label: "Carousel",
    keywords: ["carousel", "slide", "deck", "swipe", "graphic"],
    kinds: ["carousel"],
    ...LANES.system,
    draw: ({ color, seed }) => (
      <>
        {range(3).map((i) => (
          <rect
            key={i}
            x={62 + i * 58}
            y={36 + i * 6 + seed * 4}
            width="96"
            height="96"
            rx="12"
            fill={i === 2 ? color : "none"}
            opacity={i === 2 ? 0.12 : 1}
            stroke={color}
            strokeWidth="2"
          />
        ))}
        {range(3).map((i) => (
          <circle key={i} cx={140 + i * 20} cy="152" r="3.5" fill={color} opacity={i === 0 ? 0.8 : 0.25} />
        ))}
      </>
    ),
  },
  {
    id: "faq",
    label: "Questions",
    keywords: ["faq", "question", "answer", "objection", "ask"],
    kinds: ["faq"],
    ...LANES.evergreen,
    draw: ({ color, seed }) => (
      <>
        <circle cx="160" cy="90" r="52" fill="none" stroke={color} strokeWidth="2" />
        <path
          d="M146 74c0-9 7-15 15-15s15 6 15 14c0 11-14 11-14 22"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="162" cy="110" r="4" fill={color} />
        {range(8).map((i) => {
          const a = (i / 8) * Math.PI * 2 + seed;
          return (
            <circle
              key={i}
              cx={160 + Math.cos(a) * 72}
              cy={90 + Math.sin(a) * 62}
              r={i % 2 ? 3 : 5}
              fill={color}
              opacity=".25"
            />
          );
        })}
      </>
    ),
  },
  {
    id: "plan",
    label: "Plan",
    keywords: ["plan", "calendar", "schedule", "roadmap", "week", "launch"],
    ...LANES.system,
    draw: ({ color, seed }) => (
      <>
        <rect x="60" y="32" width="200" height="116" rx="10" fill="none" stroke={color} strokeWidth="2" />
        <path d="M60 62h200" stroke={color} strokeWidth="2" />
        {range(12).map((i) => (
          <rect
            key={i}
            x={74 + (i % 4) * 48}
            y={76 + Math.floor(i / 4) * 24}
            width="34"
            height="12"
            rx="3"
            fill={color}
            opacity={(i + seed * 3) % 3 === 0 ? 0.55 : 0.16}
          />
        ))}
      </>
    ),
  },
  {
    id: "growth",
    label: "Results",
    keywords: ["growth", "result", "revenue", "lead", "roi", "metric", "proof", "case"],
    ...LANES.spotlight,
    draw: ({ color, seed }) => (
      <>
        {range(5).map((i) => (
          <rect
            key={i}
            x={68 + i * 40}
            y={140 - (28 + i * 18 + seed * 8)}
            width="26"
            height={28 + i * 18 + seed * 8}
            rx="5"
            fill={color}
            opacity={0.16 + i * 0.14}
          />
        ))}
        <path d="M74 118 114 96 154 84 194 56 234 40" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="234" cy="40" r="6" fill={color} />
      </>
    ),
  },
  {
    id: "idea",
    label: "Idea",
    keywords: ["idea", "angle", "brainstorm", "concept", "hook", "insight"],
    ...LANES.reel,
    draw: ({ color, seed }) => (
      <>
        <circle cx="160" cy="82" r="34" fill="none" stroke={color} strokeWidth="2" />
        <path d="M146 108h28v14h-28z" fill="none" stroke={color} strokeWidth="2" />
        <path d="M152 122h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {range(8).map((i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <path
              key={i}
              d={`M${160 + Math.cos(a) * 46} ${82 + Math.sin(a) * 46} L${160 + Math.cos(a) * (58 + seed * 8)} ${82 + Math.sin(a) * (58 + seed * 8)}`}
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity=".45"
            />
          );
        })}
      </>
    ),
  },
  {
    id: "system",
    label: "System",
    keywords: ["system", "process", "sop", "onboarding", "training", "operational", "workflow"],
    ...LANES.system,
    draw: ({ color, seed }) => (
      <>
        {range(3).map((i) => (
          <g key={i}>
            <rect x={54 + i * 82} y={70 + (i % 2 ? 22 : -12)} width="72" height="44" rx="10" fill="none" stroke={color} strokeWidth="2" />
            {i < 2 ? (
              <path
                d={`M${126 + i * 82} ${92 + (i % 2 ? 22 : -12)}h${10 + seed * 4}`}
                stroke={color}
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            ) : null}
          </g>
        ))}
        {range(3).map((i) => (
          <circle key={i} cx={72 + i * 82} cy={88 + (i % 2 ? 22 : -12)} r="5" fill={color} opacity=".55" />
        ))}
      </>
    ),
  },
];

const FALLBACK = ASSET_MOTIFS[0];

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) % 100000;
  return h;
}

export function pickMotif(kind: string, text: string) {
  const haystack = text.toLowerCase();
  let best: Motif | null = null;
  let bestScore = 0;
  for (const motif of ASSET_MOTIFS) {
    let score = motif.kinds?.includes(kind) ? 3 : 0;
    for (const word of motif.keywords) if (haystack.includes(word)) score += 1;
    if (score > bestScore) {
      best = motif;
      bestScore = score;
    }
  }
  return best ?? FALLBACK;
}

export function AssetIllustration({
  kind,
  title,
  className = "",
}: {
  kind: string;
  title: string;
  className?: string;
}) {
  const motif = pickMotif(kind, title);
  const h = hash(`${kind}:${title}`);
  const seed = (h % 100) / 100;
  const rotate = (h % 7) - 3;

  return (
    <svg
      viewBox="0 0 320 180"
      role="img"
      aria-label={`${motif.label} illustration`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="320" height="180" fill={motif.soft} />
      <g opacity=".55">
        {range(9).map((row) =>
          range(16).map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={10 + col * 20}
              cy={10 + row * 20}
              r="1"
              fill={motif.color}
              opacity=".25"
            />
          )),
        )}
      </g>
      <g transform={`rotate(${rotate} 160 90)`}>{motif.draw({ ...motif, seed })}</g>
    </svg>
  );
}
