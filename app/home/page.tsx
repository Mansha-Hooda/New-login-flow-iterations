"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

/* ─── Types ─── */
type Badge = { label: string; bg: string; color: string };

type Service = {
  name: string;
  img?: string;
  imgB?: string;    // overlay icon (e.g. video-call notification dot)
  /** Exact pixel dimensions from the Figma design */
  iconW: number;
  iconH: number;
  imgBW?: number;   // overlay width
  imgBH?: number;   // overlay height
  badge?: Badge;
  special?: "nexgen";
};

/* ─── Badge definitions ─── */
const SPONSORED: Badge = { label: "Sponsored", bg: "#F1EDFE", color: "#5E40AD" };
const CASHLESS: Badge  = { label: "Cashless",  bg: "#F1F8F5", color: "#0F7A48" };
const NEW_BADGE: Badge = { label: "New",       bg: "#FDE9F7", color: "#922B73" };

/*
 * Icon sizes are taken verbatim from the Figma design context:
 *   w-[Xpx] h-[Ypx] on the icon image node inside each 66×66 service card.
 */
const PRIMARY: Service[] = [
  { name: "Video Call\nDoctor",      img: "/images/nh2-svc-video-doc.svg",  iconW: 20.8, iconH: 29.9,
    imgB: "/images/nh2-svc-video-badge.svg", imgBW: 9.3, imgBH: 9.3, badge: SPONSORED },
  { name: "In-Clinic\nConsultation", img: "/images/nh2-svc-inclinic.svg",   iconW: 24,   iconH: 27.1 },
  { name: "Buy\nMedicine",           img: "/images/nh2-svc-medicine.svg",   iconW: 24,   iconH: 26.4, badge: CASHLESS },
  { name: "Book Lab\nTest",          img: "/images/nh2-svc-labtest.svg",    iconW: 24,   iconH: 31.2 },
];

const MORE: Service[] = [
  { name: "Annual\nHealth Check", img: "/images/nh2-svc-healthcheck.svg", iconW: 26.8, iconH: 26.9, badge: SPONSORED },
  { name: "Insurance",            img: "/images/nh2-svc-insurance.svg",   iconW: 24.2, iconH: 29.1 },
  { name: "Vision Care",          img: "/images/nh2-svc-vision.svg",      iconW: 49.1, iconH: 18.8, badge: CASHLESS },
  { name: "Dental Care",          img: "/images/nh2-svc-dental.svg",      iconW: 28.3, iconH: 29.0 },
  { name: "Surgery",              img: "/images/nh2-svc-surgery.svg",     iconW: 26.1, iconH: 29.9 },
  { name: "Fitness /\nWeight Loss", img: "/images/nh2-svc-fitness.svg",  iconW: 26.4, iconH: 24.5, badge: CASHLESS },
  { name: "GLP-1\nInjections",
    img: "/images/nh2-svc-glp1-a.svg", iconW: 28.4, iconH: 11.5,
    imgB: "/images/nh2-svc-glp1-b.svg", imgBW: 22.6, imgBH: 23.0,
    badge: NEW_BADGE },
  { name: "Genetic & AI\nScreenings", iconW: 0, iconH: 0, special: "nexgen" },
];

