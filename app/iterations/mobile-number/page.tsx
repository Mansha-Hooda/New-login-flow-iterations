"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MobileNumberPage() {
  const [mobile, setMobile] = useState("");
  const router = useRouter();
  const isValid = /^\d{10}$/.test(mobile);

  return (
    <div className="min-h-screen bg-[#F5F7FF] flex items-start justify-center">
      {/* Phone-sized container */}
      <div
        className="relative w-full bg-white flex flex-col overflow-hidden"
        style={{ maxWidth: 390, minHeight: "100svh" }}
      >
        {/* ── Hero carousel image ── */}
        <div className="relative w-full shrink-0" style={{ height: 346 }}>
          <Image
            src="/images/carousel-01.png"
            alt="Consult with Top Doctors Online or In-Clinic"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* ── Form section ── */}
        <div className="flex-1 bg-white px-5 pt-4 pb-8 flex flex-col">
          <div className="flex flex-col gap-4">

            {/* Mobile number input */}
            <div
              className="flex items-center gap-2 bg-white border border-[#A4B0C0] rounded-xl px-3 h-12"
              style={{ boxShadow: "0px 1px 1px rgba(23,27,34,0.05)" }}
            >
              <span
                className="shrink-0 text-[12px] font-bold text-[#252D38]"
                style={{ fontFamily: "var(--font-lexend-deca)" }}
              >
                +91
              </span>
              <div className="w-px h-4 bg-[#E2E8F0] shrink-0" />
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="flex-1 text-sm font-medium text-[#252D38] placeholder:text-[#70829B] outline-none bg-transparent"
                style={{ fontFamily: "var(--font-lexend-deca)" }}
              />
            </div>

            {/* Proceed button */}
            <button
              disabled={!isValid}
              onClick={() => router.push(`/iterations/mobile-number/otp?number=${mobile}`)}
              className="w-full h-12 rounded-lg text-base font-bold transition-all duration-200 border"
              style={{
                fontFamily: "var(--font-lexend-deca)",
                backgroundColor: isValid ? "#0051B6" : "#DBE0E6",
                borderColor: isValid ? "#0051B6" : "#BFC8D2",
                color: isValid ? "#FFFFFF" : "#8A99AD",
                boxShadow: "0px 1px 2px rgba(23,27,34,0.05)",
                cursor: isValid ? "pointer" : "not-allowed",
              }}
            >
              Proceed
            </button>

            {/* Help & legal */}
            <div className="flex flex-col items-center gap-4 pt-2">
              <p
                className="text-xs text-[#252D38]"
                style={{ fontFamily: "var(--font-lexend-deca)" }}
              >
                Having trouble in sign in?{" "}
                <span className="font-bold text-[#0066DC] cursor-pointer">
                  Get help here
                </span>
              </p>

              <div
                className="flex flex-col items-center gap-0.5"
                style={{ fontFamily: "var(--font-lexend-deca)" }}
              >
                <p className="text-xs font-semibold text-[#252D38]">
                  By Signing in you agree to our
                </p>
                <div className="flex items-center gap-1">
                  <a href="#" className="text-[10px] font-semibold text-[#0066DC] hover:underline">
                    Terms &amp; Condition
                  </a>
                  <span className="text-xs text-[#252D38]">&amp;</span>
                  <a href="#" className="text-[10px] font-semibold text-[#0066DC] hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
