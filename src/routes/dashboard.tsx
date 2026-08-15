import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2, AlertCircle, FlaskConical, ScrollText, Play, Timer, Heart, Zap, Layers } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/game/AppLayout";
import { Badge, Button, Panel, StatTile } from "@/components/game/ui";
import { LEVELS, PLAYER, RECENT_ACTIVITY } from "@/lib/game-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Mission Control — Cipher Vault" },
      { name: "description", content: "Track your score, lives, and progress through the five security layers of the Cipher Vault." },
      { property: "og:title", content: "Mission Control — Cipher Vault" },
      { property: "og:description", content: "Track your score, lives, and progress through the five security layers of the Cipher Vault." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppLayout breadcrumb="Dashboard">
      <PageHeader eyebrow="Operative Console" title="MISSION CONTROL" subtitle="Your path to the vault." />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Current Level" value={`${PLAYER.currentLevel} / ${PLAYER.totalLevels}`} icon={<Layers className="size-4 text-primary" />} />
        <StatTile label="Time" value={PLAYER.time} accent="text-accent" icon={<Timer className="size-4 text-accent" />} />
        <StatTile label="Score" value={PLAYER.score} accent="text-warning" icon={<Zap className="size-4 text-warning" />} />
        <StatTile label="Lives" value={PLAYER.lives} accent="text-destructive" icon={<Heart className="size-4 text-destructive" />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Panel glow="primary">
          <div className="flex items-center justify-between">
            <span className="label-xs">Current Objective</span>
            <Badge tone="accent">Modulo 12</Badge>
          </div>
          <h2 className="mt-3 text-xl font-bold tracking-tight">THE TIME LOCK</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The vault clock has shifted. Calculate its next position using modular arithmetic.
          </p>
          <div className="mt-6">
            <Link to="/level/$id" params={{ id: "1" }}>
              <Button>
                <Play className="size-3.5" /> Continue Mission
              </Button>
            </Link>
          </div>
        </Panel>

        <Panel>
          <span className="label-xs">Recent Activity</span>
          <ul className="mt-4 space-y-3">
            {RECENT_ACTIVITY.map((a) => (
              <li key={a.text} className="flex items-start gap-2.5 text-sm">
                {a.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                ) : (
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-warning" />
                )}
                <span className="min-w-0 text-muted-foreground">{a.text}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel className="mt-6">
        <span className="label-xs">Mission Progress</span>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          {LEVELS.map((l, i) => {
            const state = i === 0 ? "current" : "locked";
            return (
              <div key={l.id} className="flex flex-1 items-center gap-3 sm:flex-col">
                <motion.div
                  animate={state === "current" ? { boxShadow: ["0 0 0px var(--color-primary)", "0 0 24px var(--color-primary)", "0 0 0px var(--color-primary)"] } : {}}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className={cn(
                    "grid size-12 shrink-0 place-items-center rounded-2xl border font-mono text-sm font-bold",
                    state === "current"
                      ? "border-primary/60 bg-primary/20 text-foreground"
                      : "border-border bg-foreground/[0.03] text-muted-foreground/60",
                  )}
                >
                  {l.code}
                </motion.div>
                <span className="min-w-0 truncate font-mono text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground">
                  {l.shortTitle}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="mt-6">
        <span className="label-xs">Quick Access</span>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { to: "/level/$id", params: { id: "1" }, label: "Continue Mission", icon: Play },
            { to: "/cipher-lab", label: "Cipher Lab", icon: FlaskConical },
            { to: "/solution-log", label: "Solution Log", icon: ScrollText },
          ].map((q) => (
            <Link
              key={q.label}
              to={q.to}
              params={q.params as never}
              className="glass-panel flex items-center gap-3 p-4 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10">
                <q.icon className="size-4 text-accent" />
              </div>
              <span className="min-w-0 truncate font-mono text-xs tracking-[0.16em] uppercase">
                {q.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
