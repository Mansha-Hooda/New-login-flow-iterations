"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FONT = { fontFamily: "var(--font-lexend-deca)" };

export default function CommonFieldPage() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const isPhone = /^\d{10}$/.test(value);
  const isEmail = value.includes("@");
  const isValid = isPhone || isEmail;

  const handleProceed = () => {
    if (!isValid) return;
    if (isPhone) {
      router.push(`/iterations/mobile-number/otp?number=${value}`);
    } else {
      router.push(`/iterations/work-personal/otp?email=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div style={{ background: "#F5F7F8", minHeight: "100svh", display: "flex", justifyContent: "center" }}>
      <div style={{
        width: "100%", maxWidth: 390,
        display: "flex", flexDirection: "column", minHeight: "100svh",
        background: "white", overflow: "hidden", ...FONT,
      }}>

        {/* ── Hero carousel — 346px, edge-to-edge ── */}
        <div style={{ width: "100%", height: 346, position: "relative", flexShrink: 0 }}>
          <Image
            src="/images/carousel-01.png"
            alt="Consult with Top Doctors Online or In-Clinic"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            priority
          />
        </div>

        {/* ── White content panel — 356px ── */}
        <div style={{
          height: 356, background: "white",
          overflow: "hidden", flexShrink: 0,
          display: "flex", justifyContent: "center",
        }}>
          {/* Inner: 324px wide, 16px top padding, 16px gap */}
          <div style={{
            width: 324, paddingTop: 16,
            display: "flex", flexDirection: "column", gap: 16,
          }}>

            {/* ── Input ── */}
            <div style={{
              width: "100%", height: 48,
              display: "flex", alignItems: "center",
              padding: "0 12px",
              border: `1px solid ${isValid ? "#0066DC" : "#A4B0C0"}`,
              borderRadius: 10,
              background: "white",
              boxShadow: "0px 1px 1px rgba(23,27,34,0.05)",
              transition: "border-color 0.15s",
            }}>
              <input
                type="text"
                inputMode="text"
                placeholder="Enter Mobile Number or Email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleProceed()}
                autoComplete="off"
                style={{
                  flex: 1, border: "none", outline: "none", background: "transparent",
                  fontSize: 14, fontWeight: 500, color: "#252D38",
                  caretColor: "#0066DC", ...FONT,
                }}
              />
            </div>

            {/* ── Proceed button ── */}
            <button
              onClick={handleProceed}
              disabled={!isValid}
              style={{
                width: "100%", padding: "12px 18px",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8,
                background: isValid ? "#0066DC" : "#DBE0E6",
                border: `1px solid ${isValid ? "#0066DC" : "#BFC8D2"}`,
                color: isValid ? "white" : "#8A99AD",
                fontSize: 16, fontWeight: 700, lineHeight: "24px",
                cursor: isValid ? "pointer" : "not-allowed",
                boxShadow: "0px 1px 2px rgba(23,27,34,0.05)",
                transition: "all 0.2s",
                ...FONT,
              }}
            >
              Proceed
            </button>

            {/* ── Footer ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#252D38", textAlign: "center" }}>
                Having trouble in sign in?{" "}
                <span style={{ color: "#0066DC", fontWeight: 700 }}>Get help here</span>
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", width: 223 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#252D38", textAlign: "center" }}>
                  By Signing in you agree to our
                </p>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#0066DC" }}>Terms &amp; Condition</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#252D38" }}>&amp;</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#0066DC" }}>Privacy Policy</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Android system nav ── */}
        <div style={{
          flex: 1, minHeight: 45,
          background: "white", borderTop: "1px solid #F1F3F5",
          display: "flex", alignItems: "center", justifyContent: "space-around",
          padding: "0 32px",
        }}>
          {(["|||", "○", "‹"] as const).map((s) => (
            <span key={s} style={{ fontSize: 14, color: "#252D38", fontWeight: 300 }}>{s}</span>
          ))}
        </div>

      </div>
    </div>
  );
}
