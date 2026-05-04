"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase.js";

export async function createReport(formData) {
  const latitude = String(formData.get("latitude") || "").trim();
  const longitude = String(formData.get("longitude") || "").trim();

  const report = {
    reporter_name: String(formData.get("reporter_name") || "").trim(),
    location_text: String(formData.get("location_text") || "").trim(),
    waste_type: String(formData.get("waste_type") || "").trim(),
    urgency: String(formData.get("urgency") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    image_url: String(formData.get("image_url") || "").trim(),
    latitude: latitude ? Number(latitude) : null,
    longitude: longitude ? Number(longitude) : null,
  };

  const requiredFields = [
    "reporter_name",
    "location_text",
    "waste_type",
    "urgency",
    "description",
    "image_url",
  ];
  const hasEmptyField = requiredFields.some((field) => !report[field]);

  if (hasEmptyField) {
    return {
      success: false,
      message: "Semua field laporan wajib diisi.",
    };
  }

  if (Number.isNaN(report.latitude) || Number.isNaN(report.longitude)) {
    return {
      success: false,
      message: "Koordinat laporan tidak valid.",
    };
  }

  const { error } = await supabase.from("reports").insert(report);

  if (error) {
    return {
      success: false,
      message: error.message || "Laporan gagal dikirim.",
    };
  }

  revalidatePath("/user/dashboard");
  revalidatePath("/officer/reports");
  revalidatePath("/officer/dashboard");

  return {
    success: true,
    message: "Laporan berhasil dikirim.",
  };
}
