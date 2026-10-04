import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lightbulb, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { PuzzleShell } from "./PuzzleShell";
import { AnswerInput, Button, Modal, Panel, type FeedbackState } from "@/components/game/ui";
import { CipherWheel } from "@/components/game/visuals";
import { recordHint, recordLevelComplete, recordWrongAnswer, resetSession, getSession } from "@/lib/gameStore";

// Puzzle: Decrypt KHOOR with key 3 → answer is HELLO
const CIPHER = "KHOOR";
const PLAIN = "HELLO";
const KEY = 3;

export function Level4() {
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<FeedbackState>("idle");
  const [modal, setModal] = useState<null | "success" | "error" | "hint" | "failed">(null);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const ok = answer.trim().toUpperCase() === PLAIN;
    setState(ok ? "correct" : "incorrect");
    if (ok) {
      setRevealed(true);
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
        step="Level 04 / 05"
        title="THE ENCRYPTION CHAMBER"
        badge="Modulo 26"
        left={
          <Panel glow="primary">
            <div className="label-xs">Alphabet Cipher Wheel</div>
            <div className="mt-4">
              <CipherWheel offset={KEY} />
            </div>
            <div className="mt-4 text-center font-mono text-xs tracking-[0.2em] text-muted-foreground">
              OFFSET {String(KEY).padStart(2, "0")}
            </div>
          </Panel>
        }
        right={
          <>
            <Panel>
              <h2 className="font-mono text-sm font-bold tracking-[0.18em] text-accent">
                INTERCEPT DECRYPTION REQUIRED
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                A Caesar cipher message has been intercepted. Use the cipher wheel and the
                decryption formula to reveal the hidden plaintext.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-center">
                  <div className="label-xs">Ciphertext</div>
                  <div className="mt-2 flex justify-center gap-1.5">
                    {CIPHER.split("").map((c, i) => (
                      <motion.span
                        key={c + i}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                        className="grid size-9 place-items-center rounded-lg border border-destructive/40 bg-destructive/10 font-mono text-base font-bold text-destructive"
                      >
                        {c}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-background/60 p-4 text-center">
                  <div className="label-xs">Key (K)</div>
                  <div className="mt-1 font-mono text-3xl font-bold text-accent">{KEY}</div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-background/70 p-3 text-center font-mono text-sm">
                P = (C − K + 26) mod 26
              </div>

              <div className="mt-5 space-y-3">
                <AnswerInput
                  value={answer}
                  onChange={setAnswer}
                  placeholder="ENTER PLAINTEXT"
                  state={state}
                />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleSubmit}>Decrypt</Button>
                  <Button variant="outline" onClick={() => { recordHint(); setModal("hint"); }}>
                    <Lightbulb className="size-3.5" /> Show Hint
                  </Button>
                </div>
              </div>
            </Panel>

            {/* Reveal character breakdown only AFTER correct answer */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Panel>
                    <div className="label-xs">Character Breakdown</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {CIPHER.split("").map((c, i) => (
                        <motion.div
                          key={c + i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                          className="rounded-lg border border-border bg-background/60 px-2.5 py-2 text-center font-mono text-xs"
                        >
                          <span className="text-destructive">{c}</span>
                          <span className="mx-1 text-muted-foreground">→</span>
                          <span className="text-success">{PLAIN[i]}</span>
                        </motion.div>
                      ))}
                    </div>
                  </Panel>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        }
        footer={<Button onClick={handleSubmit}>Submit</Button>}
      />

      <Modal
        open={modal === "success"}
        onClose={() => setModal(null)}
        onNext={() => navigate({ to: "/level/$id", params: { id: "5" } })}
        tone="success"
        title="✓ Encryption Chamber Bypassed"
        message="Ciphertext decrypted. Ready for the final security layer."
      />
      <Modal
        open={modal === "error"}
        onClose={() => setModal(null)}
        tone="error"
        title="✕ Decryption Failed"
        message={`Incorrect plaintext. You lost 1 life! (${currentLives} ${currentLives === 1 ? "life" : "lives"} remaining)`}
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
        message={`Shift each letter of "${CIPHER}" backward by ${KEY} positions in the alphabet. K−3 = H, H−3 = E, ...`}
      />
    </>
  );
}
