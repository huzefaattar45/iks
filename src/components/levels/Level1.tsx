import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { PuzzleShell } from "./PuzzleShell";
import { AnswerInput, Button, Modal, Panel, ReasoningPanel, type FeedbackState } from "@/components/game/ui";
import { ClockVisualization } from "@/components/game/visuals";
import { recordHint, recordLevelComplete, recordWrongAnswer, resetSession, getSession } from "@/lib/gameStore";

export function Level1() {
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<FeedbackState>("idle");
  const [modal, setModal] = useState<null | "success" | "error" | "hint" | "failed">(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const ok = answer.trim() === "2";
    setState(ok ? "correct" : "incorrect");
    if (ok) {
      recordLevelComplete();
      setModal("success");
    } else {
      const { failed } = recordWrongAnswer();
      setModal(failed ? "failed" : "error");
    }
  };
  const handleHint = () => { recordHint(); setModal("hint"); };
  const handleRestart = () => {
    resetSession();
    navigate({ to: "/briefing" });
  };

  const currentLives = getSession().lives;

  return (
    <>
      <PuzzleShell
        step="Level 01 / 05"
        title="THE TIME LOCK"
        badge="Modulo 12"
        left={
          <Panel glow="primary">
            <ClockVisualization hour={9} minute={0} />
          </Panel>
        }
        right={
          <>
            <Panel>
              <h2 className="font-mono text-sm font-bold tracking-[0.18em] text-accent">
                THE SYSTEM CLOCK HAS SHIFTED
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                The security system currently shows 9. It will advance by 17 hours. What number will
                appear?
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-background/60 p-4 text-center">
                  <div className="label-xs">Current</div>
                  <div className="mt-1 font-mono text-3xl font-bold">09</div>
                </div>
                <div className="rounded-xl border border-border bg-background/60 p-4 text-center">
                  <div className="label-xs">Shift</div>
                  <div className="mt-1 font-mono text-3xl font-bold text-accent">+17</div>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <AnswerInput value={answer} onChange={setAnswer} state={state} />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleSubmit}>Submit Answer</Button>
                  <Button variant="outline" onClick={handleHint}>
                    <Lightbulb className="size-3.5" /> Show Hint
                  </Button>
                </div>
              </div>
            </Panel>
            <ReasoningPanel lines={["17 mod 12 = 5", "9 + 5 = 14", "14 mod 12 = 2"]} />
          </>
        }
        footer={<Button onClick={handleSubmit}>Submit</Button>}
      />

      <Modal
        open={modal === "success"}
        onClose={() => setModal(null)}
        onNext={() => navigate({ to: "/level/$id", params: { id: "2" } })}
        tone="success"
        title="✓ Time Lock Disabled"
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
        message="Reduce the shift modulo 12 before adding it to the current hour."
      />
    </>
  );
}
