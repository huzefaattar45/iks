import { useEffect, useState } from "react";
import { Heart, Timer, Zap, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSession, elapsedSeconds, formatTime } from "@/lib/gameStore";

export function Timer_() {
  const [display, setDisplay] = useState(() =>
    formatTime(elapsedSeconds())
  );

  useEffect(() => {
    const sync = () => {
      const s = getSession();
      if (s.started) {
        setDisplay(formatTime(elapsedSeconds()));
      } else {
        setDisplay("00:00");
      }
    };

    window.addEventListener("storage", sync);
    window.addEventListener("game_session_updated", sync);
    const id = setInterval(sync, 1000);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("game_session_updated", sync);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-foreground/[0.04] px-2.5 py-1.5">
      <Timer className="size-3.5 text-accent" />
      <span className="font-mono text-sm tabular-nums">{display}</span>
    </div>
  );
}

export function LivesDisplay({ max = 3 }: { max?: number }) {
  const [lives, setLives] = useState(() => getSession().lives ?? 3);

  useEffect(() => {
    const sync = () => setLives(getSession().lives ?? 3);
    window.addEventListener("storage", sync);
    window.addEventListener("game_session_updated", sync);
    const id = setInterval(sync, 1000);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("game_session_updated", sync);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-foreground/[0.04] px-2.5 py-1.5" title={`Lives: ${lives}/${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <Heart
          key={i}
          className={cn(
            "size-3.5 transition-all duration-300",
            i < lives ? "fill-destructive text-destructive scale-100" : "text-muted-foreground/30 scale-90",
          )}
        />
      ))}
    </div>
  );
}

export function ScoreDisplay() {
  const [score, setScore] = useState(() => getSession().score);

  // Re-read score whenever the component mounts or storage changes
  useEffect(() => {
    const sync = () => setScore(getSession().score);
    window.addEventListener("storage", sync);
    window.addEventListener("game_session_updated", sync);
    // Also poll every 2s as a fallback for same-tab updates
    const id = setInterval(sync, 2000);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("game_session_updated", sync);
      clearInterval(id);
    };
  }, []);

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
