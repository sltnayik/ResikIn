"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function LogoutButton({ className = "" }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleLogout() {
    setIsLoading(true);
    localStorage.removeItem("resikin-session");
    localStorage.removeItem("resikin-role");
    router.push("/login");
  }

  return (
    <>
      {isLoading ? <LoadingSpinner fullscreen label="Keluar" /> : null}
      <button type="button" onClick={handleLogout} className={className}>
        Logout
      </button>
    </>
  );
}
