import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { PuzzleShell } from "./PuzzleShell";
import { AnswerInput, Button, MathDisplay, Modal, Panel, type FeedbackState } from "@/components/game/ui";
import { EventTimeline } from "@/components/game/visuals";
import { recordHint, recordLevelComplete, recordWrongAnswer, resetSession, getSession } from "@/lib/gameStore";

export function Level3() {
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<FeedbackState>("idle");
  const [modal, setModal] = useState<null | "success" | "error" | "hint" | "failed">(null);
  const [solved, setSolved] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const ok = answer.trim().toUpperCase() === "SUNDAY";
    setState(ok ? "correct" : "incorrect");
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
        step="Level 03 / 05"
        title="THE RECURRING SIGNAL"
        badge="Cyclic Scheduling"
        left={
          <>
            {/* Before solving: show only a static info panel about cyclic scheduling */}
            <AnimatePresence mode="wait">
              {!solved ? (
                <motion.div
                  key="info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Panel glow="primary">
                    <div className="label-xs">Mission Brief</div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      A security scan repeats on a fixed cycle. Use modular arithmetic to find which
                      weekday the 4th scan falls on.
                    </p>
                    <div className="mt-5 rounded-xl border border-border bg-background/60 p-4 text-center">
                      <div className="label-xs">Cycle Formula</div>
                      <div className="mt-2 font-mono text-base">
                        Day = (Start + N × Interval) mod 7
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      {[
                        { l: "Modulo", v: "7" },
                        { l: "Interval", v: "10" },
                        { l: "Scans", v: "4" },
                      ].map((s) => (
                        <div key={s.l} className="rounded-xl border border-border bg-background/70 p-3">
                          <div className="label-xs">{s.l}</div>
                          <div className="mt-1 font-mono text-xl font-bold text-accent">{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </motion.div>
              ) : (
                /* After solving: reveal the full step-by-step breakdown */
                <motion.div
                  key="solution"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Panel glow="primary">
                    <div className="label-xs">Scan Timeline</div>
                    <div className="mt-5">
                      <EventTimeline />
                    </div>
                  </Panel>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <Panel className="mt-4">
                      <div className="label-xs">Why it works</div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Weekdays repeat on a 7-day cycle, so a 10-day interval only moves the
                        schedule by its remainder.
                      </p>
                      <MathDisplay
                        className="mt-4"
                        lines={["10 mod 7 = 3", "Every event shifts by 3 weekdays", "Real-world scheduling uses this same cycle"]}
                      />
                    </Panel>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        }
        right={
          <>
            <Panel>
              <h2 className="font-mono text-sm font-bold tracking-[0.18em] text-accent">
                REPEATING SCAN DETECTED
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                A security scan runs every 10 days. Today is Friday. Determine the weekday of the
                4th scan.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { l: "Event Interval", v: "10 DAYS" },
                  { l: "Start Day", v: "FRIDAY" },
                  { l: "Occurrences", v: "4" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-border bg-background/60 p-3 text-center">
                    <div className="label-xs">{s.l}</div>
                    <div className="mt-1 font-mono text-sm font-bold">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3">
                <AnswerInput value={answer} onChange={setAnswer} placeholder="ENTER WEEKDAY" state={state} />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleSubmit}>Submit Answer</Button>
                  <Button variant="outline" onClick={() => { recordHint(); setModal("hint"); }}>
                    <Lightbulb className="size-3.5" /> Show Hint
                  </Button>
                </div>
              </div>
            </Panel>
          </>
        }
      />

      <Modal
        open={modal === "success"}
        onClose={() => setModal(null)}
        onNext={() => navigate({ to: "/level/$id", params: { id: "4" } })}
        tone="success"
        title="✓ Signal Locked"
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
        message="Each scan shifts 3 weekdays. Apply that shift three times from Friday."
      />
    </>
  );
}
