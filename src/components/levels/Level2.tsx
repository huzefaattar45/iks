import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { PuzzleShell } from "./PuzzleShell";
import { Button, MathDisplay, Modal, Panel } from "@/components/game/ui";
import { CalendarWheel } from "@/components/game/visuals";
import { cn } from "@/lib/utils";
import { recordHint, recordLevelComplete, recordWrongAnswer, resetSession, getSession } from "@/lib/gameStore";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

export function Level2() {
  const [selected, setSelected] = useState<string | null>(null);
  const [modal, setModal] = useState<null | "success" | "error" | "hint" | "failed">(null);
  const [solved, setSolved] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const ok = selected === "THURSDAY";
    if (ok) {
      setSolved(true);
      recordLevelComplete();
      setModal("success");
    } else {
      const { failed } = recordWrongAnswer();
      setModal(failed ? "failed" : "error");
    }
  };

  const handleRestart = () => {
    resetSession();
    navigate({ to: "/briefing" });
  };

  const currentLives = getSession().lives;

  return (
    <>
      <PuzzleShell
        step="Level 02 / 05"
        title="THE CALENDAR LOCK"
        badge="Modulo 7"
        left={
          <Panel glow="primary">
            <CalendarWheel activeIndex={0} />
          </Panel>
        }
        right={
          <>
            <Panel>
              <h2 className="font-mono text-sm font-bold tracking-[0.18em] text-accent">
                SEVEN-DAY CYCLE DETECTED
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                The system was activated on Monday. It will trigger again after 45 days. Which
                weekday will it activate?
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {DAYS.map((d) => (
                  <motion.button
                    key={d}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelected(d)}
                    className={cn(
                      "rounded-xl border px-3 py-3 font-mono text-[0.68rem] tracking-[0.14em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selected === d
                        ? "border-primary/60 bg-primary/20 text-foreground glow-primary"
                        : "border-border bg-foreground/[0.03] text-muted-foreground hover:border-accent/40 hover:text-foreground",
                    )}
                  >
                    {d}
                  </motion.button>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button onClick={handleSubmit} disabled={!selected}>
                  Submit Answer
                </Button>
                <Button variant="outline" onClick={() => { recordHint(); setModal("hint"); }}>
                  <Lightbulb className="size-3.5" /> Show Hint
                </Button>
              </div>
            </Panel>

            <AnimatePresence>
              {solved && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Panel className="bg-background/70">
                    <div className="label-xs">Remainder Log // Terminal</div>
                    <MathDisplay className="mt-3" lines={["45 mod 7 = 3", "Monday + 3 = Thursday"]} />
                  </Panel>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        }
      />

      <Modal
        open={modal === "success"}
        onClose={() => setModal(null)}
        onNext={() => navigate({ to: "/level/$id", params: { id: "3" } })}
        tone="success"
        title="✓ Calendar Lock Disabled"
        message="Security layer disabled. Ready for the next challenge."
      />
      <Modal
        open={modal === "error"}
        onClose={() => setModal(null)}
        tone="error"
        title="✕ Access Denied"
        message={`Incorrect code. You lost 1 life! (${currentLives} ${currentLives === 1 ? "life" : "lives"} remaining)`}
      />
      <Modal
        open={modal === "failed"}
        onClose={handleRestart}
        onNext={handleRestart}
        nextLabel="Restart Mission ↻"
        closeLabel="Return to Briefing"
        tone="failed"
        title="☠ MISSION FAILED"
        message="All lives exhausted! The security system detected intrusion and locked down the Cipher Vault."
      />
      <Modal
        open={modal === "hint"}
        onClose={() => setModal(null)}
        tone="hint"
        title="Hint"
        message="Weeks repeat every 7 days — only the remainder of 45 ÷ 7 matters."
      />
    </>
  );
}
