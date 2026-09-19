import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { profile } from "@/data/site";

export const config = { runtime: "nodejs" };

const font = (pkg, file) =>
  readFile(path.join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

/**
 * 1200x630 Open Graph card, rendered on demand so it always reflects
 * data/site.js. Cached at the CDN for a day.
 */
export default async function handler(req, res) {
  const [serif, sans, sansBold] = await Promise.all([
    font("instrument-serif", "instrument-serif-latin-400-italic.woff"),
    font("plus-jakarta-sans", "plus-jakarta-sans-latin-400-normal.woff"),
    font("plus-jakarta-sans", "plus-jakarta-sans-latin-600-normal.woff"),
  ]);

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: "#08080a",
          color: "#f4f2ee",
          fontFamily: "Plus Jakarta Sans",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -180,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(244,242,238,0.10) 0%, rgba(8,8,10,0) 65%)",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#9a978f" }}>
            <div style={{ width: 10, height: 10, borderRadius: 9999, background: profile.available ? "#7ee2a8" : "#9a978f" }} />
            {profile.available ? "Available for work" : "Portfolio"}
          </div>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#9a978f" }}>
            {`${profile.location} · ${profile.utc}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 118, lineHeight: 1, fontWeight: 600, letterSpacing: -4 }}>
            {`${profile.first} ${profile.last}`}
          </div>
          <div style={{ fontFamily: "Instrument Serif", fontSize: 46, lineHeight: 1.15, color: "#cfcbc3", maxWidth: 980 }}>
            {profile.statement}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 24, color: "#9a978f" }}>
          <div style={{ display: "flex" }}>{profile.role}</div>
          <div style={{ display: "flex", gap: 28 }}>
            {["Web", "Mobile", "Backend", "Applied AI"].map((t) => (
              <div key={t} style={{ display: "flex" }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "italic", weight: 400 },
        { name: "Plus Jakarta Sans", data: sans, style: "normal", weight: 400 },
        { name: "Plus Jakarta Sans", data: sansBold, style: "normal", weight: 600 },
      ],
    }
  );

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  res.send(Buffer.from(await image.arrayBuffer()));
}
