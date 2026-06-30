import IterationStub from "@/app/components/IterationStub";

export const metadata = { title: "Common Email / Mobile Field — MediBuddy Login" };

const icon = (
  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#F97316" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3,5 12,13 21,5" />
  </svg>
);

export default function CommonFieldPage() {
  return (
    <IterationStub
      number="04"
      title="Common Email / Mobile Field"
      description="A single field accepts both mobile number and email. If the user enters a corporate email linked with MediBuddy, they are routed to the corporate login flow — otherwise the personal flow."
      tag="Smart Input"
      accent="#F97316"
      accentLight="#FFF3EB"
      tagColor="#EA6C00"
      icon={icon}
    />
  );
}
