import AppLogo from "@/components/common/app-logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#top" aria-label="ResikIn home" className="group transition">
          <AppLogo />
        </a>

        <nav className="flex items-center gap-1 text-sm font-semibold text-slate-700 sm:gap-2">
          <a href="#about" className="hidden px-3 py-2 rounded-lg transition hover:text-emerald-700 hover:bg-emerald-50/50 md:inline">
            Tentang
          </a>
          <a href="#fitur" className="hidden px-3 py-2 rounded-lg transition hover:text-emerald-700 hover:bg-emerald-50/50 md:inline">
            Fitur
          </a>
          <a href="#lapor" className="hidden px-3 py-2 rounded-lg transition hover:text-emerald-700 hover:bg-emerald-50/50 sm:inline">
            Lapor
          </a>
          <a
            href="/login"
            className="ml-2 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-2 text-white font-bold shadow-md shadow-emerald-600/30 transition duration-300 hover:shadow-lg hover:shadow-emerald-600/40 hover:-translate-y-0.5"
          >
            Masuk
          </a>
        </nav>
      </div>
    </header>
  );
}
