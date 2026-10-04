import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check, Lock, Unlock, Delete } from "lucide-react";
import { Badge, Button, Panel } from "@/components/game/ui";
import { ParticleField } from "@/components/game/visuals";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "Final Vault — Cipher Vault" },
      { name: "description", content: "All five layers breached. Enter the final access code and open the vault door." },
      { property: "og:title", content: "Final Vault — Cipher Vault" },
      { property: "og:description", content: "All five layers breached. Enter the final access code and open the vault door." },
    ],
  }),
  component: VaultPage,
});

const LAYERS = ["CLOCK", "CALENDAR", "EVENT", "ENCRYPTION", "DECRYPTION"];
const MOCK_CODE = "2374";

function VaultPage() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  // MOCK unlock logic
  const handleUnlock = () => {
    if (code === MOCK_CODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };
  const press = (d: string) => {
    setError(false);
    setCode((c) => (c.length < 4 ? c + d : c));
  };

  return (
    <div className="grid-bg relative min-h-screen bg-background px-4 py-10">
      <ParticleField />
      <div className="relative mx-auto max-w-3xl text-center">
        <Badge tone="primary">Final Security Protocol</Badge>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
          {unlocked ? "VAULT UNLOCKED" : "FINAL VAULT"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">All five layers have been breached.</p>

        <div className="relative mx-auto mt-10 grid aspect-square w-full max-w-xs place-items-center">
          <motion.div
            animate={{ rotate: unlocked ? 220 : 0 }}
            transition={{ type: "spring", stiffness: 30, damping: 12 }}
            className={cn(
              "absolute inset-0 rounded-full border-2 border-dashed",
              unlocked ? "border-success/50" : "border-primary/40",
            )}
          />
          <motion.div
            animate={{ rotate: unlocked ? -160 : 0 }}
            transition={{ type: "spring", stiffness: 26, damping: 12 }}
            className="absolute inset-8 rounded-full border border-accent/30"
          />
          <div
            className={cn(
              "grid size-24 place-items-center rounded-full border",
              unlocked
                ? "border-success/60 bg-success/15 shadow-[0_0_60px_-12px_var(--color-success)]"
                : "border-primary/60 bg-primary/15 glow-primary",
            )}
          >
            <AnimatePresence mode="wait">
              {unlocked ? (
                <motion.span key="u" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <Unlock className="size-8 text-success" />
                </motion.span>
              ) : (
                <motion.span key="l" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <Lock className="size-8 text-accent" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {LAYERS.map((l) => (
            <span
              key={l}
              className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1 font-mono text-[0.62rem] tracking-[0.18em] text-success"
            >
              <Check className="size-3" /> {l}
            </span>
          ))}
        </div>

        <Panel className="mx-auto mt-10 max-w-md">
          <div className="label-xs">Final Access Code</div>
          <div className="mt-4 flex justify-center gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                animate={error ? { x: [0, -6, 6, 0] } : { x: 0 }}
                className={cn(
                  "grid size-14 place-items-center rounded-xl border font-mono text-2xl font-bold",
                  error ? "border-destructive/60 text-destructive" : "border-border text-foreground",
                )}
              >
                {code[i] ?? "_"}
              </motion.div>
            ))}
          </div>

          <div className="mx-auto mt-6 grid max-w-xs grid-cols-3 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
              <motion.button
                key={d}
                whileTap={{ scale: 0.94 }}
                onClick={() => press(d)}
                className="rounded-xl border border-border bg-foreground/[0.03] py-3 font-mono text-lg transition-colors hover:bg-foreground/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {d}
              </motion.button>
            ))}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setCode("")}
              className="rounded-xl border border-border bg-foreground/[0.03] py-3 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear"
            >
              <Delete className="mx-auto size-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => press("0")}
              className="rounded-xl border border-border bg-foreground/[0.03] py-3 font-mono text-lg transition-colors hover:bg-foreground/[0.08]"
            >
              0
            </motion.button>
            <Button onClick={handleUnlock} className="px-2">
              Unlock
            </Button>
          </div>

          {error && (
            <p className="mt-4 font-mono text-[0.68rem] tracking-[0.18em] text-destructive">
              ✕ ACCESS DENIED — INVALID PASSCODE
            </p>
          )}
        </Panel>

        <AnimatePresence>
          {unlocked && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <div className="font-mono text-sm font-bold tracking-[0.25em] text-success">
                ACCESS GRANTED // MISSION COMPLETE
              </div>
              <div className="mt-4 flex justify-center">
                <Link to="/success">
                  <Button>View Results</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
