"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { reportSchema } from "@/lib/validation";

const initialActionState = {
  success: false,
  message: "",
  errors: {},
};

export async function createReport(_previousState = initialActionState, formData) {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || !userId) {
    return {
      success: false,
      message: "Session tidak valid. Silakan login ulang.",
      errors: {},
    };
  }

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
  const filePath = `reports/${userId}/${crypto.randomUUID()}.${extension}`;

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

  const report = {
    ...reportFields,
    reporter_id: userId,
    image_path: filePath,
  };

  const { error } = await supabase.from("reports").insert(report);

  if (error) {
    await supabase.storage.from("report-images").remove([filePath]);

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
  const supabase = await createClient();
  const { data: report } = await supabase
    .from("reports")
    .select("image_path")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("reports").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message || "Laporan gagal dihapus.",
    };
  }

  if (report?.image_path) {
    await supabase.storage.from("report-images").remove([report.image_path]);
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
