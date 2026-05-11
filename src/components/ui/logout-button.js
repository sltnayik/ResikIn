import { logoutAction } from "@/app/auth-actions";

export default function LogoutButton({ className = "" }) {
  return (
    <form action={logoutAction}>
      <button type="submit" className={className}>
        Logout
      </button>
    </form>
  );
}
