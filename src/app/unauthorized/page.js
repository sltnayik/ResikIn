import Link from "next/link";
import LogoutButton from "@/components/ui/logout-button";
import PhoneShell from "@/components/ui/phone-shell";

export default function UnauthorizedPage() {
  return (
    <PhoneShell className="max-w-md">
      <main className="leafy-bg flex min-h-[82vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
          Akses Ditolak
        </p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">Role tidak sesuai</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Akun yang sedang login tidak memiliki izin untuk membuka halaman ini.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/login"
            className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Ke dashboard saya
          </Link>
          <LogoutButton className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600" />
        </div>
      </main>
    </PhoneShell>
  );
}
