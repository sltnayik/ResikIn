"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

const statusStyle = {
  menunggu: "bg-red-500 text-white",
  diproses: "bg-yellow-400 text-black",
  selesai: "bg-green-500 text-white",
};

export default function ReportStatusActions({ reportId, status }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function updateStatus(nextStatus) {
    setIsUpdating(true);

    const { error } = await supabase.from("reports").update({ status: nextStatus }).eq("id", reportId);

    if (error) {
      toast.error(error.message || "Status gagal diperbarui.");
      setIsUpdating(false);
      return;
    }

    toast.success("Status laporan diperbarui.");
    setIsUpdating(false);
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle[status] || "bg-gray-100 text-gray-600"}`}>{status || "menunggu"}</span>
      {status !== "diproses" && status !== "selesai" ? (
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus("diproses")}
          className="rounded-md bg-blue-500 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Proses
        </button>
      ) : null}
      {status !== "selesai" ? (
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus("selesai")}
          className="rounded-md bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Selesaikan
        </button>
      ) : null}
    </div>
  );
}
