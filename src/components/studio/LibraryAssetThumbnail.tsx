type LibraryThumbnailAsset = {
  id: string;
  kind: string;
  title: string;
  content: string;
};

type Scene = "consultation" | "drainage" | "garden" | "path" | "site";

const palette = {
  paper: "#FFFFFF",
  cream: "#F4F1EA",
  mist: "#F6F8FA",
  line: "#E5E7EB",
  ink: "#1F2328",
  muted: "#6B7280",
  evergreen: "#5B8A2D",
  evergreenMuted: "#7A9F4F",
  evergreenSoft: "#EEF4E4",
} as const;

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function describeScene(asset: LibraryThumbnailAsset): Scene {
  const title = asset.title.toLowerCase();
  const source = `${title} ${asset.content}`.toLowerCase();
  if (/notice|four things|look first|clues/.test(title)) return "site";
  if (/mud|water|rain|drain|soggy|runoff|grade/.test(title)) return "drainage";
  if (/path|walkway|stone|paver|circulation/.test(title)) return "path";
  if (/consult|first visit|wish list|prepare/.test(title)) return "consultation";
  if (/garden|plant|soil|sun|landscape|yard/.test(title)) return "garden";
  if (/mud|water|rain|drain|soggy|runoff|grade/.test(source)) return "drainage";
  if (/path|walkway|stone|paver|circulation/.test(source)) return "path";
  if (/consult|first visit|wish list|prepare/.test(source)) return "consultation";
  if (/garden|plant|soil|sun|landscape|yard/.test(source)) return "garden";
  return "site";
}

const sceneLabels: Record<Scene, string> = {
  consultation: "First visit",
  drainage: "Drainage",
  garden: "Landscape",
  path: "Path system",
  site: "Site reading",
};

function formatLabel(kind: string) {
  if (kind === "anchor_script") return "Anchor video";
  if (kind === "short_script") return "Short video";
  if (kind === "caption") return "Social post";
  if (kind === "newsletter") return "Email";
  if (kind === "carousel") return "Carousel";
  if (kind === "platform_post") return "Platform post";
  if (kind === "faq") return "FAQ";
  return kind.replaceAll("_", " ");
}

