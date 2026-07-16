import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Hire Someone" };

export default function HirePage() {
  return <ComingSoon title="Hire Someone" />;
}
