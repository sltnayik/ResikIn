import PhoneShell from "@/components/ui/phone-shell";
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import OfficerReportsClient from "@/components/ui/officer-reports-client";
import { getReports } from "@/lib/reports";

export const dynamic = "force-dynamic";

export default async function OfficerReportsPage() {
  const reports = await getReports();

  return (
    <PhoneShell className="flex flex-col">
      <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-lg font-semibold text-gray-800 sm:text-3xl">Daftar Laporan</h1>
      </header>
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <OfficerReportsClient reports={reports} />
      </div>
      <MobileBottomNav basePath="/officer" active="reports" />
    </PhoneShell>
  );
}
