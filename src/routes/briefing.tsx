import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AlertTriangle, Lock, Unlock } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/game/AppLayout";
import { Badge, Button, Panel } from "@/components/game/ui";
import { BRIEFING_LAYERS } from "@/lib/game-data";
import { startSession } from "@/lib/gameStore";

export const Route = createFileRoute("/briefing")({
  head: () => ({
    meta: [
      { title: "Mission Briefing — Cipher Vault" },
      { name: "description", content: "Security protocol Omega: five cryptographic layers stand between you and the exit." },
      { property: "og:title", content: "Mission Briefing — Cipher Vault" },
      { property: "og:description", content: "Security protocol Omega: five cryptographic layers stand between you and the exit." },
    ],
  }),
  component: Briefing,
});

function Briefing() {
  const navigate = useNavigate();

  const handleBeginMission = () => {
    startSession(); // stamps startedAt right now — timer begins from this click
    navigate({ to: "/level/$id", params: { id: "1" } });
  };
  return (
    <AppLayout breadcrumb="Mission Briefing">
      <PageHeader
        eyebrow="Security Protocol: Omega"
        title="MISSION BRIEFING"
        right={<Badge tone="warning">Classified</Badge>}
      />

      <Panel glow="primary" className="relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl border border-destructive/40 bg-destructive/10">
            <AlertTriangle className="size-4 text-destructive" />
          </div>
          <h2 className="font-mono text-sm font-bold tracking-[0.2em] text-destructive">
            SYSTEM BREACH DETECTED
          </h2>
        </div>
        <div className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p>You have entered the Cipher Vault.</p>
          <p>Five security layers protect the final exit.</p>
          <p>Each layer is powered by a different cyclic or cryptographic mechanism.</p>
          <p className="text-foreground">Solve the puzzles. Understand the pattern. Break the code. Escape.</p>
        </div>
      </Panel>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BRIEFING_LAYERS.map((layer, i) => {
          const unlocked = i === 0;
          return (
            <motion.div
              key={layer.code}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={unlocked ? "" : "opacity-55"}
            >
              <Panel className="h-full">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-2xl font-bold text-primary/70">{layer.code}</span>
                  {unlocked ? (
                    <Unlock className="size-4 text-success" />
                  ) : (
                    <Lock className="size-4 text-muted-foreground" />
                  )}
                </div>
                <h3 className="mt-4 font-mono text-sm font-bold tracking-[0.16em]">{layer.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{layer.mechanism}</p>
              </Panel>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8">
        <Button onClick={handleBeginMission}>Begin Mission</Button>
      </div>
    </AppLayout>
  );
}
