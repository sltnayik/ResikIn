import AppLogo from "@/components/common/app-logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200/50 bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <AppLogo />
            <p className="mt-3 text-sm font-medium text-slate-600">Solusi Digital untuk Lingkungan Bersih</p>
            <p className="mt-4 text-xs text-slate-500">© 2026 ResikIn. Semua hak dilindungi.</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Navigasi</h4>
            <div className="space-y-2 text-sm">
              <a href="#about" className="block text-slate-600 transition hover:text-emerald-700 hover:translate-x-1">
                Tentang ResikIn
              </a>
              <a href="#fitur" className="block text-slate-600 transition hover:text-emerald-700 hover:translate-x-1">
                Fitur Utama
              </a>
              <a href="#lapor" className="block text-slate-600 transition hover:text-emerald-700 hover:translate-x-1">
                Mulai Lapor
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Bantuan</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-slate-600 transition hover:text-emerald-700 hover:translate-x-1">
                Panduan Pengguna
              </a>
              <a href="#" className="block text-slate-600 transition hover:text-emerald-700 hover:translate-x-1">
                FAQ
              </a>
              <a href="#" className="block text-slate-600 transition hover:text-emerald-700 hover:translate-x-1">
                Hubungi Kami
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Ikuti Kami</h4>
            <div className="flex gap-3">
              <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-700">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-700">
                <span className="text-sm font-bold">IG</span>
              </a>
              <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-700">
                <span className="text-sm font-bold">𝕏</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-600 sm:flex-row sm:text-left">
            <p>Bergabunglah dengan ribuan pengguna yang peduli lingkungan</p>
            <a href="#lapor" className="font-semibold text-emerald-700 transition hover:text-emerald-800">
              Mulai sekarang →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
