"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, LoaderCircle, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site } from "@/config";
import { trackLead } from "@/lib/analytics";
import { sendForm } from "@/lib/forms";
import { Reveal } from "./ui";
import { useT } from "./LangProvider";

/** Newsletter sign-up. Needs the Web3Forms key; without it the block is not rendered. */
export default function Newsletter() {
  const n = useT().newsletter;
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  if (!site.web3formsKey) return null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    if (f.get("botcheck")) return;
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError(n.invalid);
    if (!f.get("consent")) return setError(n.needConsent);
    setError("");
    setState("sending");
    const ok = await sendForm(n.title, { email, consent: n.consent });
    if (!ok) return setState("error");
    trackLead("newsletter");
    setState("done");
  };

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-10">
        <div aria-hidden className="absolute -right-20 -top-20 size-64 rounded-full bg-glow/15 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <span className="grid size-11 place-items-center rounded-2xl bg-navy text-white"><Mail className="size-5" /></span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{n.title}</h2>
            <p className="mt-2 text-fg/70">{n.text}</p>
          </div>
          <AnimatePresence mode="wait">
            {state === "done" ? (
              <motion.p key="done" role="status" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 rounded-2xl bg-mint/15 p-5 font-medium text-emerald-800 dark:text-mint">
                <CheckCircle2 className="size-6 shrink-0" /> {n.done}
              </motion.p>
            ) : (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label htmlFor="nl-email" className="sr-only">{n.email}</label>
                  <input
                    id="nl-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={n.email}
                    className="min-w-0 flex-1 rounded-full border border-line bg-mist px-5 py-3 text-fg outline-none transition placeholder:text-fg/50 focus:border-glow focus:ring-4 focus:ring-glow/15"
                  />
                  <button type="submit" disabled={state === "sending"} className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-medium text-white transition hover:bg-navy-600 disabled:opacity-70">
                    {state === "sending" && <LoaderCircle className="size-4 animate-spin" />}
                    {n.submit}
                  </button>
                </div>
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <label className="flex cursor-pointer items-start gap-2.5 text-sm text-fg/70">
                  <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 accent-navy" />
                  {n.consent}
                </label>
                {(error || state === "error") && <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">{error || n.error}</p>}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}
