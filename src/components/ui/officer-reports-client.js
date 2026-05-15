"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SupabaseReportCard from "@/components/ui/supabase-report-card";

export default function OfficerReportsClient({ reports, filters }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(filters.search);

  const updateFilter = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);

      if (!value || value === "semua") {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      startTransition(() => {
        router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, {
          scroll: false,
        });
      });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateFilter("q", searchValue);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchValue, updateFilter]);

  return (
    <>
      <div className="mt-4 rounded-4xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-slate-900">Cari dan filter laporan</p>
            <p className="mt-2 text-sm text-slate-500">Temukan laporan berdasarkan lokasi, jenis, dan status dengan cepat.</p>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
            <span>Menampilkan {reports.length} laporan</span>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_.85fr_.85fr]">
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Cari nama, lokasi, jenis, atau deskripsi"
            className="h-11 rounded-3xl border border-gray-200 px-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
          <select
            value={filters.status}
            onChange={(event) => updateFilter("status", event.target.value)}
            className="h-11 rounded-3xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="semua">Semua Status</option>
            <option value="menunggu">Menunggu</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai</option>
          </select>
          <select
            value={filters.time}
            onChange={(event) => updateFilter("time", event.target.value)}
            className="h-11 rounded-3xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="semua">Semua Waktu</option>
            <option value="hari-ini">Hari ini</option>
            <option value="minggu-ini">Minggu ini</option>
            <option value="bulan-ini">Bulan ini</option>
          </select>
        </div>
      </div>
      {isPending ? <p className="mt-3 text-xs font-medium text-emerald-700">Memperbarui data...</p> : null}

      <div className="grid flex-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {reports.length > 0 ? (
          reports.map((report) => <SupabaseReportCard key={report.id} report={report} href={`/officer/reports/${report.id}`} showCoordinates showActions />)
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500 lg:col-span-2">Tidak ada laporan sesuai filter.</div>
        )}
      </div>
    </>
  );
}
