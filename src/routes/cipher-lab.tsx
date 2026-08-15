import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/game/AppLayout";
import { Button, Panel } from "@/components/game/ui";
import { CipherWheel } from "@/components/game/visuals";
import { ALPHABET, caesar, shiftLetter } from "@/lib/game-data";

export const Route = createFileRoute("/cipher-lab")({
  head: () => ({
    meta: [
      { title: "Cipher Lab — Cipher Vault" },
      { name: "description", content: "Experiment with cyclic encryption: shift the alphabet wheel and watch modulo 26 mappings update live." },
      { property: "og:title", content: "Cipher Lab — Cipher Vault" },
      { property: "og:description", content: "Experiment with cyclic encryption: shift the alphabet wheel and watch modulo 26 mappings update live." },
    ],
  }),
  component: CipherLab,
});

function CipherLab() {
  const [text, setText] = useState("CIPHER");
  const [key, setKey] = useState(3);
  const [output, setOutput] = useState("FLSKHU");

  const handleEncrypt = () => setOutput(caesar(text, key));
  const handleDecrypt = () => setOutput(caesar(text, -key));
  const handleReset = () => {
    setText("CIPHER");
    setKey(3);
    setOutput("FLSKHU");
  };

  return (
    <AppLayout breadcrumb="Cipher Lab">
      <PageHeader eyebrow="Sandbox" title="CIPHER LAB" subtitle="Experiment with cyclic encryption." />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <Panel>
            <span className="label-xs">Plaintext</span>
            <input
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase())}
              aria-label="Plaintext"
              className="mt-2 w-full rounded-xl border border-input bg-background/70 px-3 py-2.5 font-mono text-sm tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="mt-5 flex items-center justify-between">
              <span className="label-xs">Key</span>
              <span className="font-mono text-sm text-accent">{key}</span>
            </div>
            <input
              type="range"
              min={0}
              max={25}
              value={key}
              onChange={(e) => setKey(Number(e.target.value))}
              aria-label="Key"
              className="mt-2 w-full accent-[var(--color-primary)]"
            />
            <div className="mt-5 flex flex-wrap gap-2">
              <Button onClick={handleEncrypt}>Encrypt</Button>
              <Button variant="outline" onClick={handleDecrypt}>Decrypt</Button>
              <Button variant="ghost" onClick={handleReset}>
                <RotateCcw className="size-3.5" /> Reset
              </Button>
            </div>
          </Panel>

          <Panel glow="primary">
            <CipherWheel offset={key} />
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel glow="accent">
            <span className="label-xs">Encrypted Output</span>
            <div className="mt-3 break-all rounded-xl border border-accent/30 bg-accent/5 p-4 text-center font-mono text-xl font-bold tracking-[0.3em] text-accent">
              {output || "—"}
            </div>
          </Panel>

          <Panel className="bg-background/70 text-center">
            <div className="label-xs">Formula</div>
            <div className="mt-2 font-mono text-lg">C = (P + K) mod 26</div>
          </Panel>

          <Panel>
            <span className="label-xs">Character Mappings</span>
            <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-4">
              {ALPHABET.map((c) => (
                <div
                  key={c}
                  className="rounded-lg border border-border bg-background/60 px-2 py-1.5 text-center font-mono text-[0.7rem]"
                >
                  {c} <span className="text-muted-foreground">→</span>{" "}
                  <span className="text-accent">{shiftLetter(c, key)}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </AppLayout>
  );
}
