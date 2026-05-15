import Link from "next/link";
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import PhoneShell from "@/components/ui/phone-shell";
import ReportList from "@/app/(user)/user/history/ReportList";
import { USER_ROLES } from "@/lib/auth/constants";
import { requireRole } from "@/lib/auth/session";
import { getReports } from "@/lib/reports";

export const dynamic = "force-dynamic";

export default async function UserHistoryPage() {
  await requireRole(USER_ROLES.MASYARAKAT);
  const reports = await getReports();

  return (
    <PhoneShell className="flex flex-col">
      <header className="leafy-bg px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl rounded-4xl border border-white/70 bg-white/95 p-6 shadow-2xl shadow-emerald-100/50 backdrop-blur-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-emerald-700 sm:text-sm">Riwayat Laporan</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Semua laporan Anda dalam satu tempat</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Pantau progres laporan, hapus entri lama, dan terus dukung lingkungan dengan data yang mudah dibaca.</p>
            </div>
            <Link href="/user/report" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600">
              Buat Laporan Baru
            </Link>
          </div>
        </div>
      </header>
      <ReportList initialReports={reports} />
      <MobileBottomNav basePath="/user" active="reports" />
    </PhoneShell>
  );
}
