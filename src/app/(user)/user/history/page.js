
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import PhoneShell from "@/components/ui/phone-shell";
import SupabaseReportCard from "@/components/ui/supabase-report-card";
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
      <div className="grid flex-1 gap-3 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {reports.length > 0 ? (
          reports.map((report) => <SupabaseReportCard key={report.id} report={report} />)
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500 lg:col-span-2">
            Belum ada laporan yang dikirim.
          </div>
        )}
      </div>
      <MobileBottomNav basePath="/user" active="reports" />
    </PhoneShell>
  );
}
