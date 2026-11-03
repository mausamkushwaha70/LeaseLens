import type { Metadata } from "next";
import { LeaseManagement } from "@/components/leases/lease-management";

export const metadata: Metadata = { title: "All Leases" };
export default function AllLeasesPage() {
  return <LeaseManagement />;
}