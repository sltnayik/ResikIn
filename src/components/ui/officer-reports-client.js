"use client";

import { useMemo, useState } from "react";
import SupabaseReportCard from "@/components/ui/supabase-report-card";

function isInRange(dateValue, range) {
  if (range === "semua") return true;

  const reportDate = new Date(dateValue);
  const now = new Date();
  const start = new Date(now);

  if (range === "hari-ini") {
    start.setHours(0, 0, 0, 0);
  }

  if (range === "minggu-ini") {
    start.setDate(now.getDate() - 7);
  }

  if (range === "bulan-ini") {
    start.setMonth(now.getMonth() - 1);
  }

  return reportDate >= start;
}

export default function OfficerReportsClient({ reports }) {
  const [statusFilter, setStatusFilter] = useState("semua");
  const [timeFilter, setTimeFilter] = useState("semua");

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const statusMatches = statusFilter === "semua" || report.status === statusFilter;
      const timeMatches = isInRange(report.created_at, timeFilter);
      return statusMatches && timeMatches;
    });
  }, [reports, statusFilter, timeFilter]);

  return (
    <>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="h-10 rounded-md border border-gray-200 px-2 text-xs sm:text-sm"
        >
          <option value="semua">Semua Status</option>
          <option value="menunggu">Menunggu</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
        </select>
        <select
          value={timeFilter}
          onChange={(event) => setTimeFilter(event.target.value)}
          className="h-10 rounded-md border border-gray-200 px-2 text-xs sm:text-sm"
        >
          <option value="semua">Semua Waktu</option>
          <option value="hari-ini">Hari ini</option>
          <option value="minggu-ini">Minggu ini</option>
          <option value="bulan-ini">Bulan ini</option>
        </select>
      </div>

      <div className="grid flex-1 gap-3 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <SupabaseReportCard
              key={report.id}
              report={report}
              href={`/officer/reports/${report.id}`}
              showCoordinates
              showActions
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500 lg:col-span-2">
            Tidak ada laporan sesuai filter.
          </div>
        )}
      </div>
    </>
  );
}
