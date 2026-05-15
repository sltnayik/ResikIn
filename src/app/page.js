"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { HiDocumentText, HiMapPin, HiUser, HiChartBar, HiCog, HiBolt } from "react-icons/hi2";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: HiDocumentText,
      title: "Form Laporan Mudah",
      desc: "Isi ringkasan, lokasi, deskripsi, dan foto pendukung dalam satu alur.",
    },
    {
      icon: HiMapPin,
      title: "Lokasi Lebih Jelas",
      desc: "Bantu petugas memahami titik laporan agar penanganan lebih cepat.",
    },
    {
      icon: HiUser,
      title: "Akun Pengguna",
      desc: "Autentikasi Supabase menjaga laporan terhubung ke akun warga yang benar.",
    },
    {
      icon: HiChartBar,
      title: "Dashboard Petugas",
      desc: "Laporan dapat dilihat, dipilah, dan ditindaklanjuti dari dashboard.",
    },
  ];

  const workflow = [
    ["1", "Isi Preview", "Warga mengisi gambaran laporan dari landing page."],
    ["2", "Masuk Akun", "Pengguna diarahkan ke login sederhana sebelum lanjut."],
    ["3", "Buat Laporan", "Detail laporan dilengkapi di halaman aplikasi utama."],
    ["4", "Pantau Status", "Progres laporan dapat dilihat melalui dashboard."],
  ];

  function handlePreviewSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#f6fbf7] text-slate-800">
      {isLoading ? <LoadingSpinner fullscreen label="Membuka pilihan login" /> : null}
      <Navbar />

      <section id="top" className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-200 opacity-10 blur-3xl"></div>
        </div>
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 shadow-sm">
              ✨ Platform Digital Terpadu
            </span>
            <h1 className="max-w-3xl bg-gradient-to-r from-slate-950 via-emerald-900 to-slate-900 bg-clip-text text-5xl font-black leading-tight text-transparent sm:text-6xl lg:text-7xl">Lingkungan Bersih Dimulai dari Sini</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              ResikIn adalah platform pelaporan sampah yang membuat penanganan limbah lebih cepat, transparan, dan terukur. Dari laporan hingga tindakan nyata, semua dalam satu ekosistem.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#lapor"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-600/40 transition duration-300 hover:shadow-xl hover:shadow-emerald-600/60 hover:-translate-y-1"
              >
                Laporkan Sekarang
                <span aria-hidden="true" className="transition group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a href="#fitur" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 px-8 py-4 font-bold text-emerald-700 transition duration-300 hover:bg-emerald-50 hover:border-emerald-700">
                Pelajari Lebih Lanjut
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
              {[
                ["500+", "Laporan Aktif"],
                ["98%", "Tingkat Kepuasan"],
                ["24/7", "Layanan Tersedia"],
              ].map(([value, label]) => (
                <div key={label} className="group rounded-2xl border border-emerald-200 bg-white/80 backdrop-blur p-5 shadow-sm transition hover:shadow-md hover:border-emerald-400">
                  <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{value}</div>
                  <div className="mt-2 text-sm font-semibold text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-blue-400/20 blur-2xl"></div>
            <Image
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80"
              alt="Kegiatan membersihkan lingkungan"
              width={900}
              height={720}
              className="relative h-full min-h-[420px] w-full rounded-3xl object-cover shadow-2xl shadow-emerald-900/20 ring-1 ring-white/50"
            />
          </div>
        </div>
      </section>

      <section id="about" className="relative py-20 sm:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Tentang ResikIn</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">Solusi Komprehensif untuk Pengelolaan Sampah</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              ResikIn menghubungkan warga yang peduli dengan petugas penanganan sampah. Melalui alur yang simpel namun powerful, kami menciptakan transparansi penuh dalam setiap laporan.
            </p>
          </div>
          <div className="space-y-4">
            {[
              ["Untuk Warga", "Laporkan masalah sampah dengan mudah dari mana saja. Form sederhana dengan lokasi presisi membuat laporan Anda sampai ke tangan yang tepat."],
              ["Untuk Petugas", "Dashboard terpusat untuk mengelola semua laporan. Prioritas otomatis, tracking real-time, dan data analytics untuk efisiensi maksimal."],
            ].map(([title, desc]) => (
              <div key={title} className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/50 p-7 shadow-sm transition duration-300 hover:shadow-lg hover:border-emerald-300">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">{title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fitur" className="relative bg-gradient-to-b from-white to-emerald-50/30 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Fitur Unggulan</p>
            <h2 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">Teknologi Terdepan untuk Transparansi Maksimal</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Setiap fitur dirancang untuk memberikan pengalaman terbaik bagi pengguna dan efisiensi maksimal bagi operator.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
              return (
                <article key={item.title} className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-xl hover:border-emerald-300 hover:-translate-y-2">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-600/0 to-emerald-600/0 opacity-0 transition group-hover:opacity-5"></div>
                  <div className="relative z-10">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 group-hover:from-emerald-200 group-hover:to-teal-200 transition">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition">{item.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Proses Kerja</p>
            <h2 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">Alur Sederhana, Hasil Maksimal</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Dari laporan pertama hingga resolusi, semuanya berjalan dengan lancar dan transparan.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map(([step, title, desc], idx) => (
              <div key={step} className="relative">
                {idx < workflow.length - 1 && (
                  <div className="absolute -right-3 top-8 hidden w-6 lg:block">
                    <svg className="h-6 w-full text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
                <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-white to-emerald-50/50 p-8 shadow-sm transition duration-300 hover:shadow-lg hover:border-emerald-400 group">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-lg font-black text-white group-hover:shadow-lg group-hover:shadow-emerald-600/50 transition">
                    {step}
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lapor" className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Mulai Laporan Anda</p>
            <h2 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">Buat Perubahan Mulai Sekarang</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Form inisial ini adalah entry point yang user-friendly. Lengkapi data Anda, lalu masuk untuk menyelesaikan laporan dengan detail penuh dan tracking real-time.</p>
            <div className="mt-8 space-y-3">
              {[
                { icon: HiCog, text: "Data tersimpan aman di Supabase" },
                { icon: HiBolt, text: "Proses verifikasi otomatis dan cepat" },
                { icon: HiMapPin, text: "Geo-location akurat untuk targeting tepat" },
              ].map(({ icon: Icon, text }, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-700">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handlePreviewSubmit} className="rounded-3xl border border-white/60 bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 p-8 shadow-2xl shadow-emerald-900/10 backdrop-blur-sm md:p-10">
            <h3 className="text-2xl font-bold text-slate-900">Laporan Cepat</h3>
            <p className="mt-1 text-sm text-slate-600">Isi form ini untuk memulai. Detail lengkap bisa dilengkapi setelah login.</p>

            <div className="mt-8 space-y-6">
              <label className="block">
                <span className="block text-sm font-bold text-slate-900 mb-2">Judul Laporan</span>
                <input
                  type="text"
                  placeholder="Contoh: Sampah menumpuk di jalan utama"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-bold text-slate-900 mb-2">Lokasi</span>
                <input
                  type="text"
                  placeholder="Contoh: Jalan Melati No. 45, Jakarta Selatan"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-bold text-slate-900 mb-2">Deskripsi Singkat</span>
                <textarea
                  rows={4}
                  placeholder="Jelaskan kondisi sampah dan dampaknya terhadap lingkungan sekitar..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                />
              </label>

              <div>
                <span className="block text-sm font-bold text-slate-900 mb-3">Unggah Foto (Opsional)</span>
                <div className="relative rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-emerald-50/30 p-8 text-center transition hover:border-emerald-400 hover:bg-emerald-50/20 cursor-pointer group">
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition">Klik atau seret foto ke sini</p>
                  <p className="text-xs text-slate-500">PNG, JPG hingga 10MB</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group w-full inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 font-bold text-white shadow-lg shadow-emerald-600/40 transition duration-300 hover:shadow-xl hover:shadow-emerald-600/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                {isLoading ? "Memproses..." : "Lanjut ke Login"}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
