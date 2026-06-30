import IterationStub from "@/app/components/IterationStub";

export const metadata = { title: "Work & Personal Login — MediBuddy Login" };

const icon = (
  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#0AADA6" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default function WorkPersonalPage() {
  return (
    <IterationStub
      number="02"
      title="Work & Personal Login"
      description="Before anything else, users are presented with a choice — Work Login or Personal Login. The entire login flow then adapts based on the option they select."
      tag="Dual Persona"
      accent="#0AADA6"
      accentLight="#E0F8F7"
      tagColor="#0AADA6"
      icon={icon}
    />
  );
}
