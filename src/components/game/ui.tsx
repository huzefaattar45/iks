import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X, Lightbulb, Lock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeedbackState = "idle" | "correct" | "incorrect" | "loading";

export function Panel({
  children,
  className,
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: "primary" | "accent" | "none";
}) {
  return (
    <div
      className={cn(
        "glass-panel p-5 sm:p-6",
        glow === "primary" && "glow-primary",
        glow === "accent" && "glow-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "primary" | "muted" | "success" | "warning" | "danger";
  className?: string;
}) {
  const tones: Record<string, string> = {
    accent: "border-accent/40 text-accent bg-accent/10",
    primary: "border-primary/50 text-foreground bg-primary/15",
    muted: "border-border text-muted-foreground bg-foreground/5",
    success: "border-success/40 text-success bg-success/10",
    warning: "border-warning/40 text-warning bg-warning/10",
    danger: "border-destructive/40 text-destructive bg-destructive/10",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.18em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

type BtnProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline" | "danger";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
};

export function Button({
  children,
  onClick,
  variant = "primary",
  className,
  disabled,
  type = "button",
}: BtnProps) {
  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:brightness-115 glow-primary",
    outline: "border border-border bg-foreground/[0.03] hover:bg-foreground/[0.08]",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
    danger: "border border-destructive/50 text-destructive hover:bg-destructive/10",
  };
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40",
        variants[variant],
        className,
      )}
    >
      {children}
    </motion.button>
  );
}

export function StatTile({
  label,
  value,
  accent,
  icon,
}: {
  label: string;
  value: ReactNode;
  accent?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between">
        <span className="label-xs">{label}</span>
        {icon}
      </div>
      <div className={cn("mt-2 font-mono text-2xl font-bold tabular-nums", accent)}>{value}</div>
    </div>
  );
}

export function MathDisplay({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background/70 p-4 font-mono text-sm",
        className,
      )}
    >
      {lines.map((line, i) => (
        <motion.div
          key={line + i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center gap-2 py-1"
        >
          <span className="text-accent/60">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-foreground/90">{line}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function AnswerInput({
  value,
  onChange,
  placeholder = "ENTER CODE",
  state = "idle",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  state?: FeedbackState;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className={cn(
        "w-full rounded-xl border bg-background/70 px-4 py-3 text-center font-mono text-lg tracking-[0.3em] uppercase placeholder:text-muted-foreground/60 placeholder:tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-ring",
        state === "correct" && "border-success/60 text-success",
        state === "incorrect" && "border-destructive/60 text-destructive",
        state !== "correct" && state !== "incorrect" && "border-input",
      )}
    />
  );
}

export function ReasoningPanel({ title = "REMAINDER LOG", lines }: { title?: string; lines: string[] }) {
  return (
    <details className="group rounded-xl border border-border bg-foreground/[0.03] p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[0.68rem] tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:text-foreground">
        {title}
        <span className="text-accent transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="mt-4">
        <MathDisplay lines={lines} />
      </div>
    </details>
  );
}

export function Modal({
  open,
  onClose,
  onNext,
  tone,
  title,
  message,
  nextLabel = "Next Level →",
  closeLabel = "Close",
  children,
}: {
  open: boolean;
  onClose: () => void;
  onNext?: () => void;
  tone: "success" | "error" | "hint" | "failed";
  title: string;
  message?: string;
  nextLabel?: string;
  closeLabel?: string;
  children?: ReactNode;
}) {
  const tones = {
    success: { ring: "border-success/40", icon: <Check className="size-6 text-success" />, glow: "shadow-[0_0_60px_-20px_var(--color-success)]" },
    error: { ring: "border-destructive/40", icon: <X className="size-6 text-destructive" />, glow: "shadow-[0_0_60px_-20px_var(--color-destructive)]" },
    hint: { ring: "border-warning/40", icon: <Lightbulb className="size-6 text-warning" />, glow: "shadow-[0_0_60px_-20px_var(--color-warning)]" },
    failed: { ring: "border-destructive/70 ring-2 ring-destructive/30", icon: <AlertTriangle className="size-7 text-destructive animate-pulse" />, glow: "shadow-[0_0_80px_-10px_var(--color-destructive)]" },
  }[tone];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ scale: 0.94, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={cn("glass-panel w-full max-w-md border p-6 text-center", tones.ring, tones.glow)}
          >
            <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-border bg-foreground/5">
              {tones.icon}
            </div>
            <h3 className={cn(
              "mt-4 font-mono text-sm font-bold tracking-[0.2em] uppercase",
              tone === "failed" && "text-destructive text-base font-extrabold"
            )}>
              {title}
            </h3>
            {message && <p className="mt-2 text-sm text-muted-foreground">{message}</p>}
            {children}
            <div className={cn("mt-6 flex flex-col gap-2", onNext ? "sm:flex-row" : "")}>
              {onNext && (
                <Button onClick={onNext} className="flex-1" variant={tone === "failed" ? "danger" : "primary"}>
                  {nextLabel}
                </Button>
              )}
              <Button variant="outline" onClick={onClose} className={onNext ? "flex-1" : "w-full"}>
                {closeLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LockedOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center rounded-2xl bg-background/50">
      <Lock className="size-5 text-muted-foreground" />
    </div>
  );
}