/* ─── Service card ─── */
function ServiceCard({ svc }: { svc: Service }) {
  /* NexGen gets a special branded badge instead of an illustration */
  if (svc.special === "nexgen") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: 66 }}>
        <div style={{
          width: 66, height: 66, borderRadius: 8, background: "white",
          border: "1px solid #DBE0E6", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* 50×20 badge: green-bordered pill with NexGen logo — from Figma node 84:12230 */}
          <div style={{
            width: 50, height: 20, position: "relative", overflow: "hidden",
            border: "0.625px solid #0C6139",
            borderRadius: "12.5px 2.5px 12.5px 2.5px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nh2-nexgen-bg.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nh2-nexgen-text.svg" alt="NexGen" style={{ position: "relative", width: 39.1, height: 7.5 }} />
          </div>
        </div>
        <p style={{ fontSize: 10, fontWeight: 500, color: "#252D38", textAlign: "center", lineHeight: "16px", whiteSpace: "pre-line" }}>
          {"Genetic & AI\nScreenings"}
        </p>
      </div>
    );
  }

  /* GLP-1 has two overlapping illustrations (syringe + base) at different rotations */
  const isGlp1 = svc.name.startsWith("GLP");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: 66 }}>
      <div style={{
        width: 66, height: 66, borderRadius: 8, background: "white",
        border: "1px solid #DBE0E6", position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>

        {isGlp1 ? (
          /* GLP-1: syringe (b) layered over base (a), using Figma offsets */
          <div style={{ position: "relative", width: 45, height: 36 }}>
            {/* Base element — 28.4×11.5px, rotated 180° & flipped Y */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svc.img}
              alt=""
              style={{
                position: "absolute", bottom: 0, left: 0,
                width: svc.iconW, height: svc.iconH,
                transform: "scaleY(-1) rotate(180deg)",
              }}
            />
            {/* Syringe element — 22.6×23px, rotated 157.56° & flipped Y */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svc.imgB!}
              alt=""
              style={{
                position: "absolute", top: 0, right: 0,
                width: svc.imgBW, height: svc.imgBH,
                transform: "scaleY(-1) rotate(157.56deg)",
              }}
            />
          </div>
        ) : (
          /* Standard icon — rendered at exact Figma pixel dimensions */
          <div style={{ position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svc.img}
              alt=""
              style={{ display: "block", width: svc.iconW, height: svc.iconH }}
            />
            {/* Video Call overlay dot: 9.3×9.3px at ml-18.67 mt-1.87 from icon origin */}
            {svc.imgB && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={svc.imgB}
                alt=""
                style={{
                  position: "absolute",
                  top: 1.87, left: 18.67,
                  width: svc.imgBW, height: svc.imgBH,
                }}
              />
            )}
          </div>
        )}

        {/* Badge strip pinned to card bottom */}
        {svc.badge && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 13, borderRadius: "0 0 7px 7px",
            background: svc.badge.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 8, fontWeight: 400, color: svc.badge.color, whiteSpace: "nowrap" }}>
              {svc.badge.label}
            </span>
          </div>
        )}
      </div>

      <p style={{ fontSize: 10, fontWeight: 500, color: "#252D38", textAlign: "center", lineHeight: "16px", whiteSpace: "pre-line" }}>
        {svc.name}
      </p>
    </div>
  );
}

