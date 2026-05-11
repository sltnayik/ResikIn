import Link from "next/link";
import AppLogo from "@/components/common/app-logo";
import PhoneShell from "@/components/ui/phone-shell";
import { HiClipboardList, HiUser } from "react-icons/hi";

const roles = [
  {
    title: "Masyarakat",
    desc: "Masuk untuk membuat laporan dan memantau status penanganan.",
    href: "/user/login",
    email: "user@gmail.com",
    password: "user123",
    icon: HiUser,
    button: "Login Warga",
  },
  {
    title: "Petugas",
    desc: "Masuk untuk melihat laporan masuk dan mengelola tindak lanjut.",
    href: "/officer/login",
    email: "officer@gmail.com",
    password: "officer123",
    icon: HiClipboardList,
    button: "Login Petugas",
  },
];

export default function LoginChoicePage() {
  return (
    <PhoneShell className="max-w-3xl">
      <div className="leafy-bg min-h-[82vh] px-6 py-8 sm:px-8">
        <AppLogo />

        <div className="mx-auto mt-8 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Pilihan Login
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Masuk sebagai siapa?
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Pilih peran sesuai kebutuhan untuk masuk ke halaman yang tepat.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
          {roles.map((role) => (
            <Link
              key={role.title}
              href={role.href}
              className="group flex min-h-64 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                <role.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-lg font-bold text-gray-900">{role.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">{role.desc}</p>
              <div className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs leading-5 text-emerald-800">
                <p>Email: {role.email}</p>
                <p>Password: {role.password}</p>
              </div>
              <span className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-white transition group-hover:bg-emerald-600">
                {role.button}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs font-medium text-gray-500 hover:text-emerald-700">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}
