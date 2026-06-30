"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FONT = { fontFamily: "var(--font-lexend-deca)" };
const OTP_LENGTH = 6;

const BackArrow = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
    <path d="M17 6H1M6 1L1 6l5 5" stroke="#252D38" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5" stroke="#E53E3E" strokeWidth="1.2" />
    <line x1="6" y1="4" x2="6" y2="6.5" stroke="#E53E3E" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="6" cy="8.5" r="0.6" fill="#E53E3E" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Mask email: john.doe@company.com → jo****e@company.com */
function maskEmail(raw: string): string {
  const at = raw.indexOf("@");
  if (at < 0) return raw;
  const local = raw.slice(0, at);
  const domain = raw.slice(at);
  if (local.length <= 2) return raw;
  return local[0] + local[1] + "****" + local[local.length - 1] + domain;
}

function OTPScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(50);
  const [canResend, setCanResend] = useState(false);

  const refs = Array.from({ length: OTP_LENGTH }, () => useRef<HTMLInputElement>(null)); // eslint-disable-line react-hooks/rules-of-hooks

  const isComplete = otp.every((d) => d !== "");

  useEffect(() => { refs[0].current?.focus(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const digit = val.slice(-1);
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    setError(false);
    if (digit && i < OTP_LENGTH - 1) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[i]) {
        const next = [...otp]; next[i] = ""; setOtp(next);
      } else if (i > 0) {
        refs[i - 1].current?.focus();
      }
    }
  };

  const handleVerify = () => {
    setError(false);
    router.push("/home");
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(50); setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError(false);
    refs[0].current?.focus();
  };

  return (
    <div style={{ background: "#F5F7F8", minHeight: "100svh", display: "flex", justifyContent: "center" }}>
      <div style={{
        width: "100%", maxWidth: 390,
        display: "flex", flexDirection: "column", minHeight: "100svh",
        background: "white", position: "relative", ...FONT,
      }}>

        {/* ── Status bar placeholder ── */}
        <div style={{ height: 56, background: "white", flexShrink: 0 }} />

        {/* ── Back button ── */}
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          style={{
            position: "absolute", top: 61, left: 16,
            width: 24, height: 24,
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <BackArrow />
        </button>

        {/* ── Content ── */}
        <div style={{ padding: "97px 19px 0", display: "flex", flexDirection: "column", gap: 32 }}>

          {/* Labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}>
              <span style={{ color: "#47566A" }}>Enter:</span>
              <span style={{ color: "#252D38" }}>6 digit OTP</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}>
              <span style={{ color: "#47566A" }}>Sent to:</span>
              <span style={{ color: "#252D38" }}>{maskEmail(email)}</span>
            </div>
          </div>

          {/* OTP boxes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onFocus={(e) => e.target.select()}
                  style={{
                    width: 44, height: 52, textAlign: "center",
                    fontSize: 18, fontWeight: 600,
                    borderRadius: 10,
                    border: `1px solid ${error ? "#E53E3E" : digit ? "#0066DC" : "#DBE0E6"}`,
                    outline: "none",
                    color: digit ? "#252D38" : "#70829B",
                    background: "white",
                    boxShadow: "0px 1px 1px rgba(23,27,34,0.05)",
                    caretColor: "#0066DC",
                    transition: "border-color 0.15s",
                    ...FONT,
                  }}
                />
              ))}
            </div>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <AlertIcon />
                <p style={{ fontSize: 10, fontWeight: 600, color: "#E53E3E" }}>
                  Please enter correct OTP
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom bar: Resend + Verify ── */}
        <div style={{
          position: "absolute", bottom: 45, left: 0, right: 0,
          background: "white", borderTop: "1px solid #F1F3F5",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px" }}>
            {/* Resend */}
            <div style={{ background: "white", padding: "5px 10px" }}>
              {canResend ? (
                <button
                  onClick={handleResend}
                  style={{ fontSize: 14, fontWeight: 600, color: "#0066DC", background: "none", border: "none", cursor: "pointer", ...FONT }}
                >
                  Resend OTP
                </button>
              ) : (
                <p style={{ fontSize: 14, fontWeight: 600, color: "#252D38", whiteSpace: "pre", ...FONT }}>
                  {`Resend OTP in  ${timer} sec`}
                </p>
              )}
            </div>

            {/* Verify */}
            <button
              disabled={!isComplete}
              onClick={handleVerify}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                padding: "8px 12px", borderRadius: 8, width: 130,
                background: isComplete ? "#0066DC" : "#DBE0E6",
                border: `1px solid ${isComplete ? "#0066DC" : "#BFC8D2"}`,
                color: isComplete ? "#FFFFFF" : "#8A99AD",
                fontSize: 14, fontWeight: 700,
                boxShadow: "0px 1px 2px rgba(23,27,34,0.05)",
                cursor: isComplete ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                ...FONT,
              }}
            >
              Verify
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* ── Android system nav ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 45, background: "white", borderTop: "1px solid #F1F3F5",
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

export default function WorkOTPPage() {
  return (
    <Suspense>
      <OTPScreen />
    </Suspense>
  );
}
