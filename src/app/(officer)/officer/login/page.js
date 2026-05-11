import AuthFormCard from "@/components/ui/auth-form-card";
import PhoneShell from "@/components/ui/phone-shell";

export default function OfficerLoginPage() {
  return (
    <PhoneShell className="max-w-md">
      <AuthFormCard
        title="LOGIN"
        subtitle="Masuk sebagai petugas"
        fields={[
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
        buttonText="Login"
        footerText="Masuk sebagai masyarakat?"
        footerLinkText="Login warga"
        footerLinkHref="/user/login"
        secondaryLinkText="Kembali ke pilihan login"
        secondaryLinkHref="/login"
        role="officer"
      />
    </PhoneShell>
  );
}
