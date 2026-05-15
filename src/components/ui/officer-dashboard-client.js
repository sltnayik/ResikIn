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
        setReports((current) => current.map((report) => (report.id === updatedReport.id ? { ...report, status: updatedReport.status, updated_at: updatedReport.updated_at } : report)));
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
    <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Total Laporan" value={reports.length} />
        <StatCard label="Urgensi Tinggi" value={highUrgencyCount} />
        <StatCard label="Urgensi Sedang" value={mediumUrgencyCount} />
        <StatCard label="Urgensi Rendah" value={lowUrgencyCount} />
      </section>
      <section className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <div className="space-y-4">
          <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Peta Laporan</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">Visualisasikan lokasi laporan secara langsung, sehingga penanganan dapat diarahkan dengan lebih tepat.</p>
          </div>
          <ReportsMapOverview reports={reports} />
        </div>
        <div className="space-y-4">
          <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Laporan Prioritas</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">Ringkas laporan terbaru dengan status terkini dan tindakan cepat untuk tim petugas.</p>
          </div>
          <div className="space-y-4">
            {reports.slice(0, 3).map((report) => (
              <article key={report.id} className="rounded-3xl border border-gray-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{report.reporter_name}</p>
                    <p className="mt-1 text-xs text-gray-500">{report.location_text}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">{report.status || "menunggu"}</span>
                </div>
                <ReportStatusActions reportId={report.id} status={report.status || "menunggu"} />
                <NavigationLink href={`/officer/reports/${report.id}`} className="mt-3 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-800">
                  Lihat detail
                </NavigationLink>
              </article>
            ))}
            {reports.length === 0 ? <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">Belum ada laporan masuk.</div> : null}
          </div>
        </div>
      </section>
    </div>
  );
}
