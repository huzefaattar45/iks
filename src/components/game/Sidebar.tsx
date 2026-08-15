import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Layers,
  FlaskConical,
  ScrollText,
  Trophy,
  Info,
  ShieldHalf,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { PLAYER } from "@/lib/game-data";

export const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/briefing", label: "Mission", icon: FileText },
  { to: "/levels", label: "Levels", icon: Layers },
  { to: "/cipher-lab", label: "Cipher Lab", icon: FlaskConical },
  { to: "/solution-log", label: "Solution Log", icon: ScrollText },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/about", label: "About", icon: Info },
] as const;

export function VaultMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary glow-primary",
        className,
      )}
    >
      <ShieldHalf className="size-5 text-primary-foreground" />
    </div>
  );
}

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <Link to="/" className="flex items-center gap-3 px-5 py-6">
        <VaultMark />
        <div className="min-w-0 leading-none">
          <div className="font-mono text-sm font-bold tracking-[0.3em]">CIPHER</div>
          <div className="mt-1 font-mono text-sm font-bold tracking-[0.3em] text-accent">VAULT</div>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300",
                active
                  ? "bg-primary/15 text-foreground"
                  : "text-muted-foreground hover:translate-x-0.5 hover:bg-foreground/5 hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-accent"
                />
              )}
              <item.icon className={cn("size-4 shrink-0", active && "text-accent")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-xl border border-sidebar-border bg-foreground/[0.03] p-4">
        <div className="label-xs">Player</div>
        <div className="mt-1 truncate text-sm font-semibold">{PLAYER.name}</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-success" />
          <span className="font-mono text-[0.62rem] tracking-[0.18em] text-success">
            {PLAYER.status}
          </span>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-sidebar-border bg-sidebar/95 px-2 py-2 backdrop-blur lg:hidden">
      {NAV_ITEMS.slice(0, 5).map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex min-w-0 flex-col items-center gap-1 rounded-lg px-3 py-1.5 transition-colors",
              active ? "text-accent" : "text-muted-foreground",
            )}
          >
            <item.icon className="size-4" />
            <span className="text-[0.6rem] tracking-wide">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
