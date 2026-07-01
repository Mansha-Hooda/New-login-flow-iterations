"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FONT = { fontFamily: "var(--font-lexend-deca)" };

/* Mail icon: 16×16 container — viewBox 14.33×11.67 */
function MailIcon() {
  return (
    <div style={{ width: 16, height: 16, position: "relative", flexShrink: 0, overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/iter3-icon-mail.svg" alt=""
        style={{ position: "absolute", top: 2.17, left: 0.83, width: 14.33, height: 11.67 }} />
    </div>
  );
}

/* Phone icon (inline SVG — matches iter1 visual language) */
function PhoneIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="1" y="1" width="12" height="14" rx="2" stroke="#A4B0C0" strokeWidth="1.3" />
      <circle cx="7" cy="12.5" r="0.8" fill="#A4B0C0" />
    </svg>
  );
}

type Mode = "work" | "personal";

export default function CorporatePriorityPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("work");
  const [email, setEmail]   = useState("");
  const [phone, setPhone]   = useState("");

  const isWorkValid     = email.includes("@");
  const isPersonalValid = /^\d{10}$/.test(phone);
  const isValid = mode === "work" ? isWorkValid : isPersonalValid;

  const switchMode = (next: Mode) => {
    setEmail(""); setPhone("");
    setMode(next);
  };

  const handleProceed = () => {
    if (!isValid) return;
    if (mode === "work") {
      router.push(`/iterations/work-personal/otp?email=${encodeURIComponent(email)}`);
    } else {
      router.push(`/iterations/mobile-number/otp?number=${phone}`);
    }
  };

  return (
    <div style={{ background: "#F5F7F8", minHeight: "100svh", display: "flex", justifyContent: "center" }}>
      <div style={{
        width: "100%", maxWidth: 390,
        display: "flex", flexDirection: "column", minHeight: "100svh",
        background: "white", overflow: "hidden", ...FONT,
      }}>

        {/* ── Hero ── */}
        <div style={{ width: "100%", height: 346, position: "relative", flexShrink: 0 }}>
          <Image src="/images/carousel-01.png" alt="Consult with Top Doctors Online or In-Clinic"
            fill style={{ objectFit: "cover", objectPosition: "top" }} priority />
        </div>

        {/* ── Content panel ── */}
        <div style={{
          height: 356, background: "white", overflow: "hidden",
          flexShrink: 0, display: "flex", justifyContent: "center",
        }}>
          <div style={{ width: 324, paddingTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* ── Form (heading + input + button) ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>

              {/* Heading — toggles with mode */}
              <p style={{ fontSize: 16, fontWeight: 700, color: "#252D38", lineHeight: "24px" }}>
                {mode === "work" ? "Work Login" : "Personal Login"}
              </p>

              {/* Input — email (work) or phone (personal) */}
              <div style={{
                width: "100%", height: 48,
                display: "flex", alignItems: "center", gap: 8, padding: "0 12px",
                border: `1px solid ${
                  mode === "work"
                    ? (email && !isWorkValid ? "#E53E3E" : isWorkValid ? "#0066DC" : "#A4B0C0")
                    : (phone && !isPersonalValid ? "#E53E3E" : isPersonalValid ? "#0066DC" : "#A4B0C0")
                }`,
                borderRadius: 10, background: "white",
                boxShadow: "0px 1px 1px rgba(23,27,34,0.05)",
                transition: "border-color 0.15s",
              }}>
                {mode === "work" ? <MailIcon /> : <PhoneIcon />}
                {mode === "work" ? (
                  <input
                    key="email"
                    type="email"
                    placeholder="Enter Corporate Email"
                    value={email}
                    onFocus={() => { if (!email) setEmail("user@medibuddy.in"); }}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleProceed()}
                    autoComplete="email"
                    style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, fontWeight: 500, color: "#252D38", caretColor: "#0066DC", ...FONT }}
                  />
                ) : (
                  <input
                    key="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    value={phone}
                    onFocus={() => { if (!phone) setPhone("9999999999"); }}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && handleProceed()}
                    autoComplete="tel"
                    style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, fontWeight: 500, color: "#252D38", caretColor: "#0066DC", ...FONT }}
                  />
                )}
              </div>

              {/* Inline error */}
              {mode === "work" && email && !isWorkValid && (
                <p style={{ fontSize: 11, fontWeight: 500, color: "#E53E3E", alignSelf: "flex-start", marginTop: -8 }}>
                  Corporate account doesn&apos;t exist
                </p>
              )}
              {mode === "personal" && phone && !isPersonalValid && (
                <p style={{ fontSize: 11, fontWeight: 500, color: "#E53E3E", alignSelf: "flex-start", marginTop: -8 }}>
                  Please enter a valid 10-digit number
                </p>
              )}

              {/* Proceed button */}
              <button onClick={handleProceed} disabled={!isValid} style={{
                width: "100%", padding: "12px 18px",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8,
                background: isValid ? "#0066DC" : "#DBE0E6",
                border: `1px solid ${isValid ? "#0066DC" : "#BFC8D2"}`,
                color: isValid ? "white" : "#8A99AD",
                fontSize: 16, fontWeight: 700, lineHeight: "24px",
                cursor: isValid ? "pointer" : "not-allowed",
                boxShadow: "0px 1px 2px rgba(23,27,34,0.05)",
                transition: "all 0.2s", ...FONT,
              }}>
                Proceed
              </button>
            </div>

            {/* ── OR + alternate mode link ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#4D5C6F", textAlign: "center" }}>
                -- OR --
              </p>
              <button
                onClick={() => switchMode(mode === "work" ? "personal" : "work")}
                style={{
                  fontSize: 16, fontWeight: 700, color: "#0066DC", lineHeight: "24px",
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "center", ...FONT,
                }}
              >
                {mode === "work" ? "Personal Login" : "Work Login"}
              </button>
            </div>

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

        {/* ── Android nav ── */}
        <div style={{
          flex: 1, minHeight: 45, background: "white", borderTop: "1px solid #F1F3F5",
          display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 32px",
        }}>
          {(["|||", "○", "‹"] as const).map((s) => (
            <span key={s} style={{ fontSize: 14, color: "#252D38", fontWeight: 300 }}>{s}</span>
          ))}
        </div>

      </div>
    </div>
  );
}
