import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Lightbulb, ArrowRight } from "lucide-react";
import { PuzzleShell } from "./PuzzleShell";
import { AnswerInput, Button, Modal, Panel, type FeedbackState } from "@/components/game/ui";

const CIPHER = "FRPSXWHU";
const PLAIN = "COMPUTER";

export function Level5() {
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<FeedbackState>("idle");
  const [solved, setSolved] = useState(false);
  const [modal, setModal] = useState<null | "success" | "error" | "hint">(null);

  // MOCK validation
  const handleSubmit = () => {
    const ok = answer.trim().toUpperCase() === PLAIN;
    setState(ok ? "correct" : "incorrect");
    setSolved(ok);
    setModal(ok ? "success" : "error");
  };

  return (
    <>
      <PuzzleShell
        step="Level 05 / 05"
        title="THE DECRYPTION CORE"
        badge="Final Security Layer"
        left={
          <Panel glow="accent">
            <div className="label-xs">Intercepted Transmission</div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {CIPHER.split("").map((c, i) => (
                <motion.span
                  key={c + i}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.12 }}
                  className="grid size-11 place-items-center rounded-xl border border-destructive/30 bg-destructive/5 font-mono text-lg font-bold text-destructive"
                >
                  {c}
                </motion.span>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-border bg-background/60 p-3 text-center">
              <div className="label-xs">Key</div>
              <div className="mt-1 font-mono text-2xl font-bold text-accent">3</div>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-background/70 p-3 text-center font-mono text-sm">
              P = (C − K + 26) mod 26
            </div>
          </Panel>
        }
        right={
          <>
            <Panel>
              <h2 className="font-mono text-sm font-bold tracking-[0.18em] text-accent">
                DECRYPT THE INTERCEPTED TRANSMISSION
              </h2>
              <div className="mt-5 space-y-3">
                <AnswerInput value={answer} onChange={setAnswer} placeholder="YOUR ANSWER" state={state} />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleSubmit}>Decrypt</Button>
                  <Button variant="outline" onClick={() => setModal("hint")}>
                    <Lightbulb className="size-3.5" /> Show Hint
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel>
              <span className="label-xs">Character Analysis</span>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CIPHER.split("").map((c, i) => (
                  <motion.div
                    key={c + i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-lg border border-border bg-background/60 px-2 py-2 text-center font-mono text-xs"
                  >
                    {c} <span className="text-muted-foreground">→</span>{" "}
                    <span className="text-success">{PLAIN[i]}</span>
                  </motion.div>
                ))}
              </div>
              {solved && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 rounded-xl border border-success/40 bg-success/10 p-4 text-center"
                >
                  <div className="label-xs">Result</div>
                  <div className="mt-1 font-mono text-xl font-bold tracking-[0.3em] text-success">
                    {PLAIN}
                  </div>
                </motion.div>
              )}
            </Panel>

            {solved && (
              <Panel glow="accent" className="text-center">
                <div className="font-mono text-sm font-bold tracking-[0.2em] text-success">
                  DECRYPTION COMPLETE
                </div>
                <p className="mt-2 text-sm text-muted-foreground">FINAL VAULT ACCESS GRANTED</p>
                <div className="mt-4 flex justify-center">
                  <Link to="/vault">
                    <Button>
                      Enter Final Vault <ArrowRight className="size-3.5" />
                    </Button>
                  </Link>
                </div>
              </Panel>
            )}
          </>
        }
      />

      <Modal open={modal === "success"} onClose={() => setModal(null)} tone="success" title="✓ Decryption Complete" message="Final vault access granted." />
      <Modal open={modal === "error"} onClose={() => setModal(null)} tone="error" title="✕ Access Denied" message="Incorrect code. Try again." />
      <Modal open={modal === "hint"} onClose={() => setModal(null)} tone="hint" title="Hint" message="Shift every letter backwards by 3 positions, wrapping around Z → A." />
    </>
  );
}
