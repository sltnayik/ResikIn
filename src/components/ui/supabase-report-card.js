"use client";

import Image from "next/image";
import MapPreview from "@/components/ui/map-preview";
import NavigationLink from "@/components/ui/navigation-link";
import ReportStatusActions from "@/components/ui/report-status-actions";

const urgencyStyle = {
  rendah: "bg-emerald-100 text-emerald-700",
  sedang: "bg-yellow-100 text-yellow-700",
  tinggi: "bg-red-100 text-red-600",
};

const statusStyle = {
  menunggu: "bg-red-500 text-white",
  diproses: "bg-yellow-400 text-black",
  selesai: "bg-green-500 text-white",
};

function formatDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function SupabaseReportCard({ report, href, showCoordinates = false, showActions = false }) {
  const urgency = report.urgency?.toLowerCase();
  const cardContent = (
    <>
      <div className="relative h-36 w-full overflow-hidden rounded-lg bg-gray-100 sm:h-44">
        {report.image_url ? (
          <Image src={report.image_url} alt={`Foto laporan ${report.waste_type}`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-xs font-semibold text-gray-400">Tidak ada foto</div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">{report.waste_type}</span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${urgencyStyle[urgency] || "bg-gray-100 text-gray-600"}`}>{report.urgency}</span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle[report.status] || "bg-gray-100 text-gray-600"}`}>{report.status || "menunggu"}</span>
      </div>
      <h3 className="mt-3 text-sm font-bold text-gray-800 sm:text-base">{report.reporter_name}</h3>
      <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">{report.location_text}</p>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-600 sm:text-sm">{report.description}</p>
      {showCoordinates ? (
        <p className="mt-2 text-[11px] text-gray-400 sm:text-xs">
          Lat/Lng: {report.latitude ?? "-"}, {report.longitude ?? "-"}
        </p>
      ) : null}
      <MapPreview latitude={report.latitude} longitude={report.longitude} />
      {showActions ? <ReportStatusActions reportId={report.id} status={report.status || "menunggu"} /> : null}
      {showActions && href ? (
        <NavigationLink href={href} className="mt-3 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-800">
          Lihat detail
        </NavigationLink>
      ) : null}
      <p className="mt-3 text-[11px] font-medium text-gray-400 sm:text-xs">{formatDate(report.created_at)}</p>
    </>
  );

  if (!href || showActions) {
    return <article className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">{cardContent}</article>;
  }

  return (
    <NavigationLink href={href} className="block rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
      {cardContent}
    </NavigationLink>
  );
}
