"use client";

import { startTransition, useOptimistic, useState } from "react";
import SupabaseReportCard from "@/components/ui/supabase-report-card";
import { deleteReportAction } from "@/lib/actions";

export default function ReportList({ initialReports }) {
  const [reports, setReports] = useState(initialReports);
  const [pendingIds, setPendingIds] = useState([]);
  const [optimisticReports, removeOptimisticReport] = useOptimistic(reports, (state, reportId) => state.filter((report) => report.id !== reportId));

  const totalReports = optimisticReports.length;
  const pendingReports = optimisticReports.filter((report) => report.status === "menunggu").length;
  const inProgressReports = optimisticReports.filter((report) => report.status === "diproses").length;
  const completedReports = optimisticReports.filter((report) => report.status === "selesai").length;

  async function handleDelete(id) {
    if (pendingIds.includes(id)) return;

    setPendingIds((current) => [...current, id]);
    startTransition(() => {
      removeOptimisticReport(id);
    });

    const result = await deleteReportAction(id);

    if (result.success) {
      setReports((current) => current.filter((report) => report.id !== id));
    } else {
      alert(result.message);
    }

    setPendingIds((current) => current.filter((pendingId) => pendingId !== id));
  }

  return (
    <>
      <div className="mb-5 rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Ringkasan Riwayat</p>
            <p className="mt-2 text-sm text-gray-600">Semua laporan Anda dikelompokkan berdasarkan status untuk memudahkan pemantauan.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Total</div>
              <div className="mt-2 text-xl font-semibold text-slate-900">{totalReports}</div>
            </div>
            <div className="rounded-3xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
              <div className="text-xs uppercase tracking-[0.24em] text-amber-500">Menunggu</div>
              <div className="mt-2 text-xl font-semibold">{pendingReports}</div>
            </div>
            <div className="rounded-3xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
              <div className="text-xs uppercase tracking-[0.24em] text-blue-500">Diproses</div>
              <div className="mt-2 text-xl font-semibold">{inProgressReports}</div>
            </div>
            <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <div className="text-xs uppercase tracking-[0.24em] text-emerald-500">Selesai</div>
              <div className="mt-2 text-xl font-semibold">{completedReports}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid flex-1 gap-3 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {optimisticReports.length > 0 ? (
          optimisticReports.map((report) => {
            const isDeleting = pendingIds.includes(report.id);

            return (
              <div key={report.id} className="group relative">
                <SupabaseReportCard report={report} />
                <button
                  type="button"
                  onClick={() => handleDelete(report.id)}
                  disabled={isDeleting}
                  className="absolute right-3 top-3 rounded-lg bg-red-500/90 px-3 py-1.5 text-[10px] font-semibold text-white opacity-0 shadow-sm transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60 group-hover:opacity-100"
                >
                  {isDeleting ? "Menghapus..." : "Hapus Laporan"}
                </button>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500 lg:col-span-2">Belum ada laporan yang dikirim.</div>
        )}
      </div>
    </>
  );
}
