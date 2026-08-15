import { createFileRoute } from "@tanstack/react-router";
import { Clock, CalendarDays, Binary, ArrowDown } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/game/AppLayout";
import { MathDisplay, Panel } from "@/components/game/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Mathematics Behind the Vault — Cipher Vault" },
      { name: "description", content: "Learn how modular arithmetic powers clocks, weekday cycles, scheduling, and classical ciphers." },
      { property: "og:title", content: "The Mathematics Behind the Vault — Cipher Vault" },
      { property: "og:description", content: "Learn how modular arithmetic powers clocks, weekday cycles, scheduling, and classical ciphers." },
    ],
  }),
  component: About,
});

const CARDS = [
  { mod: "MOD 12", title: "CLOCKS", icon: Clock, text: "Hours wrap around a 12-position dial." },
  { mod: "MOD 7", title: "WEEKDAYS", icon: CalendarDays, text: "Days repeat on a 7-step cycle." },
  { mod: "MOD 26", title: "ALPHABET / CIPHER", icon: Binary, text: "Letters shift around a 26-symbol ring." },
];

const CHAIN = ["NUMBER", "REMAINDER", "CYCLIC PATTERN", "APPLICATION"];

function About() {
  return (
    <AppLayout breadcrumb="About">
      <PageHeader eyebrow="Learn" title="THE MATHEMATICS BEHIND THE VAULT" />

      <Panel glow="primary">
        <h2 className="font-mono text-sm font-bold tracking-[0.18em] text-accent">
          WHAT IS MODULAR ARITHMETIC?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          When numbers exceed a cycle, they wrap around. Instead of growing forever, values fall
          back to the remainder left after dividing by the size of the cycle.
        </p>
        <MathDisplay className="mt-4" lines={["17 mod 12 = 5", "45 mod 7 = 3", "(7 + 3) mod 26 = 10"]} />
      </Panel>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {CARDS.map((c) => (
          <Panel key={c.mod} className="h-full">
            <div className="grid size-10 place-items-center rounded-xl border border-accent/30 bg-accent/10">
              <c.icon className="size-4 text-accent" />
            </div>
            <div className="mt-4 font-mono text-xs tracking-[0.2em] text-primary">{c.mod}</div>
            <h3 className="mt-1 font-mono text-sm font-bold tracking-[0.14em]">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
          </Panel>
        ))}
      </div>

      <Panel className="mt-6">
        <span className="label-xs">Real-world applications</span>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          {["Time Management", "Scheduling", "Cryptography", "Computer Science"].map((a) => (
            <div key={a} className="rounded-xl border border-border bg-background/60 px-3 py-3 text-center text-xs">
              {a}
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="mt-6">
        <span className="label-xs">The pattern chain</span>
        <div className="mt-5 flex flex-col items-center gap-2">
          {CHAIN.map((c, i) => (
            <div key={c} className="flex w-full max-w-xs flex-col items-center gap-2">
              <div className="w-full rounded-xl border border-primary/30 bg-primary/10 py-3 text-center font-mono text-xs tracking-[0.18em]">
                {c}
              </div>
              {i < CHAIN.length - 1 && <ArrowDown className="size-4 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </Panel>
    </AppLayout>
  );
}
