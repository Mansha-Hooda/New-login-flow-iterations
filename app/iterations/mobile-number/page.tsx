import IterationStub from "@/app/components/IterationStub";

export const metadata = { title: "Using Mobile Number — MediBuddy Login" };

const icon = (
  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#0051B6" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2.5} />
  </svg>
);

export default function MobileNumberPage() {
  return (
    <IterationStub
      number="01"
      title="Using Mobile Number"
      description="User enters only their mobile number. The system automatically detects whether it's linked to a corporate account or a personal one and routes them accordingly."
      tag="OTP Flow"
      accent="#0051B6"
      accentLight="#EEF2FF"
      tagColor="#0051B6"
      icon={icon}
    />
  );
}
