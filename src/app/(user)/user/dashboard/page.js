import AppLogo from "@/components/common/app-logo";
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import LogoutButton from "@/components/ui/logout-button";
import PhoneShell from "@/components/ui/phone-shell";
import UserDashboardClient from "@/components/ui/user-dashboard-client";
import { USER_ROLES } from "@/lib/auth/constants";
import { requireRole } from "@/lib/auth/session";
import { getReports } from "@/lib/reports";

export const dynamic = "force-dynamic";

export default async function UserDashboardPage() {
  await requireRole(USER_ROLES.MASYARAKAT);
  const reports = await getReports();

  return (
    <PhoneShell className="flex flex-col">
      <div className="leafy-bg relative overflow-hidden px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-44 bg-emerald-500/10 blur-3xl" />
        <div className="relative rounded-4xl border border-white/60 bg-white/95 p-6 shadow-2xl shadow-emerald-100/70 backdrop-blur-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <AppLogo />
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Dashboard Warga</h1>
              <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">Pantau laporan Anda, lihat progres penanganan, dan terus dukung lingkungan dengan tindakan cepat.</p>
            </div>
            <LogoutButton className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:text-sm" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/80 p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Aksi Cepat</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-800">Buat laporan baru atau periksa status pelaporan Anda dengan mudah kapan saja.</p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-slate-50 p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">Pengalaman Profesional</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Desain bersih, fokus pada data, dan ringkasan statistik yang membantu Anda tetap terinformasi.</p>
            </div>
          </div>
        </div>
      </div>
      <UserDashboardClient initialReports={reports} />
      <MobileBottomNav basePath="/user" active="dashboard" />
    </PhoneShell>
  );
}
