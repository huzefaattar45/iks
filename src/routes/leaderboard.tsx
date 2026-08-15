import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AppLayout, PageHeader } from "@/components/game/AppLayout";
import { Panel } from "@/components/game/ui";
import { LEADERBOARD } from "@/lib/game-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Vault Runners — Cipher Vault Leaderboard" },
      { name: "description", content: "See the fastest vault runners ranked by escape time, score, and hints used." },
      { property: "og:title", content: "Vault Runners — Cipher Vault Leaderboard" },
      { property: "og:description", content: "See the fastest vault runners ranked by escape time, score, and hints used." },
    ],
  }),
  component: Leaderboard,
});

const TABS = ["TODAY", "THIS WEEK", "ALL TIME"];

function Leaderboard() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <AppLayout breadcrumb="Leaderboard">
      <PageHeader eyebrow="Rankings" title="VAULT RUNNERS" subtitle="The fastest operatives to breach the vault." />

      <div className="mb-4 inline-flex gap-1 rounded-xl border border-border bg-foreground/[0.03] p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative rounded-lg px-4 py-2 font-mono text-[0.65rem] tracking-[0.16em] transition-colors",
              tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab === t && (
              <motion.span layoutId="lb-tab" className="absolute inset-0 rounded-lg bg-primary/20" />
            )}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <Panel className="overflow-x-auto p-0">
        <table className="w-full min-w-[520px] text-left">
          <thead>
            <tr className="border-b border-border">
              {["Rank", "Player", "Time", "Score", "Hints"].map((h) => (
                <th key={h} className="px-5 py-3 font-mono text-[0.62rem] tracking-[0.2em] uppercase text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LEADERBOARD.map((row) => (
              <tr
                key={row.rank}
                className={cn(
                  "border-b border-border/60 last:border-0 transition-colors hover:bg-foreground/[0.03]",
                  row.isCurrent && "bg-primary/10",
                )}
              >
                <td className="px-5 py-4 font-mono text-sm text-accent">{row.rank}</td>
                <td className="px-5 py-4 text-sm font-semibold">
                  {row.player}
                  {row.isCurrent && (
                    <span className="ml-2 font-mono text-[0.58rem] tracking-[0.16em] text-primary">YOU</span>
                  )}
                </td>
                <td className="px-5 py-4 font-mono text-sm tabular-nums">{row.time}</td>
                <td className="px-5 py-4 font-mono text-sm tabular-nums text-warning">{row.score}</td>
                <td className="px-5 py-4 font-mono text-sm tabular-nums text-muted-foreground">{row.hints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </AppLayout>
  );
}
