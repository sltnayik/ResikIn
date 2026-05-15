import AuthFormCard from "@/components/ui/auth-form-card";
import PhoneShell from "@/components/ui/phone-shell";

export default function UserRegisterPage() {
  return (
    <PhoneShell className="max-w-md">
      <AuthFormCard
        title="REGISTRASI"
        subtitle="Buat akun untuk memulai"
        buttonText="Buat Akun"
        footerText="Sudah memiliki akun?"
        footerLinkText="Login"
        footerLinkHref="/user/login"
        secondaryLinkText="Kembali ke pilihan login"
        secondaryLinkHref="/login"
        mode="register"
      />
    </PhoneShell>
  );
}
