import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { PuzzleShell } from "./PuzzleShell";
import { AnswerInput, Button, MathDisplay, Modal, Panel, type FeedbackState } from "@/components/game/ui";
import { EventTimeline } from "@/components/game/visuals";

export function Level3() {
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<FeedbackState>("idle");
  const [modal, setModal] = useState<null | "success" | "error" | "hint">(null);

  // MOCK validation
  const handleSubmit = () => {
    const ok = answer.trim().toUpperCase() === "SUNDAY";
    setState(ok ? "correct" : "incorrect");
    setModal(ok ? "success" : "error");
  };

  return (
    <>
      <PuzzleShell
        step="Level 03 / 05"
        title="THE RECURRING SIGNAL"
        badge="Cyclic Scheduling"
        left={
          <>
            <Panel glow="primary">
              <div className="label-xs">Scan Timeline</div>
              <div className="mt-5">
                <EventTimeline />
              </div>
            </Panel>
            <Panel className="mt-4">
              <div className="label-xs">Why it works</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Weekdays repeat on a 7-day cycle, so a 10-day interval only moves the schedule by
                its remainder.
              </p>
              <MathDisplay
                className="mt-4"
                lines={["10 mod 7 = 3", "Every event shifts by 3 weekdays", "Real-world scheduling uses this same cycle"]}
              />
            </Panel>
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
                  <Button variant="outline" onClick={() => setModal("hint")}>
                    <Lightbulb className="size-3.5" /> Show Hint
                  </Button>
                </div>
              </div>
            </Panel>
          </>
        }
      />

      <Modal open={modal === "success"} onClose={() => setModal(null)} tone="success" title="✓ Signal Locked" message="Security layer disabled." />
      <Modal open={modal === "error"} onClose={() => setModal(null)} tone="error" title="✕ Access Denied" message="Incorrect code. Try again." />
      <Modal open={modal === "hint"} onClose={() => setModal(null)} tone="hint" title="Hint" message="Each scan shifts 3 weekdays. Apply that shift three times from Friday." />
    </>
  );
}