function LandscapeScene({ scene, seed }: { scene: Scene; seed: number }) {
  const sunX = 102 + (seed % 5) * 34;
  const hillLift = 12 + (seed % 4) * 7;
  const treeShift = seed % 37;
  const variant = seed % 4;

  return (
    <>
      <rect width="640" height="360" fill={palette.cream} />
      <circle cx={sunX} cy={74 + (seed % 3) * 8} r="27" fill={palette.paper} />
      <path
        d={`M0 186 C 110 ${142 - hillLift}, 212 ${198 - hillLift}, 322 158 C 430 122, 526 168, 640 126 L640 360 L0 360Z`}
        fill={palette.evergreenSoft}
      />
      <path
        d={`M0 232 C 128 ${198 + hillLift}, 214 238, 334 204 C 448 170, 550 218, 640 182 L640 360 L0 360Z`}
        fill={palette.evergreenMuted}
        opacity="0.42"
      />
      {[82, 206, 456, 564].map((x, index) => {
        const shiftedX = x + (index % 2 === 0 ? treeShift : -treeShift / 2);
        const scale = 0.78 + ((seed + index * 7) % 5) * 0.07;
        return (
          <g key={x} transform={`translate(${shiftedX} 0) scale(${scale})`}>
            <rect x="-4" y="157" width="8" height="56" rx="4" fill={palette.ink} opacity="0.32" />
            <circle cx="0" cy="143" r="30" fill={palette.evergreen} />
            <circle cx="-17" cy="156" r="22" fill={palette.evergreenMuted} />
            <circle cx="19" cy="158" r="23" fill={palette.evergreenMuted} />
          </g>
        );
      })}

      {scene === "drainage" ? (
        <>
          {variant === 0 || variant === 2 ? (
            <>
              <path
                d={`M42 305 C 142 ${270 - (seed % 17)}, 212 334, 330 290 S 514 252, 650 304`}
                fill="none"
                stroke={palette.paper}
                strokeWidth="54"
                strokeLinecap="round"
              />
              <path
                d={`M42 305 C 142 ${270 - (seed % 17)}, 212 334, 330 290 S 514 252, 650 304`}
                fill="none"
                stroke={palette.evergreen}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={variant === 0 ? "18 12" : "4 16"}
              />
            </>
          ) : null}
          {variant === 1 ? (
            <g transform="translate(235 248)">
              <ellipse cx="70" cy="42" rx="112" ry="38" fill={palette.paper} />
              <ellipse
                cx="70"
                cy="42"
                rx="76"
                ry="24"
                fill="none"
                stroke={palette.evergreen}
                strokeWidth="6"
              />
              <ellipse
                cx="70"
                cy="42"
                rx="38"
                ry="11"
                fill="none"
                stroke={palette.evergreenMuted}
                strokeWidth="4"
              />
            </g>
          ) : null}
          {variant === 3 ? (
            <g transform="translate(204 220)">
              <rect width="216" height="104" rx="20" fill={palette.paper} />
              <path d="M108 0 V104" stroke={palette.line} strokeWidth="3" />
              <path
                d="M18 70 C42 45 65 86 92 55"
                fill="none"
                stroke={palette.evergreen}
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M126 72 C151 38 174 67 199 35"
                fill="none"
                stroke={palette.evergreenMuted}
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M92 24 H22 M194 88 H126"
                stroke={palette.line}
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
          ) : null}
          {[104, 136, 168].map((x, index) => (
            <path
              key={x}
              d={`M${x} ${228 + index * 6} C ${x - 8} ${241 + index * 6}, ${x - 8} ${250 + index * 6}, ${x} ${258 + index * 6} C ${x + 8} ${250 + index * 6}, ${x + 8} ${241 + index * 6}, ${x} ${228 + index * 6}Z`}
              fill={palette.paper}
            />
          ))}
        </>
      ) : null}

      {scene === "path" ? (
        <>
          <path
            d={`M250 360 C ${205 + (seed % 29)} 308, 296 282, 274 238 C 254 202, 292 183, 344 164`}
            fill="none"
            stroke={palette.paper}
            strokeWidth="84"
            strokeLinecap="round"
          />
          {[0, 1, 2, 3, 4].map((index) => (
            <rect
              key={index}
              x={232 + ((seed + index * 17) % 35)}
              y={310 - index * 35}
              width={58 - (index % 2) * 9}
              height="22"
              rx="11"
              fill={palette.cream}
              stroke={palette.evergreenMuted}
              strokeWidth="2"
              transform={`rotate(${index % 2 ? 7 : -6} ${262} ${321 - index * 35})`}
            />
          ))}
        </>
      ) : null}

      {scene === "consultation" || scene === "site" ? (
        <g transform={`translate(${214 + (seed % 21)} 176) rotate(${(seed % 5) - 2})`}>
          <rect
            width="214"
            height="132"
            rx="18"
            fill={palette.paper}
            stroke={palette.line}
            strokeWidth="3"
          />
          <path
            d="M28 91 C68 55 104 104 178 42"
            fill="none"
            stroke={palette.evergreen}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle
            cx="60"
            cy="73"
            r="11"
            fill={palette.evergreenSoft}
            stroke={palette.evergreen}
            strokeWidth="3"
          />
          <circle
            cx="142"
            cy="63"
            r="11"
            fill={palette.evergreenSoft}
            stroke={palette.evergreen}
            strokeWidth="3"
          />
          <path d="M30 112 H184" stroke={palette.line} strokeWidth="5" strokeLinecap="round" />
          {scene === "consultation" ? (
            <>
              <circle cx="185" cy="18" r="26" fill={palette.ink} />
              <path
                d="M174 18 L182 26 L198 9"
                fill="none"
                stroke={palette.paper}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : null}
        </g>
      ) : null}

      {scene === "garden" ? (
        <>
          {[236, 314, 396].map((x, index) => (
            <g
              key={x}
              transform={`translate(${x + ((seed + index * 13) % 17)} ${248 - index * 13})`}
            >
              <path d="M0 58 C-5 22 17 4 46 0 C49 31 35 54 0 58Z" fill={palette.evergreen} />
              <path
                d="M4 59 C17 31 24 20 43 5"
                fill="none"
                stroke={palette.paper}
                strokeWidth="3"
                opacity="0.7"
              />
              <rect x="-8" y="56" width="64" height="33" rx="12" fill={palette.paper} />
            </g>
          ))}
        </>
      ) : null}
    </>
  );
}

function FormatOverlay({ kind, seed }: { kind: string; seed: number }) {
  const x = 446 + (seed % 9);
  if (kind === "caption" || kind === "platform_post") {
    return (
      <g transform={`translate(${x} 60)`}>
        <rect
          width="154"
          height="224"
          rx="18"
          fill={palette.paper}
          stroke={palette.line}
          strokeWidth="3"
        />
        <circle cx="25" cy="27" r="10" fill={palette.evergreen} />
        <path
          d="M43 22 H115 M43 32 H92"
          stroke={palette.line}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <rect x="15" y="51" width="124" height="88" rx="10" fill={palette.evergreenSoft} />
        <path
          d="M25 124 C48 91 72 119 93 83 C111 107 124 113 132 123"
          fill="none"
          stroke={palette.evergreen}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M17 159 H133 M17 174 H112 M17 189 H126"
          stroke={palette.line}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle
          cx="28"
          cy="208"
          r="6"
          fill={palette.evergreenSoft}
          stroke={palette.evergreen}
          strokeWidth="2"
        />
        <circle
          cx="72"
          cy="208"
          r="6"
          fill={palette.evergreenSoft}
          stroke={palette.evergreen}
          strokeWidth="2"
        />
      </g>
    );
  }
  if (kind === "newsletter") {
    return (
      <g transform={`translate(${x - 22} 94) rotate(${(seed % 5) - 2})`}>
        <rect
          width="178"
          height="126"
          rx="20"
          fill={palette.paper}
          stroke={palette.line}
          strokeWidth="3"
        />
        <path
          d="M13 23 L89 81 L165 23"
          fill={palette.evergreenSoft}
          stroke={palette.evergreen}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M13 104 L68 63 M165 104 L110 63"
          fill="none"
          stroke={palette.evergreenMuted}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    );
  }
  if (kind === "carousel") {
    return (
      <g transform={`translate(${x - 4} 76)`}>
        {[2, 1, 0].map((index) => (
          <g
            key={index}
            transform={`translate(${-index * 13} ${index * 13}) rotate(${index * -3})`}
          >
            <rect
              width="138"
              height="176"
              rx="16"
              fill={palette.paper}
              stroke={palette.line}
              strokeWidth="3"
            />
            <rect
              x="14"
              y="14"
              width="110"
              height="92"
              rx="9"
              fill={index ? palette.mist : palette.evergreenSoft}
            />
            <path
              d="M24 92 C48 57 70 88 91 54 C104 73 115 80 120 91"
              fill="none"
              stroke={palette.evergreen}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M18 127 H111 M18 144 H88"
              stroke={palette.line}
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>
    );
  }
  if (kind === "faq") {
    return (
      <g transform={`translate(${x - 8} 84)`}>
        <path
          d="M0 18 Q0 0 18 0 H130 Q148 0 148 18 V100 Q148 118 130 118 H57 L28 143 L32 118 H18 Q0 118 0 100Z"
          fill={palette.paper}
          stroke={palette.line}
          strokeWidth="3"
        />
        <text
          x="74"
          y="78"
          textAnchor="middle"
          fontFamily="Satoshi, sans-serif"
          fontWeight="800"
          fontSize="72"
          fill={palette.evergreen}
        >
          ?
        </text>
      </g>
    );
  }
  if (kind === "short_script") {
    return (
      <g transform={`translate(${x + 16} 63) rotate(${(seed % 5) - 2})`}>
        <rect
          width="110"
          height="210"
          rx="24"
          fill={palette.paper}
          stroke={palette.line}
          strokeWidth="3"
        />
        <rect x="11" y="25" width="88" height="150" rx="14" fill={palette.evergreenSoft} />
        <path
          d="M20 158 C40 115 62 151 91 102"
          fill="none"
          stroke={palette.evergreen}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="55" cy="102" r="24" fill={palette.evergreen} />
        <path d="M49 90 L68 102 L49 114Z" fill={palette.paper} />
        <path d="M42 191 H68" stroke={palette.line} strokeWidth="5" strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g transform={`translate(${x - 8} 91)`}>
      <rect
        width="154"
        height="110"
        rx="20"
        fill={palette.paper}
        stroke={palette.line}
        strokeWidth="3"
      />
      <circle cx="77" cy="55" r="31" fill={palette.evergreen} />
      <path d="M68 39 L94 55 L68 71Z" fill={palette.paper} />
      <path
        d="M17 18 H39 M115 18 H137 M17 92 H39 M115 92 H137"
        stroke={palette.evergreenMuted}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}

export function LibraryAssetThumbnail({ asset }: { asset: LibraryThumbnailAsset }) {
  const seed = hashString(asset.id);
  const scene = describeScene(asset);
  const signature = `${asset.id}-${seed.toString(36)}`;
  const label = `${sceneLabels[scene]} ${formatLabel(asset.kind).toLowerCase()} illustration for ${asset.title}`;

  return (
    <svg
      viewBox="0 0 640 360"
      role="img"
      aria-label={label}
      data-library-thumbnail={signature}
      className="size-full transition duration-500 group-hover:scale-[1.025]"
      preserveAspectRatio="xMidYMid slice"
    >
      <title>{label}</title>
      <LandscapeScene scene={scene} seed={seed} />
      <FormatOverlay kind={asset.kind} seed={seed} />
      <g transform="translate(24 24)">
        <rect width="166" height="30" rx="15" fill={palette.paper} opacity="0.96" />
        <text
          x="83"
          y="20"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
          fill={palette.evergreen}
        >
          {sceneLabels[scene].toUpperCase()}
        </text>
      </g>
      <text
        x="24"
        y="337"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fontWeight="600"
        letterSpacing="1.2"
        fill={palette.ink}
        opacity="0.62"
      >
        {formatLabel(asset.kind).toUpperCase()} · {String((seed % 900) + 100)}
      </text>
    </svg>
  );
}
