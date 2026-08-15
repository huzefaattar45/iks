import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AppLayout, PageHeader } from "@/components/game/AppLayout";
import { Badge, MathDisplay, Panel } from "@/components/game/ui";
import { SOLUTION_LOG } from "@/lib/game-data";

export const Route = createFileRoute("/solution-log")({
  head: () => ({
    meta: [
      { title: "Solution Log — Cipher Vault" },
      { name: "description", content: "A step-by-step record of the remainder-based reasoning behind every solved security layer." },
      { property: "og:title", content: "Solution Log — Cipher Vault" },
      { property: "og:description", content: "A step-by-step record of the remainder-based reasoning behind every solved security layer." },
    ],
  }),
  component: SolutionLog,
});

function SolutionLog() {
  return (
    <AppLayout breadcrumb="Solution Log">
      <PageHeader eyebrow="Archive" title="SOLUTION LOG" subtitle="Your remainder-based reasoning." />

      <div className="relative pl-6 sm:pl-8">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent sm:left-3" />
        <div className="space-y-5">
          {SOLUTION_LOG.map((entry, i) => (
            <motion.div
              key={entry.code}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative"
            >
              <span className="absolute -left-[1.35rem] top-6 size-2.5 rounded-full bg-accent sm:-left-[1.6rem]" />
              <Panel>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="label-xs">{entry.code}</div>
                    <h3 className="mt-1 font-mono text-sm font-bold tracking-[0.16em]">{entry.title}</h3>
                  </div>
                  <Badge tone="success">Answer: {entry.answer}</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Problem: {entry.problem}</p>
                <MathDisplay className="mt-4" lines={entry.steps} />
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
