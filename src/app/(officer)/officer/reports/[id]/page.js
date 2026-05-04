import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhoneShell from "@/components/ui/phone-shell";
import MapPreview from "@/components/ui/map-preview";
import ReportStatusActions from "@/components/ui/report-status-actions";
import { getReportById } from "@/lib/reports";

export const dynamic = "force-dynamic";

export default async function OfficerReportDetailPage({ params }) {
  const { id } = await params;
  const report = await getReportById(id);

  if (!report) {
    notFound();
  }

  return (
    <PhoneShell className="flex flex-col">
      <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-lg font-semibold text-gray-800 sm:text-3xl">Tindakan Laporan</h1>
      </header>
      <div className="grid flex-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="mb-2 text-xs font-semibold text-gray-700 sm:text-sm">
            ID Laporan: {report.id}
          </div>
          {report.image_url ? (
            <Image
              src={report.image_url}
              alt={`Foto laporan ${report.waste_type}`}
              width={800}
              height={420}
              className="h-48 w-full rounded-md object-cover sm:h-64 lg:h-[calc(100%-2rem)]"
            />
          ) : (
            <div className="grid h-48 place-items-center rounded-md bg-gray-100 text-sm text-gray-400 sm:h-64">
              Tidak ada foto
            </div>
          )}
          <div className="mt-3 text-xs leading-5 text-gray-600 sm:text-sm">
            {report.description}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-xs text-gray-600 sm:text-sm">
            <div className="font-semibold text-gray-800">{report.reporter_name}</div>
            <div className="mt-2">{report.location_text}</div>
            <div className="mt-2">Jenis sampah: {report.waste_type}</div>
            <div className="mt-2">Urgensi: {report.urgency}</div>
            <div className="mt-2">Status: {report.status || "menunggu"}</div>
            <div className="mt-2">
              Koordinat: {report.latitude ?? "-"}, {report.longitude ?? "-"}
            </div>
            <ReportStatusActions reportId={report.id} status={report.status || "menunggu"} />
            <MapPreview latitude={report.latitude} longitude={report.longitude} />
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <label className="text-xs font-medium text-gray-700 sm:text-sm">Alat Tindakan</label>
            <select className="mt-1 h-10 w-full rounded-md border border-gray-200 px-2 text-xs sm:text-sm">
              <option>Pilih alat tindakan</option>
              <option>Truk pengangkut</option>
              <option>Petugas sapu jalan</option>
            </select>
            <label className="mt-3 block text-xs font-medium text-gray-700 sm:text-sm">Catatan Petugas</label>
            <textarea
              rows={6}
              placeholder="Masukkan catatan tindak lanjut..."
              className="mt-1 w-full rounded-md border border-gray-200 px-2 py-2 text-xs sm:text-sm"
            />
          </div>
          <Link href="/officer/reports" className="block text-center text-xs text-emerald-600 sm:text-sm">
            Kembali ke daftar laporan
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}
