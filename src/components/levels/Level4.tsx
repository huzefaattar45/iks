import { useState } from "react";
import { motion } from "motion/react";
import { RotateCcw, Lock } from "lucide-react";
import { PuzzleShell } from "./PuzzleShell";
import { Button, Panel } from "@/components/game/ui";
import { CipherWheel } from "@/components/game/visuals";
import { caesar, shiftLetter } from "@/lib/game-data";

export function Level4() {
  const [key, setKey] = useState(3);
  const [plain, setPlain] = useState("HELLO");
  const [output, setOutput] = useState("KHOOR");
  const [custom, setCustom] = useState("");
  const [customOut, setCustomOut] = useState("");

  // MOCK behaviour — swap for the real engine later.
  const handleEncrypt = () => setOutput(caesar(plain, key));
  const handleReset = () => {
    setPlain("HELLO");
    setKey(3);
    setOutput("KHOOR");
  };

  return (
    <PuzzleShell
      step="Level 04 / 05"
      title="THE ENCRYPTION CHAMBER"
      badge="Modulo 26"
      left={
        <Panel glow="primary">
          <div className="label-xs">Alphabet Cipher Wheel</div>
          <div className="mt-4">
            <CipherWheel offset={key} />
          </div>
          <div className="mt-4 text-center font-mono text-xs tracking-[0.2em] text-muted-foreground">
            OFFSET {String(key).padStart(2, "0")}
          </div>
        </Panel>
      }
      right={
        <>
          <Panel>
            <div className="flex items-center justify-between">
              <span className="label-xs">Encryption Terminal</span>
              <Lock className="size-4 text-accent" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <label className="sm:col-span-2">
                <span className="label-xs">Plaintext</span>
                <input
                  value={plain}
                  onChange={(e) => setPlain(e.target.value.toUpperCase())}
                  className="mt-1 w-full rounded-xl border border-input bg-background/70 px-3 py-2 font-mono text-sm tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label>
                <span className="label-xs">Key</span>
                <input
                  type="number"
                  min={0}
                  max={25}
                  value={key}
                  onChange={(e) => setKey(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-input bg-background/70 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            </div>

            <div className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-4 text-center">
              <div className="label-xs">Output</div>
              <div className="mt-1 font-mono text-2xl font-bold tracking-[0.3em] text-accent">
                {output}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {plain.split("").map((c, i) => (
                <motion.span
                  key={c + i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5 font-mono text-xs"
                >
                  {c} <span className="text-muted-foreground">→</span>{" "}
                  <span className="text-accent">{shiftLetter(c, key)}</span>
                </motion.span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={handleEncrypt}>Encrypt</Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="size-3.5" /> Reset
              </Button>
            </div>
          </Panel>

          <Panel className="bg-background/70 text-center">
            <div className="label-xs">Formula</div>
            <div className="mt-2 font-mono text-lg">C = (P + K) mod 26</div>
          </Panel>

          <Panel>
            <span className="label-xs">Try your own message</span>
            <div className="mt-3 space-y-3">
              <input
                value={custom}
                onChange={(e) => setCustom(e.target.value.toUpperCase())}
                placeholder="TYPE MESSAGE"
                aria-label="Type message"
                className="w-full rounded-xl border border-input bg-background/70 px-3 py-2 font-mono text-sm tracking-[0.2em] placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button onClick={() => setCustomOut(caesar(custom, key))}>Encrypt Message</Button>
              {customOut && (
                <div className="rounded-xl border border-border bg-background/60 p-3 text-center font-mono text-sm tracking-[0.25em] text-accent">
                  {customOut}
                </div>
              )}
            </div>
          </Panel>
        </>
      }
    />
  );
}
