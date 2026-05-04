import AppLogo from "@/components/common/app-logo";
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import LogoutButton from "@/components/ui/logout-button";
import PhoneShell from "@/components/ui/phone-shell";
import UserDashboardClient from "@/components/ui/user-dashboard-client";
import { getReports } from "@/lib/reports";

export const dynamic = "force-dynamic";

export default async function UserDashboardPage() {
  const reports = await getReports();

  return (
    <PhoneShell className="flex flex-col">
      <div className="leafy-bg border-b border-emerald-100 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <AppLogo />
          <LogoutButton className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:text-sm" />
        </div>
        <h1 className="mt-4 max-w-3xl text-xl font-semibold text-gray-800 sm:text-3xl">Laporan Sampah di Sekitar Anda</h1>
        <p className="mt-2 max-w-2xl text-xs text-gray-600 sm:text-sm">Bantu kami menjaga kebersihan lingkungan dengan cepat dan mudah.</p>
      </div>
      <UserDashboardClient initialReports={reports} />
      <MobileBottomNav basePath="/user" active="dashboard" />
    </PhoneShell>
  );
}
