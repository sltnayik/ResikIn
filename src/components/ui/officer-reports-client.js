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

  const updateFilter = useCallback((name, value) => {
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
  }, [pathname, router, searchParams]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateFilter("q", searchValue);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchValue, updateFilter]);

  return (
    <>
      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_.75fr_.75fr]">
        <input
          type="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Cari nama, lokasi, jenis, atau deskripsi"
          className="h-10 rounded-md border border-gray-200 px-3 text-xs outline-none focus:border-emerald-400 sm:text-sm"
        />
        <select
          value={filters.status}
          onChange={(event) => updateFilter("status", event.target.value)}
          className="h-10 rounded-md border border-gray-200 px-2 text-xs sm:text-sm"
        >
          <option value="semua">Semua Status</option>
          <option value="menunggu">Menunggu</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
        </select>
        <select
          value={filters.time}
          onChange={(event) => updateFilter("time", event.target.value)}
          className="h-10 rounded-md border border-gray-200 px-2 text-xs sm:text-sm"
        >
          <option value="semua">Semua Waktu</option>
          <option value="hari-ini">Hari ini</option>
          <option value="minggu-ini">Minggu ini</option>
          <option value="bulan-ini">Bulan ini</option>
        </select>
      </div>
      {isPending ? (
        <p className="mt-3 text-xs font-medium text-emerald-700">Memperbarui data...</p>
      ) : null}

      <div className="grid flex-1 gap-3 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {reports.length > 0 ? (
          reports.map((report) => (
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
