import AuthFormCard from "@/components/ui/auth-form-card";
import PhoneShell from "@/components/ui/phone-shell";

export default function UserLoginPage() {
  return (
    <PhoneShell className="max-w-md">
      <AuthFormCard
        title="LOGIN"
        subtitle="Masuk untuk mulai melaporkan"
        fields={[
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
        buttonText="Login"
        footerText="Belum memiliki akun?"
        footerLinkText="Register"
        footerLinkHref="/user/register"
        secondaryLinkText="Masuk sebagai petugas"
        secondaryLinkHref="/officer/login"
        role="user"
      />
    </PhoneShell>
  );
}
