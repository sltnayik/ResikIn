import AppLogo from "@/components/common/app-logo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-10 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <AppLogo />
          <p className="mt-2 text-sm text-white/60">Solusi Bersih Untuk Negeri</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-white/75">
          <a href="#about" className="hover:text-white">
            Tentang
          </a>
          <a href="#fitur" className="hover:text-white">
            Fitur
          </a>
          <a href="#lapor" className="hover:text-white">
            Lapor
          </a>
        </div>
        <div className="flex gap-3 text-white/75">
          <span className="text-sm font-semibold">FB</span>
          <span className="text-sm font-semibold">IG</span>
        </div>
      </div>
    </footer>
  );
}
