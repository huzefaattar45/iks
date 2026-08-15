import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Badge, Button } from "@/components/game/ui";

export function PuzzleShell({
  step,
  title,
  badge,
  left,
  right,
  footer,
}: {
  step: string;
  title: string;
  badge: string;
  left: ReactNode;
  right: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div>
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <div className="label-xs">{step}</div>
          <h1 className="mt-1 truncate text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        </div>
        <Badge tone="accent">{badge}</Badge>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="min-w-0">{left}</div>
        <div className="min-w-0 space-y-4">{right}</div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link to="/levels">
          <Button variant="ghost">
            <ArrowLeft className="size-3.5" /> Back
          </Button>
        </Link>
        {footer}
      </div>
    </div>
  );
}
