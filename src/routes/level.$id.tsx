import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/game/AppLayout";
import { Level1 } from "@/components/levels/Level1";
import { Level2 } from "@/components/levels/Level2";
import { Level3 } from "@/components/levels/Level3";
import { Level4 } from "@/components/levels/Level4";
import { Level5 } from "@/components/levels/Level5";
import { LEVELS } from "@/lib/game-data";

export const Route = createFileRoute("/level/$id")({
  head: () => ({
    meta: [
      { title: "Security Layer — Cipher Vault" },
      { name: "description", content: "Solve the modular arithmetic puzzle and disable this security layer of the Cipher Vault." },
      { property: "og:title", content: "Security Layer — Cipher Vault" },
      { property: "og:description", content: "Solve the modular arithmetic puzzle and disable this security layer of the Cipher Vault." },
    ],
  }),
  component: LevelPage,
});

function LevelPage() {
  const { id } = Route.useParams();
  const level = LEVELS.find((l) => String(l.id) === id);

  const body =
    id === "1" ? <Level1 /> : id === "2" ? <Level2 /> : id === "3" ? <Level3 /> : id === "4" ? <Level4 /> : id === "5" ? <Level5 /> : (
      <div className="glass-panel p-6 text-sm text-muted-foreground">Unknown security layer.</div>
    );

  return <AppLayout breadcrumb={level ? `Level ${level.code} — ${level.title}` : "Level"}>{body}</AppLayout>;
}
