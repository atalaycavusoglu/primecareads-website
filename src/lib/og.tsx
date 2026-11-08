import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Share card in the site's look: navy, grid, glow, Geist type, white logo badge. */
export async function ogImage({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  const root = process.cwd();
  const [regular, semibold, icon] = await Promise.all([
    readFile(join(root, "src/assets/fonts/Geist-400.ttf")),
    readFile(join(root, "src/assets/fonts/Geist-600.ttf")),
    readFile(join(root, "public/icon-512.png")),
  ]);
  const logo = `data:image/png;base64,${icon.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b1222",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(46,65,107,0.95), transparent 55%), radial-gradient(circle at 95% 30%, rgba(91,140,255,0.35), transparent 45%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 56px 56px, 56px 56px",
          color: "white",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={72} height={72} style={{ borderRadius: 18 }} alt="" />
          <div style={{ display: "flex", fontSize: 26, color: "#9cbcff", letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: title.length > 48 ? 64 : 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          {sub && <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "rgba(255,255,255,0.72)", maxWidth: 940, lineHeight: 1.35 }}>{sub}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
          <div style={{ display: "flex" }}>primecareads.com</div>
          <div style={{ display: "flex", height: 6, width: 220, borderRadius: 3, backgroundImage: "linear-gradient(90deg, #5b8cff, #6fe3ff, #5ee6a8)" }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
