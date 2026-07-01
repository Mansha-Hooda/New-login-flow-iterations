"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FONT = { fontFamily: "var(--font-lexend-deca)" };


const BackArrow = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
    <path d="M17 6H1M6 1L1 6l5 5" stroke="#252D38" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
    <rect x="1" y="1" width="16" height="12" rx="2" stroke="#A4B0C0" strokeWidth="1.4" />
    <path d="M1 4l8 5 8-5" stroke="#A4B0C0" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function WorkEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  const handleContinue = () => {
    if (!isValid) return;
    // Pass email through as query param to next step
    router.push(`/iterations/work-personal/otp?email=${encodeURIComponent(email)}`);
  };

  return (
    <div style={{ background: "#F5F7F8", minHeight: "100svh", display: "flex", justifyContent: "center" }}>
      <div style={{
        width: "100%", maxWidth: 390,
        display: "flex", flexDirection: "column", minHeight: "100svh",
        background: "white", overflow: "hidden", position: "relative", ...FONT,
      }}>

        {/* ── Hero image ── */}
        <div style={{ width: "100%", height: 346, position: "relative", flexShrink: 0 }}>
          <Image
            src="/images/carousel-01.png"
            alt="Consult with Top Doctors Online or In-Clinic"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            priority
          />
          {/* Back button overlaid on hero */}
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            style={{
              position: "absolute", top: 16, left: 16,
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            }}
          >
            <BackArrow />
          </button>
        </div>

        {/* ── Form section ── */}
        <div style={{ flex: 1, padding: "24px 19px", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#252D38", lineHeight: "24px" }}>
              Work Login
            </p>
            <p style={{ fontSize: 12, fontWeight: 400, color: "#47566A", lineHeight: "20px" }}>
              Enter your corporate email address to continue
            </p>
          </div>

          {/* Email input */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "#47566A", lineHeight: "16px" }}>
              Corporate Email
            </label>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              border: `1px solid ${email && !isValid ? "#E53E3E" : isValid ? "#0066DC" : "#DBE0E6"}`,
              borderRadius: 8, padding: "0 14px", height: 48,
              background: "white",
              boxShadow: "0px 1px 1px rgba(23,27,34,0.05)",
              transition: "border-color 0.15s",
            }}>
              <EmailIcon />
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onFocus={() => { if (!email) setEmail("user@medibuddy.in"); }}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                autoComplete="email"
                style={{
                  flex: 1, border: "none", outline: "none", background: "transparent",
                  fontSize: 14, fontWeight: 400, color: "#252D38",
                  ...FONT, caretColor: "#0066DC",
                }}
              />
            </div>
            {email && !isValid && (
              <p style={{ fontSize: 11, fontWeight: 500, color: "#E53E3E", lineHeight: "16px" }}>
                Corporate account doesn&apos;t exist
              </p>
            )}
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={!isValid}
            style={{
              width: "100%", height: 48, borderRadius: 10,
              background: isValid ? "#0066DC" : "#DBE0E6",
              border: `1px solid ${isValid ? "#0066DC" : "#BFC8D2"}`,
              color: isValid ? "#FFFFFF" : "#8A99AD",
              fontSize: 14, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              cursor: isValid ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              boxShadow: "0px 1px 2px rgba(23,27,34,0.05)",
              ...FONT,
            }}
          >
            Continue
            <ArrowRight />
          </button>

          {/* Footer links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", marginTop: "auto" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#252D38", textAlign: "center" }}>
              Having trouble in sign in?{" "}
              <span style={{ color: "#0066DC", fontWeight: 700 }}>Get help here</span>
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
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

        {/* ── Android system nav ── */}
        <div style={{
          height: 45, background: "white", borderTop: "1px solid #F1F3F5",
          display: "flex", alignItems: "center", justifyContent: "space-around",
          padding: "0 32px", flexShrink: 0,
        }}>
          {(["|||", "○", "‹"] as const).map((s) => (
            <span key={s} style={{ fontSize: 14, color: "#252D38", fontWeight: 300 }}>{s}</span>
          ))}
        </div>

      </div>
    </div>
  );
}