/* ─── Main screen ─── */
function HomeScreen() {
  const searchParams = useSearchParams();
  const number = searchParams.get("number") ?? "";
  const [showAll, setShowAll] = useState(false);

  const maskedNumber = number
    ? `+91 ${number.slice(0, 2)}XXXXXX${number.slice(-2)}`
    : "+91 ••••••••••";

  const displayedMore = showAll ? MORE : MORE.slice(0, 4);

  return (
    <div style={{ background: "#F5F7F8", fontFamily: "var(--font-lexend-deca)", minHeight: "100svh", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 390, display: "flex", flexDirection: "column", minHeight: "100svh", background: "white" }}>

        {/* ── Status bar ── (Figma: 360×32px Android component, node 84:12919)
             Time at left:16 top:9  |  Icons at right:16 top:10, exactly 61×10.28px */}
        <div style={{ height: 32, background: "white", position: "relative", flexShrink: 0 }}>
          <span style={{
            position: "absolute", left: 16, top: 9,
            fontSize: 11, fontWeight: 700, color: "#252D38",
            lineHeight: "normal", fontVariationSettings: '"wdth" 100',
          }}>
            11:27 PM
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/nh2-wallet.svg"
            alt=""
            style={{
              position: "absolute", right: 16, top: 10,
              width: 61, height: 10.28,   /* exact Figma dimensions — prevents stretching on preserveAspectRatio="none" SVG */
            }}
          />
        </div>

        {/* ── Top nav bar ── */}
        <div style={{
          height: 56, background: "white",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 5px rgba(0,0,0,0.05)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 12px", flexShrink: 0,
        }}>
          {/* Left: hamburger + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nh2-icon-menu.svg" alt="menu" style={{ width: 24, height: 24 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#252D38", whiteSpace: "nowrap" }}>
                  Medibuddy Corp. Benefits
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* viewBox 9.9×5.4 — set both dims so preserveAspectRatio="none" doesn't distort */}
                <img src="/images/nh2-icon-dropdown.svg" alt="" style={{ width: 9.9, height: 5.4, flexShrink: 0 }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 400, color: "#252D38" }}>Corporate Sponsored Account</span>
            </div>
          </div>

          {/* Right: wallet icon (6-layer SVG composition) + notification badge */}
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {/*
             * Figma: size-[24px] overflow-clip mr-[-12px]
             * Each layer: pixel coords = inset-% × 24
             *   body:   t2.28 l1.14 w21.19 h18.50
             *   strap:  t5.44 l1.66 w20.21 h1.45
             *   coin1:  t8.97 l4.88 w4.58  h8.32
             *   coin2:  t8.98 l4.88 w5.86  h0.93
             *   coin3:  t10.95 l4.88 w5.86 h0.94
             *   oval:   t9.49 l15.89 w8.00 h4.57
             */}
            <div style={{ width: 24, height: 24, position: "relative", overflow: "hidden", flexShrink: 0, marginRight: -12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/nh2-wallet-body.svg"  alt="" style={{ position: "absolute", top: 2.28,  left: 1.14,  width: 21.19, height: 18.50 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/nh2-wallet-strap.svg" alt="" style={{ position: "absolute", top: 5.44,  left: 1.66,  width: 20.21, height: 1.45  }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/nh2-wallet-coin1.svg" alt="" style={{ position: "absolute", top: 8.97,  left: 4.88,  width: 4.58,  height: 8.32  }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/nh2-wallet-coin2.svg" alt="" style={{ position: "absolute", top: 8.98,  left: 4.88,  width: 5.86,  height: 0.93  }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/nh2-wallet-coin3.svg" alt="" style={{ position: "absolute", top: 10.95, left: 4.88,  width: 5.86,  height: 0.94  }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/nh2-wallet-oval.svg"  alt="" style={{ position: "absolute", top: 9.49,  left: 15.89, width: 8.00,  height: 4.57  }} />
            </div>

            {/* Badge: blue pill, top-aligned so it sits at wallet's top-right */}
            <div style={{ height: 16, display: "flex", alignItems: "center" }}>
              <div style={{
                background: "#0066DC", border: "1px solid white",
                borderRadius: 8, padding: "1px 5px",
                fontSize: 10, fontWeight: 700, color: "white",
                lineHeight: "14px", whiteSpace: "nowrap",
              }}>
                4529
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* ── Blue gradient section ── */}
          <div style={{
            background: "linear-gradient(90deg, #E2F0FF 0%, #F1F7FF 100%)",
            padding: 16,
            display: "flex", flexDirection: "column", gap: 20,
          }}>

            {/* "Get Free Online Consultations" + Join Gold */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#252D38", lineHeight: "20px", maxWidth: 160 }}>
                Get Free Online Consultations*
              </p>
              <button style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "linear-gradient(45deg, #B57207 0%, #CD8B08 100%)",
                border: "1px solid #F6BF12",
                borderRadius: 9, padding: "6px 8px",
                cursor: "pointer",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/nh2-joingold-diamond.svg" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "white", whiteSpace: "nowrap" }}>Join Gold</span>
              </button>
            </div>

            {/* Search bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "white", border: "1px solid #EBEEF1",
              borderRadius: 12, padding: "12px 16px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 5px rgba(0,0,0,0.05)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/nh2-icon-search.svg" alt="" style={{ width: 20, height: 20 }} />
              <span style={{ fontSize: 14, fontWeight: 300, color: "#47566A" }}>Search by &#x2018;Doctor&#x2019;</span>
            </div>

            {/* 4 primary services */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {PRIMARY.map((svc) => (
                <ServiceCard key={svc.name} svc={svc} />
              ))}
            </div>
          </div>

          {/* ── More Services ── */}
          <div style={{ background: "white", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 20 }}>

            <p style={{ fontSize: 16, fontWeight: 500, color: "#000", margin: 0 }}>
              More Services by MediBuddy
            </p>

            {/* First row: always shown */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {MORE.slice(0, 4).map((svc) => (
                <ServiceCard key={svc.name} svc={svc} />
              ))}
            </div>

            {/* Second row: toggle */}
            {showAll && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {MORE.slice(4).map((svc) => (
                  <ServiceCard key={svc.name} svc={svc} />
                ))}
              </div>
            )}

            {/* View All / View Less */}
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                background: "none", border: "none", cursor: "pointer",
                padding: "6px 0",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 500, color: "#0066DC" }}>
                {showAll ? "View Less" : "View All Services"}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/nh2-icon-viewall.svg"
                alt=""
                style={{ width: 13.2, height: 7.2, flexShrink: 0, transform: showAll ? "rotate(180deg)" : "none" }}
              />
            </button>
          </div>

          {/* ── Promotional banners ── */}
          <div style={{
            background: "white", borderTop: "1px solid #EBEEF1",
            padding: "24px 16px",
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            {/* Horizontal scroll of banners */}
            <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>

              {/* Nutritionist banner */}
              <div style={{
                flexShrink: 0, width: 300, height: 170,
                borderRadius: 16, overflow: "hidden", position: "relative",
                background: "#F8FBFA", border: "1px solid #F1F8F5",
                scrollSnapAlign: "start",
              }}>
                <div style={{ position: "absolute", top: 15, left: 15, right: 110, zIndex: 1 }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#252D38", lineHeight: "20px", margin: "0 0 8px" }}>
                    Thematic Consultation at No Cost this March
                  </p>
                  <p style={{ fontSize: 10, color: "#252D38", lineHeight: "16px", margin: "0 0 12px" }}>
                    Get dedicated one-on-one sessions with nutritionists
                  </p>
                  <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#26935F" }}>ENROLL NOW</span>
                    <span style={{ color: "#26935F", fontSize: 12 }}>›</span>
                  </button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/nh2-banner-doctor1.png" alt="" style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-20%)", width: 123, height: 137, objectFit: "cover" }} />
              </div>

              {/* Paediatrician banner */}
              <div style={{
                flexShrink: 0, width: 300, height: 170,
                borderRadius: 16, overflow: "hidden", position: "relative",
                background: "#FAFAFF", border: "1px solid #F5F7F8",
                scrollSnapAlign: "start",
              }}>
                <div style={{ position: "absolute", top: 15, left: 15, right: 110, zIndex: 1 }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#252D38", lineHeight: "20px", margin: "0 0 8px" }}>
                    Thematic Consultation at No Cost this January
                  </p>
                  <p style={{ fontSize: 10, color: "#252D38", lineHeight: "16px", margin: "0 0 12px" }}>
                    Dedicated one-on-one sessions with a Paediatrician
                  </p>
                  <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#7750D9" }}>ENROL NOW</span>
                    <span style={{ color: "#7750D9", fontSize: 12 }}>›</span>
                  </button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/nh2-banner-doctor2.png" alt="" style={{ position: "absolute", right: 0, top: 55, width: 130, height: 113, objectFit: "cover" }} />
              </div>

              {/* Refer banner */}
              <div style={{
                flexShrink: 0, width: 320, height: 170,
                borderRadius: 16, overflow: "hidden", position: "relative",
                background: "linear-gradient(-73deg, #E4DAFD 2.5%, #FAFAFF 50%)",
                border: "1px solid #F5F7F8",
                scrollSnapAlign: "start",
              }}>
                <div style={{ position: "absolute", top: 15, left: 15, right: 120, zIndex: 1 }}>
                  <p style={{ fontSize: 18, fontWeight: 600, color: "#252D38", lineHeight: "24px", margin: "0 0 8px" }}>
                    Refer a Doctor for Quality Care
                  </p>
                  <p style={{ fontSize: 12, color: "#252D38", lineHeight: "20px", margin: "0 0 12px" }}>
                    Help build a trusted doctor network by referring a doctor you trust
                  </p>
                  <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#7750D9" }}>REFER NOW</span>
                    <span style={{ color: "#7750D9", fontSize: 12 }}>›</span>
                  </button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/nh2-banner-refer.png" alt="" style={{ position: "absolute", right: 0, top: -1, width: 158, height: 171, objectFit: "cover" }} />
              </div>

              <div style={{ width: 16, flexShrink: 0 }} />
            </div>

            {/* Pagination dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
              {[true, false, false, false].map((active, i) => (
                <div key={i} style={{ width: active ? 16 : 6, height: 6, borderRadius: 4, background: active ? "#9DABBD" : "#E1E5EA" }} />
              ))}
            </div>
          </div>

          {/* ── Login success toast ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "white" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="7" fill="#0066DC" fillOpacity="0.15" />
              <path d="M4 7l2 2 4-4" stroke="#0066DC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 600, color: "#0066DC" }}>
              Successfully logged in as {maskedNumber}
            </span>
          </div>

        </div>

        {/* ── Bottom navigation ── */}
        <div style={{
          height: 64, background: "white", flexShrink: 0,
          boxShadow: "0 -2px 1px rgba(0,0,0,0.02), 0 -4px 4px rgba(0,0,0,0.04)",
          display: "flex", alignItems: "stretch",
          padding: "0 12px",
        }}>
          {/* iconW/iconH = exact viewBox dims from Figma inset+bleed calculation */}
          {[
            { label: "Home",    img: "/images/nh2-nav-home.svg",     iconW: 16.32, iconH: 17.5,  active: true  },
            { label: "Reorder", img: "/images/nh2-nav-reorder.svg",  iconW: 18.58, iconH: 17.73, active: false },
            { label: "Family",  img: "/images/nh2-nav-family.svg",   iconW: 17.65, iconH: 16.04, active: false },
            { label: "Capsules",img: "/images/nh2-nav-capsules.svg", iconW: 17.2,  iconH: 17.2,  active: false },
          ].map(({ label, img, iconW, iconH, active }) => (
            <button
              key={label}
              style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 4,
                background: "none", border: "none", cursor: "pointer",
                position: "relative", padding: "10px 0",
              }}
            >
              {active && (
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: 48, height: 4, background: "#0066DC",
                  borderRadius: "0 0 40px 40px",
                }} />
              )}
              {/* 24×24 centering wrapper matches Figma's size-[24px] clip container */}
              <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" style={{ width: iconW, height: iconH }} />
              </div>
              <span style={{
                fontSize: 10, lineHeight: "16px",
                fontWeight: active ? 600 : 400,
                color: active ? "#0066DC" : "#70829B",
              }}>
                {label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeScreen />
    </Suspense>
  );
}
