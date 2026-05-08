'use client';

import { useOptimistic, startTransition } from "react";
import SupabaseReportCard from "@/components/ui/supabase-report-card";
// 1. IMPORT fungsi dari file actions.js (HUBUNGKAN DI SINI)
import { deleteReportAction } from "./actions"; 

export default function ReportList({ initialReports }) {
  
  // Setup Optimistic State
  const [optimisticReports, removeReport] = useOptimistic(
    initialReports,
    (state, reportId) => state.filter((r) => r.id !== reportId)
  );

  const handleDelete = async (id) => {
    // 2. JALANKAN PERUBAHAN INSTAN DI LAYAR
    startTransition(() => {
      removeReport(id); 
    });

    try {
      // 3. PANGGIL FUNGSI DATABASE (HUBUNGKAN DI SINI)
      await deleteReportAction(id);
      console.log("Berhasil menghapus dari database");
    } catch (error) {
      // Jika error, data otomatis muncul kembali ke layar
      console.error("Gagal hapus:", error);
      alert("Koneksi bermasalah, gagal menghapus laporan.");
    }
  };

  return (
    <div className="grid flex-1 gap-3 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      {optimisticReports.length > 0 ? (
        optimisticReports.map((report) => (
          <div key={report.id} className="relative group">
            <SupabaseReportCard report={report} />
            
            {/* Tombol Hapus sebagai pemicu aksi */}
            <button 
              onClick={() => handleDelete(report.id)}
              className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all"
            >
              Hapus Laporan
            </button>
          </div>
        ))
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500 lg:col-span-2">
          Belum ada laporan yang dikirim.
        </div>
      )}
    </div>
  );
}