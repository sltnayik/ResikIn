"use client";

import { startTransition, useOptimistic, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

const statusStyle = {
  menunggu: "bg-red-500 text-white",
  diproses: "bg-yellow-400 text-black",
  selesai: "bg-green-500 text-white",
};

export default function ReportStatusActions({ reportId, status }) {
  const [currentStatus, setCurrentStatus] = useState(status || "menunggu");
  const [isUpdating, setIsUpdating] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    currentStatus,
    (_state, nextStatus) => nextStatus
  );

  async function updateStatus(nextStatus) {
    if (isUpdating || nextStatus === optimisticStatus) return;

    const previousStatus = currentStatus;
    setIsUpdating(true);

    startTransition(() => {
      setOptimisticStatus(nextStatus);
    });

    const { error } = await supabase.from("reports").update({ status: nextStatus }).eq("id", reportId);

    if (error) {
      toast.error(error.message || "Status gagal diperbarui.");
      setCurrentStatus(previousStatus);
      setIsUpdating(false);
      return;
    }

    setCurrentStatus(nextStatus);
    toast.success("Status laporan diperbarui.");
    setIsUpdating(false);
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle[optimisticStatus] || "bg-gray-100 text-gray-600"}`}>
        {optimisticStatus || "menunggu"}
      </span>
      {optimisticStatus !== "diproses" && optimisticStatus !== "selesai" ? (
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus("diproses")}
          className="rounded-md bg-blue-500 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Proses
        </button>
      ) : null}
      {optimisticStatus !== "selesai" ? (
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
