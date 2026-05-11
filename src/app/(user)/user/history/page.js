
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import PhoneShell from "@/components/ui/phone-shell";
import ReportList from "@/app/(user)/user/history/ReportList";
import { getReports } from "@/lib/reports";

export const dynamic = "force-dynamic";

export default async function UserHistoryPage() {
  const reports = await getReports();

  return (
    <PhoneShell className="flex flex-col">
      <header className="leafy-bg border-b border-emerald-100 px-4 py-5 text-center sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold text-gray-800 sm:text-3xl">Riwayat Laporan</h1>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-gray-600 sm:text-sm">
          Pantau semua laporan sampah yang sudah masuk ke sistem ResikIn.
        </p>
      </header>
      <ReportList initialReports={reports} />
      <MobileBottomNav basePath="/user" active="reports" />
    </PhoneShell>
  );
}
