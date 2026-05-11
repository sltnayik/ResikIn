"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ImagePreview from "@/components/ui/image-preview";
import MapPicker from "@/components/ui/map-picker";
import MobileBottomNav from "@/components/ui/mobile-bottom-nav";
import LoadingSpinner from "@/components/ui/loading-spinner";
import PhoneShell from "@/components/ui/phone-shell";
import { createReport } from "@/lib/actions";

const initialState = {
  success: false,
  message: "",
  errors: {},
};

function FieldError({ message }) {
  if (!message) return null;

  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

export default function UserReportPage() {
  const formRef = useRef(null);
  const [state, formAction, isPending] = useActionState(createReport, initialState);
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "" });
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
      setTimeout(() => {
        setCoordinates({ latitude: "", longitude: "" });
        setPreviewUrl("");
      }, 0);
      return;
    }

    toast.error(state.message);
  }, [state]);

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

  return (
    <PhoneShell className="flex flex-col">
      {isPending ? <LoadingSpinner fullscreen label="Mengirim laporan" /> : null}
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
        <form ref={formRef} action={formAction} className="space-y-4" noValidate>
          <div>
            <input
              type="text"
              name="reporter_name"
              placeholder="Nama pelapor"
              className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-emerald-400"
            />
            <FieldError message={state.errors?.reporter_name?.[0]} />
          </div>
          <div>
            <input
              type="text"
              name="location_text"
              placeholder="Lokasi sampah"
              className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-emerald-400"
            />
            <FieldError message={state.errors?.location_text?.[0]} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <select
                name="waste_type"
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
              <FieldError message={state.errors?.waste_type?.[0]} />
            </div>
            <div>
              <select
                name="urgency"
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
              <FieldError message={state.errors?.urgency?.[0]} />
            </div>
          </div>
          <div>
            <textarea
              name="description"
              rows={6}
              placeholder="Deskripsi laporan"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
            <FieldError message={state.errors?.description?.[0]} />
          </div>
          <div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full rounded-lg border border-gray-200 bg-white text-sm text-gray-500 file:mr-3 file:h-11 file:border-0 file:bg-emerald-50 file:px-4 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
            />
            <FieldError message={state.errors?.image?.[0]} />
          </div>
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
            <FieldError message={state.errors?.latitude?.[0] || state.errors?.longitude?.[0]} />
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold text-gray-700 sm:text-sm">Koordinat tersimpan</p>
            <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
              {coordinates.latitude && coordinates.longitude
                ? `${coordinates.latitude}, ${coordinates.longitude}`
                : "Belum ada koordinat"}
            </p>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="h-11 w-full rounded-lg bg-emerald-500 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Mengirim..." : "Kirim Laporan"}
          </button>
        </form>
      </div>
      <MobileBottomNav basePath="/user" active="report" />
    </PhoneShell>
  );
}
