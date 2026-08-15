import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Unlock } from "lucide-react";
import { Button, Panel, StatTile } from "@/components/game/ui";
import { ParticleField } from "@/components/game/visuals";
import { PLAYER } from "@/lib/game-data";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: "Vault Unlocked — Cipher Vault" },
      { name: "description", content: "You escaped the Cipher Vault. Review your time, score, hints, and completed security layers." },
      { property: "og:title", content: "Vault Unlocked — Cipher Vault" },
      { property: "og:description", content: "You escaped the Cipher Vault. Review your time, score, hints, and completed security layers." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <div className="grid-bg relative grid min-h-screen place-items-center bg-background px-4 py-12">
      <ParticleField />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl text-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mx-auto grid size-20 place-items-center rounded-3xl border border-success/50 bg-success/10 shadow-[0_0_70px_-18px_var(--color-success)]"
        >
          <Unlock className="size-9 text-success" />
        </motion.div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">VAULT UNLOCKED</h1>
        <p className="mt-2 font-mono text-xs tracking-[0.22em] uppercase text-muted-foreground">
          You escaped the Cipher Vault
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Time" value={PLAYER.time} accent="text-accent" />
          <StatTile label="Score" value={PLAYER.score} accent="text-warning" />
          <StatTile label="Hints" value={PLAYER.hints} />
          <StatTile label="Levels" value="5 / 5" accent="text-success" />
        </div>

        <Panel className="mt-6">
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/solution-log">
              <Button>View Solution Log</Button>
            </Link>
            <Link to="/briefing">
              <Button variant="outline">Play Again</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost">Return to Dashboard</Button>
            </Link>
          </div>
        </Panel>
      </motion.div>
    </div>
  );
}
