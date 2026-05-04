import AppLogo from "@/components/common/app-logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#top" aria-label="ResikIn home">
          <AppLogo />
        </a>

        <nav className="flex items-center gap-2 text-sm font-medium text-slate-600 sm:gap-5">
          <a href="#about" className="hidden hover:text-emerald-700 md:inline">
            Tentang
          </a>
          <a href="#fitur" className="hidden hover:text-emerald-700 md:inline">
            Fitur
          </a>
          <a href="#lapor" className="hidden hover:text-emerald-700 sm:inline">
            Lapor
          </a>
          <a
            href="/login"
            className="rounded-full bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:bg-emerald-700 sm:px-5"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
