"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FONT = { fontFamily: "var(--font-lexend-deca)" };

/* ── Icons ── */
const BackArrow = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
    <path d="M17 6H1M6 1L1 6l5 5" stroke="#252D38" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L4.667 14H2v-2.667L11.333 2Z" stroke="#0066DC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5" stroke="#E53E3E" strokeWidth="1.2" />
    <line x1="6" y1="4" x2="6" y2="6.5" stroke="#E53E3E" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="6" cy="8.5" r="0.6" fill="#E53E3E" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── OTP Screen ── */
function OTPScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const number = searchParams.get("number") ?? "";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(50);
  const [canResend, setCanResend] = useState(false);

  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const isComplete = otp.every((d) => d !== "");

  /* auto-focus first box on mount */
  useEffect(() => {
    refs[0].current?.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* countdown */
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
    if (digit && i < 3) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[i]) {
        const next = [...otp];
        next[i] = "";
        setOtp(next);
      } else if (i > 0) {
        refs[i - 1].current?.focus();
      }
    }
  };

  const handleVerify = () => {
    setError(false);
    router.push(`/home?number=${number}`);
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(50);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    setError(false);
    refs[0].current?.focus();
  };

  const maskedNumber = number
    ? `${number.slice(0, 2)}XXXXXX${number.slice(-2)}`
    : "XXXXXXXXXX";

  return (
    <div className="min-h-screen bg-[#F5F7FF] flex items-start justify-center">
      <div
        className="relative w-full bg-white flex flex-col"
        style={{ maxWidth: 390, minHeight: "100svh", ...FONT }}
      >
        {/* ── Status bar placeholder ── */}
        <div className="h-14 bg-white shrink-0" />

        {/* ── Back button ── */}
        <button
          onClick={() => router.back()}
          className="absolute top-[61px] left-4 flex items-center justify-center w-6 h-6"
          aria-label="Go back"
        >
          <BackArrow />
        </button>

        {/* ── Content ── */}
        <div className="px-[18px] pt-[97px] flex flex-col gap-8">

          {/* Labels */}
          <div className="flex flex-col gap-1">
            {/* Enter row */}
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-[#47566A]">Enter:</span>
              <span className="text-[#252D38]">4 digit OTP</span>
            </div>

            {/* Sent on row */}
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-[#47566A]">Sent on:</span>
              <span className="text-[#252D38]">{maskedNumber}</span>
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-4 h-4 shrink-0"
                aria-label="Edit number"
              >
                <EditIcon />
              </button>
            </div>
          </div>

          {/* OTP boxes */}
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2">
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
                  className="w-10 h-12 text-center text-sm font-semibold rounded-xl border outline-none transition-colors duration-150"
                  style={{
                    ...FONT,
                    borderColor: error ? "#E53E3E" : digit ? "#0051B6" : "#DBE0E6",
                    color: digit ? "#252D38" : "#70829B",
                    boxShadow: "0px 1px 1px rgba(23,27,34,0.05)",
                    caretColor: "#0051B6",
                  }}
                />
              ))}
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-1 mt-0.5">
                <AlertIcon />
                <p className="text-[10px] font-semibold text-[#E53E3E]">
                  Please enter correct OTP
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom bar: Resend + Verify ── */}
        <div className="absolute bottom-[45px] left-0 right-0 bg-white border-t border-[#F1F3F5]">
          <div className="flex items-center gap-10 px-2 py-0.5">
            {/* Resend */}
            <div className="bg-white px-2.5 py-[5px]">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-sm font-semibold text-[#0051B6]"
                  style={FONT}
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-sm font-semibold text-[#252D38] whitespace-pre" style={FONT}>
                  {`Resend OTP in  ${timer} sec`}
                </p>
              )}
            </div>

            {/* Verify button */}
            <button
              disabled={!isComplete}
              onClick={handleVerify}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg border text-sm font-bold transition-all duration-200 w-[130px]"
              style={{
                ...FONT,
                backgroundColor: isComplete ? "#0051B6" : "#DBE0E6",
                borderColor: isComplete ? "#0051B6" : "#BFC8D2",
                color: isComplete ? "#FFFFFF" : "#8A99AD",
                boxShadow: "0px 1px 2px rgba(23,27,34,0.05)",
                cursor: isComplete ? "pointer" : "not-allowed",
              }}
            >
              Verify
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        {/* ── Phone nav bar placeholder ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[45px] bg-white border-t border-[#F1F3F5] flex items-center justify-around px-8">
          {["|||", "○", "‹"].map((s) => (
            <span key={s} className="text-[#252D38] text-sm font-light">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Suspense wrapper required by useSearchParams in App Router */
export default function OTPPage() {
  return (
    <Suspense>
      <OTPScreen />
    </Suspense>
  );
}
