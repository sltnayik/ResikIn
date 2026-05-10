"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import AppLogo from "@/components/common/app-logo";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function AuthFormCard({
  title,
  subtitle,
  fields,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkHref,
  secondaryLinkText,
  secondaryLinkHref,
  redirectHref = "/user/dashboard",
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const loginSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});
  
  function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    setErrors(result.error.flatten().fieldErrors);
    return;
  }

  setErrors({});
  setIsLoading(true);
    localStorage.setItem("resikin-session", "active");
    localStorage.setItem("resikin-role", redirectHref.startsWith("/officer") ? "officer" : "user");
    router.push(redirectHref);
  }

  return (
    <div className="leafy-bg flex min-h-[82vh] flex-col px-6 py-8 sm:px-8">
      {isLoading ? <LoadingSpinner fullscreen label="Masuk" /> : null}
      <div className="mb-8">
        <AppLogo />
      </div>
      <h1 className="mb-1 text-center text-[22px] font-bold tracking-tight text-gray-800">
        {title}
      </h1>
      <p className="mb-6 text-center text-xs text-gray-500">{subtitle}</p>
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        {fields.map((field) => (
  <div key={field.name}>
    <input
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-400"
    />

    {errors[field.name] && (
      <p className="mt-1 text-xs text-red-500">
        {errors[field.name][0]}
      </p>
    )}
  </div>
))}
        <button
          type="submit"
          disabled={isLoading}
          className="h-10 w-full rounded-lg bg-emerald-500 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {buttonText}
        </button>
      </form>
      <div className="mt-4 text-center text-xs text-gray-500">
        {footerText}{" "}
        <Link href={footerLinkHref} className="font-medium text-emerald-600">
          {footerLinkText}
        </Link>
      </div>
      {secondaryLinkText && secondaryLinkHref ? (
        <Link
          href={secondaryLinkHref}
          className="mt-3 text-center text-xs font-medium text-emerald-700 hover:text-emerald-800"
        >
          {secondaryLinkText}
        </Link>
      ) : null}
      <div className="mt-auto pt-8 text-center text-[11px] text-gray-400">
        ResikIn App
      </div>
    </div>
  );
}
