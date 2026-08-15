import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Search, Calculator, KeyRound, Unlock } from "lucide-react";
import { Badge, Button, Panel } from "@/components/game/ui";
import { CipherWheel, ParticleField } from "@/components/game/visuals";
import { VaultMark } from "@/components/game/Sidebar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cipher Vault — Break the Code, Escape the Vault" },
      {
        name: "description",
        content:
          "A cyber escape-room game built on modular arithmetic. Crack encrypted messages and unlock every security layer before time runs out.",
      },
      { property: "og:title", content: "Cipher Vault — Break the Code, Escape the Vault" },
      {
        property: "og:description",
        content:
          "Master modular arithmetic, crack ciphers, and escape the vault in this futuristic security escape room.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { n: "01", title: "MODULAR TIME", text: "Solve cyclic problems involving clocks and calendars." },
  { n: "02", title: "CRYPTIC LOGIC", text: "Encrypt and decrypt messages using modular arithmetic." },
  { n: "03", title: "ESCAPE", text: "Complete every security layer and unlock the final vault." },
];

const STEPS = [
  { label: "DISCOVER", icon: Search },
  { label: "SOLVE", icon: Calculator },
  { label: "DECRYPT", icon: KeyRound },
  { label: "UNLOCK", icon: Unlock },
];

function Landing() {
  return (
    <div className="grid-bg min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <VaultMark />
          <div className="leading-none">
            <div className="font-mono text-xs font-bold tracking-[0.3em]">CIPHER</div>
            <div className="mt-1 font-mono text-xs font-bold tracking-[0.3em] text-accent">VAULT</div>
          </div>
        </Link>
        <Link to="/dashboard" className="font-mono text-[0.66rem] tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:text-foreground">
          Mission Control
        </Link>
      </header>

      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-2 lg:pt-16">
        <ParticleField />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative min-w-0"
        >
          <Badge tone="primary">Classified // Security System</Badge>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            BREAK THE CODE.
            <br />
            <span className="text-gradient">ESCAPE THE VAULT.</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Master modular arithmetic, crack encrypted messages, and unlock every security layer
            before time runs out.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/briefing">
              <Button>
                Start Mission <ArrowRight className="size-3.5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline">How it works</Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="glass-panel relative overflow-hidden p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="label-xs">Vault Interface</span>
              <span className="font-mono text-[0.6rem] tracking-[0.2em] text-accent">ONLINE</span>
            </div>
            <CipherWheel offset={5} size={320} />
            <div className="mt-6 grid grid-cols-3 gap-2 font-mono text-[0.6rem] tracking-widest text-muted-foreground">
              <span>x ≡ 5 (mod 12)</span>
              <span className="text-center">Σ 26</span>
              <span className="text-right text-accent">KHOOR</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Panel className="h-full">
                <span className="font-mono text-3xl font-bold text-primary/60">{f.n}</span>
                <h3 className="mt-4 font-mono text-sm font-bold tracking-[0.18em]">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </Panel>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="label-xs">How it works</div>
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.label} className="glass-panel flex items-center gap-3 p-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10">
                <s.icon className="size-4 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="label-xs">Step {i + 1}</div>
                <div className="truncate font-mono text-sm font-semibold tracking-[0.14em]">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 sm:px-6">
          <div className="font-mono text-sm font-bold tracking-[0.3em]">CIPHER VAULT</div>
          <p className="text-xs text-muted-foreground">Where mathematics meets cybersecurity.</p>
        </div>
      </footer>
    </div>
  );
}
