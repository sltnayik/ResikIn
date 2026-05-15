import AuthFormCard from "@/components/ui/auth-form-card";
import PhoneShell from "@/components/ui/phone-shell";

export default function OfficerLoginPage() {
  return (
    <PhoneShell className="max-w-md">
      <AuthFormCard
        title="LOGIN"
        subtitle="Masuk sebagai petugas"
        buttonText="Login"
        footerText="Masuk sebagai masyarakat?"
        footerLinkText="Login warga"
        footerLinkHref="/user/login"
        secondaryLinkText="Kembali ke pilihan login"
        secondaryLinkHref="/login"
      />
    </PhoneShell>
  );
}
