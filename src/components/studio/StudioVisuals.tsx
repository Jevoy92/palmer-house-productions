import { motion, useReducedMotion } from "motion/react";
import { CalendarDays, Lightbulb, MessageCircle, Play, Sparkles } from "lucide-react";
import kiana from "@/assets/pal-headshots/kiana.png";
import ryder from "@/assets/pal-headshots/ryder.png";

const orbitNodes = [
  {
    label: "Ideas",
    note: "Find the useful angle",
    color: "var(--spotlight)",
    soft: "var(--spotlight-soft)",
    icon: Lightbulb,
    position: "left-[4%] top-[8%]",
  },
  {
    label: "Content",
    note: "Build the campaign",
    color: "var(--reel)",
    soft: "var(--reel-soft)",
    icon: Play,
    position: "left-[0%] bottom-[4%]",
  },
  {
    label: "Plan",
    note: "Give it a rhythm",
    color: "var(--evergreen)",
    soft: "var(--evergreen-soft)",
    icon: CalendarDays,
    position: "right-[1%] top-[10%]",
  },
  {
    label: "Pals",
    note: "Get a useful nudge",
    color: "var(--system)",
    soft: "var(--system-soft)",
    icon: MessageCircle,
    position: "right-[5%] bottom-[2%]",
  },
] as const;

export function StudioMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid size-10 place-items-center rounded-full border border-ink text-[11px] font-black tracking-[-.08em]">
        PH
        <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-reel" />
      </span>
      {compact ? null : (
        <span className="text-[13px] font-extrabold leading-[1.05] tracking-[-.02em]">
          Palmer House
          <span className="mt-1 block font-mono text-[8px] font-medium uppercase tracking-[.2em] text-muted-foreground">
            Studio
          </span>
        </span>
      )}
    </span>
  );
}

export function ContentOrbit({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={`relative isolate mx-auto w-full overflow-hidden ${compact ? "h-[18rem] max-w-xl" : "h-[31rem] max-w-3xl"}`}
      aria-label="A four-part content system: ideas, content, planning, and Palmer House guidance"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 700 470"
        className="absolute inset-0 size-full overflow-visible"
      >
        <ellipse
          cx="350"
          cy="235"
          rx="236"
          ry="156"
          fill="none"
          stroke="#CBD0D6"
          strokeDasharray="5 7"
        />
        <ellipse
          cx="350"
          cy="235"
          rx="160"
          ry="105"
          fill="none"
          stroke="#E5E7EB"
          strokeDasharray="4 8"
        />
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-white shadow-soft"
        initial={reduce ? false : { opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <span className="text-2xl font-black tracking-[-.12em]">PH</span>
        <motion.span
          aria-hidden="true"
          className="absolute -right-2 top-2 grid size-8 place-items-center rounded-full bg-ink text-white"
          initial={reduce ? false : { opacity: 0, y: 6, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.35 }}
        >
          <Sparkles className="size-3.5" />
        </motion.span>
      </motion.div>

      {orbitNodes.map((node, index) => (
        <motion.div
          key={node.label}
          className={`absolute z-10 w-[43%] max-w-[17rem] rounded-[1.25rem] border bg-white p-4 shadow-[0_20px_55px_-45px_rgba(31,35,40,.65)] ${node.position}`}
          style={{ borderColor: node.color }}
          initial={reduce ? false : { opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            opacity: { duration: 0.35, delay: index * 0.08 },
            scale: { duration: 0.35, delay: index * 0.08 },
            y: { duration: 0.35, delay: index * 0.08 },
          }}
        >
          <div className="flex items-start gap-3">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-xl"
              style={{ background: node.soft, color: node.color }}
            >
              <node.icon className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold">{node.label}</span>
              <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">
                {node.note}
              </span>
            </span>
          </div>
          <span
            className="mt-4 block h-1.5 overflow-hidden rounded-full"
            style={{ background: node.soft }}
          >
            <motion.span
              className="block h-full rounded-full"
              style={{ background: node.color }}
              initial={reduce ? false : { width: "0%" }}
              animate={{ width: `${54 + index * 8}%` }}
              transition={{ duration: 0.55, delay: 0.2 + index * 0.08, ease: "easeOut" }}
            />
          </span>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[36%] top-[34%] z-30 flex items-center gap-2 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-3 shadow-soft"
        initial={reduce ? false : { opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.45 }}
      >
        <img src={ryder} alt="" className="size-7 rounded-full object-cover" />
        <span className="text-[10px] font-bold">Ryder · Reach</span>
      </motion.div>
      <motion.div
        className="absolute bottom-[29%] right-[34%] z-30 flex items-center gap-2 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-3 shadow-soft"
        initial={reduce ? false : { opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.52 }}
      >
        <img src={kiana} alt="" className="size-7 rounded-full object-cover" />
        <span className="text-[10px] font-bold">Kiana · Proof</span>
      </motion.div>
    </div>
  );
}

export function LanePulse() {
  const reduce = useReducedMotion();
  const colors = ["var(--spotlight)", "var(--reel)", "var(--evergreen)", "var(--system)"];
  return (
    <div className="flex items-center gap-1.5" aria-label="All four Palmer House lanes are active">
      {colors.map((color, index) => (
        <motion.span
          key={color}
          className="block h-1.5 w-8 rounded-full"
          style={{ background: color }}
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.08 }}
        />
      ))}
    </div>
  );
}
