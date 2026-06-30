import Link from "next/link";
import Image from "next/image";

interface IterationStubProps {
  number: string;
  title: string;
  description: string;
  tag: string;
  accent: string;
  accentLight: string;
  tagColor: string;
  icon: React.ReactNode;
}

export default function IterationStub({
  number,
  title,
  description,
  tag,
  accent,
  accentLight,
  tagColor,
  icon,
}: IterationStubProps) {
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#F5F7FF" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 shadow-md"
        style={{ background: "#0051B6" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
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
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All iterations
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-sm text-[#94A3B8]">
          <Link href="/" className="font-medium transition-colors hover:text-[#0051B6]">
            Iterations
          </Link>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" />
          </svg>
          <span className="font-medium text-[#475569]">{title}</span>
        </div>

        {/* Card */}
        <div className="w-full max-w-md rounded-3xl border border-[#E2E8F0] bg-white p-10 text-center shadow-[0_4px_24px_rgba(37,83,232,0.10)]">
          {/* Iteration number badge */}
          <span
            className="mb-6 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: accentLight, color: tagColor }}
          >
            Iteration {number}
          </span>

          {/* Icon */}
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{ backgroundColor: accentLight }}
          >
            {icon}
          </div>

          <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
            {title}
          </h1>
          <p className="mb-6 text-[15px] leading-relaxed text-[#475569]">{description}</p>

          {/* Tag */}
          <span
            className="mb-8 inline-block rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ backgroundColor: accentLight, color: tagColor }}
          >
            {tag}
          </span>

          {/* Coming soon state */}
          <div
            className="rounded-xl border py-6"
            style={{ borderColor: accent + "33", backgroundColor: accentLight }}
          >
            <div className="mb-2 text-3xl">🚧</div>
            <p className="text-sm font-semibold" style={{ color: accent }}>
              Prototype coming soon
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">This iteration is currently being designed.</p>
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to all iterations
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#94A3B8]">
            <strong className="font-semibold text-[#475569]">MediBuddy Design</strong> — Login Flow
            Explorations · 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
