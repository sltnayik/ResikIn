"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import StatCard from "@/components/ui/stat-card";
import SupabaseReportCard from "@/components/ui/supabase-report-card";
import Link from "next/link";

export default function UserDashboardClient({ initialReports }) {
  const [reports, setReports] = useState(initialReports || []);

  useEffect(() => {
    const channel = supabase
      .channel("reports-updates")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "reports" }, (payload) => {
        const updatedReport = payload.new;
        setReports((current) =>
          current.map((report) =>
            report.id === updatedReport.id
              ? { ...report, status: updatedReport.status, updated_at: updatedReport.updated_at }
              : report
          )
        );
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const highUrgencyCount = useMemo(() => reports.filter((report) => report.urgency?.toLowerCase() === "tinggi").length, [reports]);
  const wasteTypesCount = useMemo(() => new Set(reports.map((report) => report.waste_type).filter(Boolean)).size, [reports]);

  return (
    <div className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
      <section className="mb-4 grid gap-3 sm:grid-cols-3">
        <StatCard label="Total Laporan" value={reports.length} />
        <StatCard label="Urgensi Tinggi" value={highUrgencyCount} />
        <StatCard label="Jenis Sampah" value={wasteTypesCount} />
      </section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-gray-700 sm:text-base">Riwayat laporan</h2>
        <Link href="/user/report" className="w-full rounded-md bg-emerald-500 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-emerald-600 sm:w-auto sm:text-sm">
          Buat Laporan
        </Link>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {reports.length > 0 ? (
          reports.map((report) => <SupabaseReportCard key={report.id} report={report} />)
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500 lg:col-span-2">Belum ada laporan yang dikirim.</div>
        )}
      </div>
    </div>
  );
}
