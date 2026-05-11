"use client";

import { startTransition, useOptimistic, useState } from "react";
import SupabaseReportCard from "@/components/ui/supabase-report-card";
import { deleteReportAction } from "@/lib/actions";

export default function ReportList({ initialReports }) {
  const [reports, setReports] = useState(initialReports);
  const [pendingIds, setPendingIds] = useState([]);
  const [optimisticReports, removeOptimisticReport] = useOptimistic(
    reports,
    (state, reportId) => state.filter((report) => report.id !== reportId)
  );

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
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500 lg:col-span-2">
          Belum ada laporan yang dikirim.
        </div>
      )}
    </div>
  );
}
