"use client";

import { createContext, useContext, type ReactNode } from "react";
import { dicts, type Lang } from "@/i18n";

/** `alt` is this page's address in the other language, used by the TR | EN switch. */
const LangContext = createContext<{ lang: Lang; alt: string }>({ lang: "tr", alt: "/en/" });

export function LangProvider({ lang, alt, children }: { lang: Lang; alt: string; children: ReactNode }) {
  return <LangContext.Provider value={{ lang, alt }}>{children}</LangContext.Provider>;
}

/** The dictionary for the current page language. */
export function useT() {
  return dicts[useContext(LangContext).lang];
}

export function useAlt() {
  return useContext(LangContext).alt;
}
