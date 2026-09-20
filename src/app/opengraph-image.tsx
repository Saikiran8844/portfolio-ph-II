import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Saikiran Nannapaneni — Software Engineer & Creative Technologist";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#07080a",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(201, 58, 42, 0.18) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(239, 68, 68, 0.12) 0%, transparent 40%)",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Top bar with branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#c93a2a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 800,
                color: "#ffffff",
                boxShadow: "0 0 24px rgba(201, 58, 42, 0.6)",
              }}
            >
              SN
            </div>
            <span
              style={{
                fontSize: "20px",
                letterSpacing: "4px",
                fontWeight: 700,
                color: "#e2e8f0",
                textTransform: "uppercase",
              }}
            >
              SAIKIRAN NANNAPANENI
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              fontSize: "14px",
              color: "#f87171",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            ● Available for Select Gigs
          </div>
        </div>

        {/* Central Hero Heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Software Engineer &amp; <span style={{ color: "#ef4444" }}>Creative Technologist</span>
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            Architecting high-throughput distributed microservices, intelligent AI platforms, and fluid 60fps web experiences.
          </div>
        </div>

        {/* Bottom tags & metrics */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["Distributed Systems", "Spring Boot", "Generative AI", "MCP Agents", "Three.js WebGL"].map(
              (pill, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#cbd5e1",
                    fontFamily: "monospace",
                  }}
                >
                  {pill}
                </div>
              )
            )}
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#64748b",
              fontFamily: "monospace",
            }}
          >
            saikiran.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
