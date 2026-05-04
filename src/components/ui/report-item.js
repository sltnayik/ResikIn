import Image from "next/image";
import Link from "next/link";

const statusStyle = {
  "Dalam Proses": "bg-yellow-100 text-yellow-700",
  "Menunggu Konfirmasi": "bg-red-100 text-red-600",
  Selesai: "bg-emerald-100 text-emerald-700",
};

export default function ReportItem({ report, href }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-2 transition hover:border-emerald-300 hover:shadow-sm sm:p-3"
    >
      <Image
        src={report.image}
        alt={report.title}
        width={96}
        height={80}
        className="h-14 w-14 rounded-md object-cover sm:h-20 sm:w-24"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-semibold text-gray-700 sm:text-sm">{report.title}</div>
        <div className="mt-1 truncate text-[11px] text-gray-500 sm:text-xs">{report.location}</div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-[10px] text-gray-400 sm:text-xs">{report.date}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-xs ${
              statusStyle[report.status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {report.status}
          </span>
        </div>
      </div>
    </Link>
  );
}
