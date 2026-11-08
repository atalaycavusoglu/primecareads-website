"use client";

import { AnimatePresence, motion } from "motion/react";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import { trackingEnabled } from "@/config";
import { loadTracking, onOpenConsent, readConsent, saveConsent } from "@/lib/analytics";
import { ease } from "./ui";
import { useT } from "./LangProvider";

/** Shown only when a tracking ID is configured; tracking loads after "Accept". */
export default function ConsentBanner() {
  const t = useT();
  const c = t.consent;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!trackingEnabled) return;
    const v = readConsent();
    if (v === "granted") loadTracking();
    if (v === null) setOpen(true);
    return onOpenConsent(() => setOpen(true));
  }, []);

  const choose = (v: "granted" | "denied") => {
    saveConsent(v);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-h"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease }}
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-3xl border border-white/12 bg-ink/95 p-5 text-white shadow-2xl shadow-black/40 backdrop-blur-xl sm:bottom-5 sm:p-6"
        >
          <div className="flex gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-cyan">
              <Cookie className="size-5" />
            </span>
            <div>
              <h2 id="consent-h" className="font-semibold">{c.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                {c.text}{" "}
                <a href={t.routes.cookies} className="text-sky underline-offset-2 hover:underline">{c.policy}</a>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => choose("granted")} className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-sky">
                  {c.accept}
                </button>
                <button type="button" onClick={() => choose("denied")} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
                  {c.reject}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
