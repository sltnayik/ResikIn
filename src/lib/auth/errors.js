export function getAuthErrorMessage(error) {
  const message = String(error?.message || "").toLowerCase();

  if (message.includes("already registered") || message.includes("already exists")) {
    return "Email sudah digunakan. Silakan login atau gunakan email lain.";
  }

  if (message.includes("password") && (message.includes("weak") || message.includes("short"))) {
    return "Password terlalu lemah. Gunakan minimal 8 karakter dengan huruf dan angka.";
  }

  if (message.includes("email not confirmed")) {
    return "Email belum dikonfirmasi. Cek inbox Anda atau hubungi admin.";
  }

  if (message.includes("invalid login") || message.includes("invalid credentials")) {
    return "Email atau password tidak valid.";
  }

  if (message.includes("rate limit")) {
    return "Terlalu banyak percobaan. Coba lagi beberapa saat.";
  }

  return error?.message || "Terjadi kesalahan autentikasi.";
}
