"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase.js";
import { reportSchema } from "@/lib/validation";

const initialActionState = {
  success: false,
  message: "",
  errors: {},
};

export async function createReport(_previousState = initialActionState, formData) {
  const validation = reportSchema.safeParse({
    reporter_name: formData.get("reporter_name"),
    location_text: formData.get("location_text"),
    waste_type: formData.get("waste_type"),
    urgency: formData.get("urgency"),
    description: formData.get("description"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    image: formData.get("image"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: "Periksa kembali data laporan.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { image, ...reportFields } = validation.data;
  const extension = image.name.split(".").pop() || "jpg";
  const filePath = `reports/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("report-images")
    .upload(filePath, image, {
      contentType: image.type || "image/jpeg",
      upsert: false,
    });

  if (uploadError) {
    return {
      success: false,
      message: uploadError.message || "Foto laporan gagal diunggah.",
      errors: {},
    };
  }

  const { data: publicUrlData } = supabase.storage
    .from("report-images")
    .getPublicUrl(filePath);

  const report = {
    ...reportFields,
    image_url: publicUrlData.publicUrl,
  };

  const { error } = await supabase.from("reports").insert(report);

  if (error) {
    return {
      success: false,
      message: error.message || "Laporan gagal dikirim.",
      errors: {},
    };
  }

  revalidatePath("/user/dashboard");
  revalidatePath("/user/history");
  revalidatePath("/officer/reports");
  revalidatePath("/officer/dashboard");

  return {
    success: true,
    message: "Laporan berhasil dikirim.",
    errors: {},
  };
}

export async function deleteReportAction(id) {
  const { error } = await supabase.from("reports").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message || "Laporan gagal dihapus.",
    };
  }

  revalidatePath("/user/dashboard");
  revalidatePath("/user/history");
  revalidatePath("/officer/dashboard");
  revalidatePath("/officer/reports");

  return {
    success: true,
    message: "Laporan berhasil dihapus.",
  };
}
