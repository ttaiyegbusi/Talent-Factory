import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export const alt = `${SITE_NAME} — ${SITE_DESCRIPTION}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Same mark as Logo.tsx — a single continuous fill path, no separate
 * background circle needed. */
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 172"><path fill="#131216" d="M86,0C38.5,0,0,38.5,0,86s38.5,86,86,86,86-38.5,86-86S133.5,0,86,0ZM127.56,122.24l-1.5,1.44c-2.73,2.62-5.72,4.98-8.9,7.01-8,5.12-17.24,8.21-26.72,8.93-1.51.11-3,.17-4.45.17s-2.94-.06-4.44-.17c-9.49-.72-18.73-3.81-26.73-8.93-3.18-2.04-6.18-4.4-8.9-7.02l-1.5-1.44V52.59h17.89v61.55c5.87,4.32,12.76,6.94,20.03,7.59,2.41.22,4.86.22,7.28,0,7.27-.65,14.17-3.27,20.03-7.59v-51.81h-14.72v44.85h-17.89V32.82l4.43-.4c3-.27,6.04-.27,9.04,0l4.43.4v11.62h32.62v77.8Z"/></svg>`;
const LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fffaeb",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -140,
            width: 480,
            height: 480,
            borderRadius: "50%",
            backgroundColor: "#f6b51e",
            opacity: 0.35,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={LOGO_DATA_URI} width={56} height={56} alt="" />
          <div style={{ fontSize: 34, fontWeight: 700, color: "#171717" }}>
            {SITE_NAME}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: "#171717",
              lineHeight: 1.15,
              maxWidth: 920,
              letterSpacing: "-2px",
            }}
          >
            Every great company runs on people you never see
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#767676" }}>
          talentfactoryhq.com
        </div>
      </div>
    ),
    { ...size }
  );
}
