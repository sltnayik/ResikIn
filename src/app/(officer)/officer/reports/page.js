import PhoneShell from "@/components/ui/phone-shell";
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import OfficerReportsClient from "@/components/ui/officer-reports-client";
import { USER_ROLES } from "@/lib/auth/constants";
import { requireRole } from "@/lib/auth/session";
import { getReports } from "@/lib/reports";

export const dynamic = "force-dynamic";

export default async function OfficerReportsPage({ searchParams }) {
  await requireRole(USER_ROLES.PETUGAS);
  const params = await searchParams;
  const filters = {
    search: params?.q || "",
    status: params?.status || "semua",
    time: params?.time || "semua",
  };
  const reports = await getReports(filters);

  return (
    <PhoneShell className="flex flex-col">
      <header className="bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300 sm:text-sm">Panel Petugas</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Daftar Laporan Aktif</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Filter, pantau, dan tindak lanjut laporan warga dengan tampilan yang jelas dan responsif.</p>
            </div>
          </div>
        </div>
      </header>
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <OfficerReportsClient reports={reports} filters={filters} />
        </div>
      </main>
      <MobileBottomNav basePath="/officer" active="reports" />
    </PhoneShell>
  );
}
