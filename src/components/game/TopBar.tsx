import { Heart, Timer, Zap, User } from "lucide-react";
import { PLAYER } from "@/lib/game-data";
import { cn } from "@/lib/utils";

export function Timer_({ value = PLAYER.time }: { value?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-foreground/[0.04] px-2.5 py-1.5">
      <Timer className="size-3.5 text-accent" />
      <span className="font-mono text-sm tabular-nums">{value}</span>
    </div>
  );
}

export function LivesDisplay({ lives = PLAYER.lives, max = 3 }: { lives?: number; max?: number }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-foreground/[0.04] px-2.5 py-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <Heart
          key={i}
          className={cn(
            "size-3.5",
            i < lives ? "fill-destructive text-destructive" : "text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}

export function ScoreDisplay({ score = PLAYER.score }: { score?: number }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-foreground/[0.04] px-2.5 py-1.5">
      <Zap className="size-3.5 text-warning" />
      <span className="font-mono text-sm tabular-nums">{score} XP</span>
    </div>
  );
}

export function TopBar({ breadcrumb }: { breadcrumb: string }) {
  return (
    <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="min-w-0">
        <div className="label-xs">Cipher Vault</div>
        <h2 className="truncate text-sm font-semibold tracking-wide">{breadcrumb}</h2>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden sm:block">
          <Timer_ />
        </div>
        <LivesDisplay />
        <div className="hidden sm:block">
          <ScoreDisplay />
        </div>
        <div className="grid size-9 place-items-center rounded-lg border border-border bg-gradient-to-br from-primary/30 to-accent/20">
          <User className="size-4" />
        </div>
      </div>
    </header>
  );
}
