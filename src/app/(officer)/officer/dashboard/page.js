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
      <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <AppLogo />
          <LogoutButton className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:border-emerald-200 hover:text-emerald-700 sm:text-sm" />
        </div>
        <h1 className="mt-4 text-lg font-semibold text-gray-800 sm:text-3xl">Selamat datang Petugas</h1>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">Pantau dan kelola laporan warga hari ini.</p>
      </header>
      <OfficerDashboardClient initialReports={reports} />
      <MobileBottomNav basePath="/officer" active="dashboard" />
    </PhoneShell>
  );
}
