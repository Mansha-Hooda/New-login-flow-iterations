"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/* ── Icons for each iteration ── */
const MobileIcon = () => (
  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#0051B6" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2.5} />
  </svg>
);

const DualPersonaIcon = () => (
  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#0AADA6" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CorporateIcon = () => (
  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#0051B6" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const SmartFieldIcon = () => (
  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#F97316" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3,5 12,13 21,5" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ── Iteration data ── */
const ITERATIONS = [
  {
    number: "01",
    title: "Using Mobile Number",
    description:
      "User enters only their mobile number. The system automatically detects whether it's linked to a corporate account or a personal one and routes them accordingly.",
    tag: "OTP Flow",
    href: "/iterations/mobile-number",
    accent: "#0051B6",
    iconBg: "#EEF2FF",
    tagBg: "#EEF2FF",
    tagColor: "#0051B6",
    Icon: MobileIcon,
  },
  {
    number: "02",
    title: "Work & Personal Login",
    description:
      "Before anything else, users are presented with a choice — Work Login or Personal Login. The entire login flow then adapts based on the option they select.",
    tag: "Dual Persona",
    href: "/iterations/work-personal",
    accent: "#0AADA6",
    iconBg: "#E0F8F7",
    tagBg: "#E0F8F7",
    tagColor: "#0AADA6",
    Icon: DualPersonaIcon,
  },
  {
    number: "03",
    title: "Prioritised Corporate Login",
    description:
      "Users land directly on the corporate login flow by default. A secondary 'or' option below lets them switch to personal account login if needed.",
    tag: "Enterprise SSO",
    href: "/iterations/corporate-priority",
    accent: "#0051B6",
    iconBg: "#EEF2FF",
    tagBg: "#EEF2FF",
    tagColor: "#0051B6",
    Icon: CorporateIcon,
  },
  {
    number: "04",
    title: "Common Email / Mobile Field",
    description:
      "A single field accepts both mobile number and email. If the user enters a corporate email linked with MediBuddy, they are routed to the corporate login flow — otherwise the personal flow.",
    tag: "Smart Input",
    href: "/iterations/common-field",
    accent: "#F97316",
    iconBg: "#FFF3EB",
    tagBg: "#FFF3EB",
    tagColor: "#EA6C00",
    Icon: SmartFieldIcon,
  },
];

/* ── Iteration card ── */
function IterationCard({
  number, title, description, tag, href,
  accent, iconBg, tagBg, tagColor, Icon,
}: (typeof ITERATIONS)[number]) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        boxShadow: hovered
          ? `0 12px 32px rgba(37,83,232,0.18)`
          : `0 4px 16px rgba(37,83,232,0.09)`,
        borderColor: hovered ? accent : "#E2E8F0",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        // @ts-expect-error CSS custom property
        "--tw-ring-color": accent,
      }}
    >
      {/* Accent bar */}
      <div
        className="absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl transition-transform duration-300 origin-left"
        style={{
          backgroundColor: accent,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />

      {/* Number */}
      <span className="absolute right-5 top-5 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
        {number}
      </span>

      {/* Icon */}
      <div
        className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px]"
        style={{ backgroundColor: iconBg }}
      >
        <Icon />
      </div>

      {/* Text */}
      <h2 className="mb-2 text-[17px] font-bold leading-snug text-[#0F172A]">{title}</h2>
      <p className="mb-6 flex-1 text-[13.5px] leading-relaxed text-[#475569]">{description}</p>

      {/* Footer row */}
      <div className="flex items-center justify-end">
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200"
          style={{
            backgroundColor: hovered ? accent : "#F5F7FF",
            borderColor: hovered ? accent : "#E2E8F0",
            color: hovered ? "#FFFFFF" : "#94A3B8",
          }}
        >
          <ArrowRight />
        </div>
      </div>
    </Link>
  );
}

/* ── Page ── */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        className="sticky top-0 z-50 shadow-md"
        style={{ background: "#0051B6" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white px-3 py-1.5">
              <Image
                src="/medibuddy-logo.svg"
                alt="MediBuddy"
                width={108}
                height={24}
                priority
              />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
              Design Explorations
            </span>
          </div>
          <span className="hidden rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-white sm:block">
            UX Prototype
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pt-16">
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#C7D7FF] bg-[#EEF2FF] px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#0051B6]">
          <span>🔐</span> Login Flow Redesign
        </div>

        <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
          Four Iterations of the{" "}
          <span className="text-[#0051B6]">MediBuddy Login Experience</span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#475569] sm:text-lg">
          Explore different approaches to the sign-in journey — each optimised for a distinct user
          context. Click any card to open the prototype.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: "⏱", label: "4 iterations" },
            { icon: "📱", label: "Mobile-first" },
            { icon: "🎨", label: "MediBuddy DS" },
          ].map(({ icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-sm font-medium text-[#94A3B8]">
              <span>{icon}</span> {label}
            </span>
          ))}
        </div>
      </section>

      {/* Info banner */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
        <div className="flex items-start gap-3 rounded-xl border border-[#C7D7FF] bg-gradient-to-r from-[#EEF2FF] to-[#E0F8F7] px-4 py-3.5 sm:items-center">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF]">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#0051B6" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth={2.5} />
            </svg>
          </div>
          <p className="text-sm leading-relaxed text-[#475569]">
            These are{" "}
            <strong className="font-semibold text-[#0051B6]">interactive prototypes in progress.</strong>{" "}
            Click a card to open an iteration. Each approach targets a distinct segment of MediBuddy&apos;s
            user base.
          </p>
        </div>
      </div>

      {/* Cards */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-baseline justify-between">
          <span className="text-lg font-bold text-[#0F172A]">Login Iterations</span>
          <span className="text-sm font-medium text-[#94A3B8]">4 explorations</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {ITERATIONS.map((item) => (
            <IterationCard key={item.href} {...item} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#94A3B8]">
            <strong className="font-semibold text-[#475569]">MediBuddy Design</strong> — Login Flow
            Explorations · 2026
          </p>
          <nav className="flex gap-5">
            {["Design System", "Figma", "Feedback"].map((label) => (
              <a key={label} href="#" className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#0051B6]">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
