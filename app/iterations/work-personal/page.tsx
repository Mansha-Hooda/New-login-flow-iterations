"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const FONT = { fontFamily: "var(--font-lexend-deca)" };

/* ── Icon containers — sizes from Figma inset+bleed math on 32×32 ── */
function OfficeIcon() {
  return (
    /* inset-[16.67%] → top=4.33 left=4.33; bleed -4.69% → renders 23.33×23.33 */
    <div style={{ width: 32, height: 32, position: "relative", flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/iter2-icon-office.svg"
        alt=""
        style={{ position: "absolute", top: 4.33, left: 4.33, width: 23.33, height: 23.33 }}
      />
    </div>
  );
}

function UserIcon() {
  return (
    /* inset-[19.71%_23.08%] → top=5.31 left=6.39; bleed -5.16%/-5.8% → 19.23×21.38 */
    <div style={{ width: 32, height: 32, position: "relative", flexShrink: 0, overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/iter2-icon-user.svg"
        alt=""
        style={{ position: "absolute", top: 5.31, left: 6.39, width: 19.23, height: 21.38 }}
      />
    </div>
  );
}

/* ── Account type card ── */
function AccountCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: "1 0 0", minWidth: 0,
        display: "flex", flexDirection: "column", gap: 6,
        alignItems: "flex-start",
        padding: "12px 16px",
        background: "white",
        border: "1px solid #A4B0C0",
        borderRadius: 8,
        boxShadow: "0px 1px 2px 0px rgba(23,27,34,0.05)",
        cursor: "pointer",
        textAlign: "left",
        overflow: "hidden",
        ...FONT,
      }}
    >
      {icon}
      <span style={{ fontSize: 14, fontWeight: 500, color: "#47566A", lineHeight: "20px", whiteSpace: "nowrap" }}>
        {title}
      </span>
      <span style={{ fontSize: 12, fontWeight: 400, color: "#47566A", lineHeight: "20px", height: 40 }}>
        {description}
      </span>
    </button>
  );
}

/* ── Screen ── */
export default function WorkPersonalPage() {
  const router = useRouter();
  const goToEmail = () => router.push("/iterations/work-personal/email");
  const goToPhone = () => router.push("/iterations/mobile-number");

  return (
    <div style={{ background: "#F5F7F8", minHeight: "100svh", display: "flex", justifyContent: "center" }}>
      <div style={{
        width: "100%", maxWidth: 390,
        display: "flex", flexDirection: "column", minHeight: "100svh",
        background: "white", overflow: "hidden", ...FONT,
      }}>

        {/* ── Hero image — full-width, no horizontal padding ── */}
        <div style={{ width: "100%", height: 346, position: "relative", flexShrink: 0 }}>
          <Image
            src="/images/carousel-01.png"
            alt="Consult with Top Doctors Online or In-Clinic"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            priority
          />
        </div>

        {/* ── Content — 19px horizontal padding, gap-10 from hero ── */}
        <div style={{ flex: 1, padding: "10px 19px 24px", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Heading */}
          <p style={{ fontSize: 16, fontWeight: 700, color: "#252D38", textAlign: "center", lineHeight: "24px" }}>
            Select Account Type
          </p>

          {/* Option cards */}
          <div style={{ display: "flex", gap: 16 }}>
            <AccountCard
              icon={<OfficeIcon />}
              title="Work Login"
              description="Login to your corporate account"
              onClick={goToEmail}
            />
            <AccountCard
              icon={<UserIcon />}
              title="Personal Login"
              description="Login or create personal account"
              onClick={goToPhone}
            />
          </div>

          {/* Footer links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#252D38", textAlign: "center", lineHeight: "normal" }}>
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
