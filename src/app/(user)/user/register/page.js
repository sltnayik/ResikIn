import AuthFormCard from "@/components/ui/auth-form-card";
import PhoneShell from "@/components/ui/phone-shell";

export default function UserRegisterPage() {
  return (
    <PhoneShell className="max-w-md">
      <AuthFormCard
        title="REGISTRASI"
        subtitle="Buat akun untuk memulai"
        fields={[
          { name: "name", type: "text", placeholder: "Nama Lengkap" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
        buttonText="Buat Akun"
        footerText="Sudah memiliki akun?"
        footerLinkText="Login"
        footerLinkHref="/user/login"
        redirectHref="/user/dashboard"
      />
    </PhoneShell>
  );
}
