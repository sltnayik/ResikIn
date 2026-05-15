import AppLogo from "@/components/common/app-logo";
import PhoneShell from "@/components/ui/phone-shell";
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import LogoutButton from "@/components/ui/logout-button";
import OfficerDashboardClient from "@/components/ui/officer-dashboard-client";
import { USER_ROLES } from "@/lib/auth/constants";
import { requireRole } from "@/lib/auth/session";
import { getReports } from "@/lib/reports";

export const dynamic = "force-dynamic";

export default async function OfficerDashboardPage() {
  await requireRole(USER_ROLES.PETUGAS);
  const reports = await getReports();

  return (
    <PhoneShell className="flex flex-col">
      <header className="bg-white px-4 py-6 sm:px-6 lg:px-8 text-black">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <AppLogo />
            <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Dashboard Petugas</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-900 sm:text-base">Kontrol penuh untuk melihat, memprioritaskan, dan menindaklanjuti laporan lingkungan secara cepat.</p>
          </div>
          <LogoutButton className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:text-sm" />
        </div>
      </header>
      <div className="bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl rounded-4xl border border-gray-200 bg-white p-6 shadow-lg shadow-slate-200/50">
          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Ringkasan Kinerja</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">Statistik terbaru dan laporan prioritas agar Anda dapat mengambil tindakan dengan lebih akurat.</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-5 text-sm text-emerald-800">
              <div className="font-semibold">Proses yang lebih cepat</div>
              <p className="mt-2 text-sm leading-6 text-emerald-700">Gunakan dasbor ini sebagai pusat keputusan untuk memantau status dan urgensi laporan.</p>
            </div>
          </div>
        </div>
      </div>
      <OfficerDashboardClient initialReports={reports} />
      <MobileBottomNav basePath="/officer" active="dashboard" />
    </PhoneShell>
  );
}
