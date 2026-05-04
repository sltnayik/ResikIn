"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImagePreview from "@/components/ui/image-preview";
import MapPicker from "@/components/ui/map-picker";
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import LoadingSpinner from "@/components/ui/loading-spinner";
import PhoneShell from "@/components/ui/phone-shell";
import { supabase } from "@/lib/supabase";

export default function UserReportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "" });
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const imageFile = formData.get("image");

    setIsLoading(true);

    try {
      if (!imageFile || imageFile.size === 0) {
        toast.error("Foto laporan wajib diunggah.");
        return;
      }

      const latitude = formData.get("latitude") ? Number(formData.get("latitude")) : null;
      const longitude = formData.get("longitude") ? Number(formData.get("longitude")) : null;

      if (latitude === null || longitude === null) {
        toast.error("Pilih titik lokasi pada map terlebih dahulu.");
        return;
      }

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        toast.error("Koordinat laporan tidak valid.");
        return;
      }

      const extension = imageFile.name.split(".").pop() || "jpg";
      const filePath = `reports/${Date.now()}-${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("report-images")
        .upload(filePath, imageFile, {
          contentType: imageFile.type || "image/jpeg",
          upsert: false,
        });

      if (uploadError) {
        const isMissingBucket = uploadError.message?.toLowerCase().includes("bucket not found");
        const isRlsError = uploadError.message?.toLowerCase().includes("row-level security");
        toast.error(
          isMissingBucket
            ? "Bucket report-images belum dibuat di Supabase Storage."
            : isRlsError
              ? "Policy upload Storage belum mengizinkan insert public."
            : uploadError.message || "Foto laporan gagal diunggah."
        );
        return;
      }

      const { data: publicUrlData } = supabase.storage.from("report-images").getPublicUrl(filePath);

      const report = {
        reporter_name: String(formData.get("reporter_name") || "").trim(),
        location_text: String(formData.get("location_text") || "").trim(),
        waste_type: String(formData.get("waste_type") || "").trim(),
        urgency: String(formData.get("urgency") || "").trim(),
        description: String(formData.get("description") || "").trim(),
        image_url: publicUrlData.publicUrl,
        latitude,
        longitude,
      };

      const { error: insertError } = await supabase.from("reports").insert(report);

      if (insertError) {
        const isRlsError = insertError.message?.toLowerCase().includes("row-level security");
        toast.error(
          isRlsError
            ? "Policy tabel reports belum mengizinkan insert public."
            : insertError.message || "Laporan gagal disimpan."
        );
        return;
      }

      toast.success("Laporan berhasil dikirim.");
      form.reset();
      setCoordinates({ latitude: "", longitude: "" });
      setPreviewUrl("");
    } catch (error) {
      toast.error(error.message || "Terjadi kesalahan saat mengirim laporan.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PhoneShell className="flex flex-col">
      {isLoading ? <LoadingSpinner fullscreen label="Mengirim laporan" /> : null}
      <header className="leafy-bg border-b border-emerald-100 px-4 py-5 text-center sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold text-gray-800 sm:text-3xl">Laporkan Sampah</h1>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-gray-600 sm:text-sm">
          Lengkapi detail laporan agar petugas mudah memahami lokasi dan kondisi.
        </p>
      </header>
      <div className="grid flex-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
        <div className="min-h-56 lg:min-h-full">
          <ImagePreview previewUrl={previewUrl} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="reporter_name"
            placeholder="Nama pelapor"
            required
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-emerald-400"
          />
          <input
            type="text"
            name="location_text"
            placeholder="Lokasi sampah"
            required
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-emerald-400"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <select
              name="waste_type"
              required
              defaultValue=""
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-500 outline-none focus:border-emerald-400"
            >
              <option value="" disabled>
                Jenis sampah
              </option>
              <option value="Organik">Organik</option>
              <option value="Anorganik">Anorganik</option>
              <option value="B3">B3</option>
              <option value="Campuran">Campuran</option>
            </select>
            <select
              name="urgency"
              required
              defaultValue=""
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-500 outline-none focus:border-emerald-400"
            >
              <option value="" disabled>
                Tingkat urgensi
              </option>
              <option value="Rendah">Rendah</option>
              <option value="Sedang">Sedang</option>
              <option value="Tinggi">Tinggi</option>
            </select>
          </div>
          <textarea
            name="description"
            rows={6}
            placeholder="Deskripsi laporan"
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            onChange={handleImageChange}
            className="block w-full rounded-lg border border-gray-200 bg-white text-sm text-gray-500 file:mr-3 file:h-11 file:border-0 file:bg-emerald-50 file:px-4 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
          />
          <input type="hidden" name="latitude" value={coordinates.latitude} />
          <input type="hidden" name="longitude" value={coordinates.longitude} />
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex flex-col gap-1">
              <p className="text-xs font-semibold text-gray-700 sm:text-sm">Pilih lokasi pada map</p>
              <p className="text-[11px] text-gray-500 sm:text-xs">
                {coordinates.latitude && coordinates.longitude
                  ? `${coordinates.latitude}, ${coordinates.longitude}`
                  : "Klik titik lokasi sampah pada map."}
              </p>
            </div>
            <MapPicker
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
              onChange={setCoordinates}
            />
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex flex-col gap-1">
              <div>
                <p className="text-xs font-semibold text-gray-700 sm:text-sm">Koordinat tersimpan</p>
                <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                  {coordinates.latitude && coordinates.longitude
                    ? `${coordinates.latitude}, ${coordinates.longitude}`
                    : "Belum ada koordinat"}
                </p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-lg bg-emerald-500 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Mengirim..." : "Kirim Laporan"}
          </button>
        </form>
      </div>
      <MobileBottomNav basePath="/user" active="report" />
    </PhoneShell>
  );
}
