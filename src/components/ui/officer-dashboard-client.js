"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import StatCard from "@/components/ui/stat-card";
import ReportsMapOverview from "@/components/ui/reports-map-overview";
import ReportStatusActions from "@/components/ui/report-status-actions";
import NavigationLink from "@/components/ui/navigation-link";

export default function OfficerDashboardClient({ initialReports }) {
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
  const mediumUrgencyCount = useMemo(() => reports.filter((report) => report.urgency?.toLowerCase() === "sedang").length, [reports]);
  const lowUrgencyCount = useMemo(() => reports.filter((report) => report.urgency?.toLowerCase() === "rendah").length, [reports]);

  return (
    <div className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Laporan" value={reports.length} />
        <StatCard label="Urgensi Tinggi" value={highUrgencyCount} />
        <StatCard label="Urgensi Sedang" value={mediumUrgencyCount} />
        <StatCard label="Urgensi Rendah" value={lowUrgencyCount} />
      </section>
      <section className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
        <ReportsMapOverview reports={reports} />
        <div className="space-y-3">
          {reports.slice(0, 3).map((report) => (
            <article key={report.id} className="rounded-lg border border-gray-200 bg-white p-3">
              <div className="text-sm font-semibold text-gray-700">{report.reporter_name}</div>
              <div className="mt-1 text-xs text-gray-500">{report.location_text}</div>
              <ReportStatusActions reportId={report.id} status={report.status || "menunggu"} />
              <NavigationLink href={`/officer/reports/${report.id}`} className="mt-2 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-800">
                Lihat detail
              </NavigationLink>
            </article>
          ))}
          {reports.length === 0 ? <div className="rounded-lg border border-dashed border-gray-300 bg-white p-4 text-center text-sm text-gray-500">Belum ada laporan masuk.</div> : null}
        </div>
      </section>
    </div>
  );
}
