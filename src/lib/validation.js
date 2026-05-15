import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email wajib diisi.").email("Format email tidak valid."),
  password: z.string().min(1, "Password wajib diisi."),
});

export const registerSchema = z.object({
  nama_lengkap: z
    .string()
    .trim()
    .min(3, "Nama lengkap minimal 3 karakter.")
    .max(120, "Nama lengkap terlalu panjang."),
  email: z.string().trim().min(1, "Email wajib diisi.").email("Format email tidak valid."),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter.")
    .regex(/[A-Za-z]/, "Password harus memiliki huruf.")
    .regex(/[0-9]/, "Password harus memiliki angka."),
});

const coordinateSchema = (fieldName) =>
  z.preprocess(
    (value) => (value === "" || value === null ? undefined : Number(value)),
    z
      .number({ message: `${fieldName} wajib dipilih dari map.` })
      .min(fieldName === "Latitude" ? -90 : -180, `${fieldName} tidak valid.`)
      .max(fieldName === "Latitude" ? 90 : 180, `${fieldName} tidak valid.`)
  );

export const reportSchema = z.object({
  reporter_name: z.string().trim().min(1, "Nama pelapor wajib diisi."),
  location_text: z.string().trim().min(1, "Lokasi sampah wajib diisi."),
  waste_type: z.enum(["Organik", "Anorganik", "B3", "Campuran"], {
    message: "Jenis sampah wajib dipilih.",
  }),
  urgency: z.enum(["Rendah", "Sedang", "Tinggi"], {
    message: "Tingkat urgensi wajib dipilih.",
  }),
  description: z
    .string()
    .trim()
    .min(10, "Deskripsi minimal 10 karakter agar laporan jelas."),
  latitude: coordinateSchema("Latitude"),
  longitude: coordinateSchema("Longitude"),
  image: z
    .custom((file) => file && typeof file === "object" && file.size > 0, {
      message: "Foto laporan wajib diunggah.",
    })
    .refine((file) => file?.type?.startsWith("image/"), {
      message: "File harus berupa gambar.",
    }),
});
