import AuthFormCard from "@/components/ui/auth-form-card";
import PhoneShell from "@/components/ui/phone-shell";

export default async function UserLoginPage({ searchParams }) {
  const params = await searchParams;
  const successMessage = params?.registered
    ? "Registrasi berhasil. Silakan login menggunakan email dan password Anda."
    : "";

  return (
    <PhoneShell className="max-w-md">
      <AuthFormCard
        title="LOGIN"
        subtitle="Masuk untuk mulai melaporkan"
        buttonText="Login"
        footerText="Belum memiliki akun?"
        footerLinkText="Register"
        footerLinkHref="/user/register"
        secondaryLinkText="Masuk sebagai petugas"
        secondaryLinkHref="/officer/login"
        successMessage={successMessage}
      />
    </PhoneShell>
  );
}
