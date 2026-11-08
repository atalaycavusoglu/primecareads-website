import en from "./en";
import tr, { type Dict } from "./tr";

export type Lang = "tr" | "en";
export type { Dict };

export const dicts: Record<Lang, Dict> = { tr, en };
