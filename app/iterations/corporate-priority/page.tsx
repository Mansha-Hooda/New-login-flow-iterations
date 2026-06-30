import IterationStub from "@/app/components/IterationStub";

export const metadata = { title: "Prioritised Corporate Login — MediBuddy Login" };

const icon = (
  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#0051B6" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

export default function CorporatePriorityPage() {
  return (
    <IterationStub
      number="03"
      title="Prioritised Corporate Login"
      description="Users land directly on the corporate login flow by default. A secondary 'or' option below lets them switch to personal account login if needed."
      tag="Enterprise SSO"
      accent="#0051B6"
      accentLight="#EEF2FF"
      tagColor="#0051B6"
      icon={icon}
    />
  );
}
