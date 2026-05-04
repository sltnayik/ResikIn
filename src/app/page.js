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
      desc: "Simulasi akun membuat flow pelaporan terasa lebih nyata dan terarah.",
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

      <section id="top" className="overflow-hidden bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-18 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">Platform Pelaporan Sampah Digital</span>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">ResikIn membantu menjaga lingkungan lebih bersih, cepat, dan transparan.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Laporkan kejadian sampah dengan mudah: kirim judul, deskripsi, lokasi, dan foto. Pantau proses penanganan hingga selesai dalam satu platform.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#lapor" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-700">
                Laporkan Sekarang
                <span aria-hidden="true">-&gt;</span>
              </a>
              <a href="#fitur" className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50">
                Jelajahi Fitur
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["500+", "Laporan simulasi"],
                ["98%", "Flow dipahami"],
                ["24/7", "Entry point"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-emerald-100 bg-[#f8fcf8] p-4">
                  <div className="text-2xl font-bold text-emerald-700">{value}</div>
                  <div className="mt-1 text-xs text-slate-500 sm:text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80"
              alt="Kegiatan membersihkan lingkungan"
              width={900}
              height={720}
              className="h-full min-h-[420px] w-full rounded-[2rem] object-cover shadow-2xl shadow-slate-900/15"
            />
          </div>
        </div>
      </section>

      <section id="about" className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Tentang ResikIn</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">Satu alur sederhana untuk menghubungkan warga dan petugas.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Untuk Warga", "Mulai laporan dari mana saja, lalu lanjutkan detailnya setelah login simulasi."],
              ["Untuk Petugas", "Pantau laporan masuk melalui halaman dashboard dan daftar laporan."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fitur" className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Fitur Utama</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">Dibuat ringan untuk demonstrasi aplikasi ResikIn.</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-950 sm:text-4xl">Cara Kerja ResikIn</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map(([step, title, desc]) => (
              <div key={step} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-600 text-sm font-bold text-white">{step}</span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lapor" className="bg-emerald-950 py-16 text-white sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Preview Laporan</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Isi ringkasan awal, lalu login untuk melanjutkan.</h2>
            <p className="mt-4 leading-7 text-emerald-50/80">Form ini hanya entry point. Saat tombol Kirim Laporan ditekan, pengguna diarahkan ke halaman login, bukan mengirim data final.</p>
            <div className="mt-7 grid gap-3 text-sm text-emerald-50/90 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-300 text-emerald-950">
                  <HiCog className="h-3 w-3" />
                </span>
                Simulasi tanpa backend
              </div>
              <div className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-300 text-emerald-950">
                  <HiBolt className="h-3 w-3" />
                </span>
                Flow lebih natural
              </div>
            </div>
          </div>

          <form onSubmit={handlePreviewSubmit} className="grid gap-4 rounded-3xl border border-white/10 bg-white p-5 text-slate-900 shadow-2xl sm:p-6 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Judul Laporan</span>
              <input type="text" placeholder="Contoh: Sampah menumpuk di jalan" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-500" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Lokasi</span>
              <input type="text" placeholder="Contoh: Jl. Melati, Jakarta" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-500" />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Deskripsi</span>
              <textarea rows={4} placeholder="Tuliskan kondisi singkat laporan..." className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-emerald-500" />
            </label>
            <div className="grid min-h-32 place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center md:col-span-2">
              <div>
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-bold text-slate-400">IMG</div>
                <p className="mt-2 text-sm font-medium text-slate-600">Preview upload foto</p>
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2">
              Kirim Laporan
              <span aria-hidden="true">-&gt;</span>
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
