import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Unlock } from "lucide-react";
import { Button, Panel, StatTile } from "@/components/game/ui";
import { ParticleField } from "@/components/game/visuals";
import { finishSession, resetSession, formatTime, elapsedSeconds, getSession } from "@/lib/gameStore";

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
  // Freeze the timer the moment this page mounts
  useEffect(() => {
    finishSession();
  }, []);

  // Snapshot final values from the (now-frozen) session
  const session = getSession();
  const time = formatTime(elapsedSeconds());
  const score = session.score;
  const hints = session.hintsUsed;
  const levels = Math.min(session.levelsCompleted, 5);

  const navigate = useNavigate();

  const handlePlayAgain = () => {
    resetSession(); // wipe state so next run starts from zero
    navigate({ to: "/briefing" });
  };

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
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">🎉 CONGRATULATIONS!</h1>
        <p className="mt-2 font-mono text-xs tracking-[0.22em] uppercase text-muted-foreground">
          You Finished the Mission
        </p>
        <p className="mt-3 max-w-sm mx-auto text-sm text-muted-foreground">
          All 5 security layers disabled. The Cipher Vault is yours.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Time" value={time} accent="text-accent" />
          <StatTile label="Score" value={score} accent="text-warning" />
          <StatTile label="Hints" value={hints} />
          <StatTile label="Levels" value={`${levels} / 5`} accent="text-success" />
        </div>

        <Panel className="mt-6">
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/solution-log">
              <Button>View Solution Log</Button>
            </Link>
            <Button variant="outline" onClick={handlePlayAgain}>
              Play Again
            </Button>
            <Link to="/dashboard">
              <Button variant="ghost">Return to Dashboard</Button>
            </Link>
          </div>
        </Panel>
      </motion.div>
    </div>
  );
}
