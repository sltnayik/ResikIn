"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function NavigationLink({ href, className = "", children, onClick }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  function handleClick(event) {
    onClick?.(event);

    if (event.defaultPrevented || href === pathname || href.startsWith("#")) {
      return;
    }

    setIsLoading(true);
  }

  return (
    <>
      {isLoading ? <LoadingSpinner fullscreen label="Membuka halaman" /> : null}
      <Link href={href} onClick={handleClick} className={className}>
        {children}
      </Link>
    </>
  );
}
