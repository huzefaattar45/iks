import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Clock, CalendarDays, RadioTower, Lock, KeyRound, ArrowRight } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/game/AppLayout";
import { Badge, Button, Panel } from "@/components/game/ui";
import { LEVELS } from "@/lib/game-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/levels")({
  head: () => ({
    meta: [
      { title: "Security Levels — Cipher Vault" },
      { name: "description", content: "Five security levels, each powered by a different modular arithmetic pattern." },
      { property: "og:title", content: "Security Levels — Cipher Vault" },
      { property: "og:description", content: "Five security levels, each powered by a different modular arithmetic pattern." },
    ],
  }),
  component: Levels,
});

const ICONS = { clock: Clock, calendar: CalendarDays, signal: RadioTower, lock: Lock, key: KeyRound };

function Levels() {
  return (
    <AppLayout breadcrumb="Security Levels">
      <PageHeader
        eyebrow="Vault Map"
        title="SECURITY LEVELS"
        subtitle="Every lock is powered by a different mathematical pattern."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {LEVELS.map((level, i) => {
          const Icon = ICONS[level.icon];
          const locked = level.status === "locked";
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={locked ? {} : { y: -4 }}
            >
              <Panel
                glow={locked ? "none" : "primary"}
                className={cn("relative h-full", locked && "opacity-55")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="label-xs">Level {level.code}</div>
                    <h3 className="mt-2 truncate text-lg font-bold tracking-tight">{level.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{level.description}</p>
                  </div>
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-border bg-foreground/5">
                    <Icon className={cn("size-5", locked ? "text-muted-foreground" : "text-accent")} />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <Badge tone={locked ? "muted" : "accent"}>{level.badge}</Badge>
                  <Badge tone={locked ? "muted" : "success"}>{locked ? "Locked" : "Available"}</Badge>
                  <span className="ml-auto flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, d) => (
                      <span
                        key={d}
                        className={cn(
                          "h-1.5 w-4 rounded-full",
                          d < level.difficulty ? "bg-primary" : "bg-foreground/10",
                        )}
                      />
                    ))}
                  </span>
                </div>

                <div className="mt-6">
                  {locked ? (
                    <Button variant="outline" disabled>
                      <Lock className="size-3.5" /> Locked
                    </Button>
                  ) : (
                    <Link to="/level/$id" params={{ id: String(level.id) }}>
                      <Button>
                        Enter <ArrowRight className="size-3.5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </Panel>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}
