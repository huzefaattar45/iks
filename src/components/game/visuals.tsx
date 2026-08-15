import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { ALPHABET, WEEKDAYS } from "@/lib/game-data";
import { cn } from "@/lib/utils";

export function ClockVisualization({ hour = 9, minute = 0 }: { hour?: number; minute?: number }) {
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <div className="absolute inset-0 rounded-full border border-border bg-background/60 glow-primary" />
      <div className="absolute inset-6 rounded-full border border-accent/20" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = ((i + 1) * 30 - 90) * (Math.PI / 180);
        return (
          <span
            key={i}
            className="absolute font-mono text-sm text-muted-foreground"
            style={{
              left: `${50 + 40 * Math.cos(angle)}%`,
              top: `${50 + 40 * Math.sin(angle)}%`,
              transform: "translate(-50%,-50%)",
            }}
          >
            {i + 1}
          </span>
        );
      })}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[24%] w-1 origin-bottom rounded-full bg-foreground"
        style={{ transform: `translate(-50%,-100%) rotate(${hourAngle}deg)`, transformOrigin: "bottom center" }}
        animate={{ rotate: hourAngle }}
        transition={{ type: "spring", stiffness: 60 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[34%] w-0.5 origin-bottom rounded-full bg-accent"
        style={{ transform: `translate(-50%,-100%) rotate(${minuteAngle}deg)`, transformOrigin: "bottom center" }}
      />
      <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary glow-primary" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg border border-border bg-background/80 px-3 py-1 font-mono text-xs tracking-[0.25em]">
        {String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}
      </div>
    </div>
  );
}

export function CalendarWheel({ activeIndex = 0 }: { activeIndex?: number }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <div className="absolute inset-0 rounded-full border border-border bg-background/60" />
      <motion.div
        className="absolute inset-8 rounded-full border border-dashed border-accent/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      {WEEKDAYS.map((d, i) => {
        const angle = (i * (360 / 7) - 90) * (Math.PI / 180);
        const active = i === activeIndex;
        return (
          <div
            key={d}
            className={cn(
              "absolute grid size-12 place-items-center rounded-xl border font-mono text-[0.7rem] tracking-widest transition-all",
              active
                ? "border-primary/60 bg-primary/20 text-foreground glow-primary"
                : "border-border bg-foreground/5 text-muted-foreground",
            )}
            style={{
              left: `${50 + 36 * Math.cos(angle)}%`,
              top: `${50 + 36 * Math.sin(angle)}%`,
              transform: "translate(-50%,-50%)",
            }}
          >
            {d}
          </div>
        );
      })}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="label-xs">Modulo</div>
        <div className="font-mono text-3xl font-bold text-accent">7</div>
      </div>
    </div>
  );
}

export function CipherWheel({ offset = 3, size = 340 }: { offset?: number; size?: number }) {
  const r1 = size / 2 - 16;
  const r2 = size / 2 - 58;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size, maxWidth: "100%" }}>
      <div className="absolute inset-0 rounded-full border border-border bg-background/60" />
      {ALPHABET.map((c, i) => {
        const a = (i * (360 / 26) - 90) * (Math.PI / 180);
        return (
          <span
            key={"o" + c}
            className="absolute font-mono text-[0.65rem] text-muted-foreground"
            style={{
              left: `${50 + (r1 / size) * 100 * Math.cos(a)}%`,
              top: `${50 + (r1 / size) * 100 * Math.sin(a)}%`,
              transform: "translate(-50%,-50%)",
            }}
          >
            {c}
          </span>
        );
      })}
      <motion.div
        className="absolute inset-10 rounded-full border border-accent/30"
        animate={{ rotate: (offset * 360) / 26 }}
        transition={{ type: "spring", stiffness: 40, damping: 14 }}
      >
        {ALPHABET.map((c, i) => {
          const a = (i * (360 / 26) - 90) * (Math.PI / 180);
          return (
            <span
              key={"i" + c}
              className="absolute font-mono text-[0.65rem] font-semibold text-accent"
              style={{
                left: `${50 + (r2 / (size - 80)) * 100 * Math.cos(a)}%`,
                top: `${50 + (r2 / (size - 80)) * 100 * Math.sin(a)}%`,
                transform: "translate(-50%,-50%)",
              }}
            >
              {c}
            </span>
          );
        })}
      </motion.div>
      <div className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary/50 bg-primary/15 glow-primary">
        <Lock className="size-5 text-accent" />
      </div>
    </div>
  );
}

export function EventTimeline({
  start = "FRIDAY",
  interval = 10,
  steps = ["MONDAY", "THURSDAY", "SUNDAY"],
}: {
  start?: string;
  interval?: number;
  steps?: string[];
}) {
  const nodes = [start, ...steps];
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      {nodes.map((n, i) => (
        <div key={n + i} className="flex flex-1 items-center gap-2 sm:flex-col">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className={cn(
              "grid w-full min-w-0 place-items-center rounded-xl border px-3 py-3 font-mono text-xs tracking-[0.15em]",
              i === 0
                ? "border-accent/50 bg-accent/10 text-accent"
                : "border-primary/40 bg-primary/10 text-foreground",
            )}
          >
            {n}
          </motion.div>
          {i < nodes.length - 1 && (
            <div className="flex shrink-0 items-center gap-1 sm:w-full sm:justify-center">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="font-mono text-[0.6rem] tracking-widest text-muted-foreground"
              >
                +{interval}D
              </motion.span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ParticleField() {
  const dots = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => (
        <motion.span
          key={i}
          className="absolute size-1 rounded-full bg-accent/50"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ y: [0, -24, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}
