"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Persistent back-button fixed to the top-right of the browser window.
 *  Hidden on the root iterations index page itself. */
export default function BackToIterations() {
  const path = usePathname();
  if (path === "/") return null;

  return (
    <Link
      href="/"
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 14px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
        border: "1px solid #DBE0E6",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        color: "#252D38",
        fontSize: 12,
        fontWeight: 600,
        textDecoration: "none",
        fontFamily: "var(--font-lexend-deca)",
        whiteSpace: "nowrap",
      }}
    >
      <svg width="12" height="12" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M11 7H3M6 4 3 7l3 3" />
      </svg>
      Iterations
    </Link>
  );
}
