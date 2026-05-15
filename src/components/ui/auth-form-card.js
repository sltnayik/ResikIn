"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import AppLogo from "@/components/common/app-logo";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { loginAction, registerAction } from "@/app/auth-actions";

const initialState = {
  success: false,
  message: "",
  errors: {},
};

function FieldError({ message }) {
  if (!message) return null;

  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

export default function AuthFormCard({
  title,
  subtitle,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkHref,
  secondaryLinkText,
  secondaryLinkHref,
  mode = "login",
  successMessage = "",
}) {
  const action = mode === "register" ? registerAction : loginAction;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const isRegister = mode === "register";

  useEffect(() => {
    if (!state.message) return;

    toast.error(state.message);
  }, [state.message]);

  return (
    <div className="leafy-bg flex min-h-[82vh] flex-col px-6 py-8 sm:px-8">
      {isPending ? (
        <LoadingSpinner fullscreen label={isRegister ? "Membuat akun" : "Masuk"} />
      ) : null}
      <div className="mb-8">
        <AppLogo />
      </div>
      <h1 className="mb-1 text-center text-[22px] font-bold tracking-tight text-gray-800">
        {title}
      </h1>
      <p className="mb-6 text-center text-xs text-gray-500">{subtitle}</p>
      {successMessage ? (
        <p className="mb-4 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          {successMessage}
        </p>
      ) : null}
      {state.message ? (
        <p className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          {state.message}
        </p>
      ) : null}
      <form action={formAction} className="space-y-3" noValidate>
        {isRegister ? (
          <div>
            <input
              type="text"
              name="nama_lengkap"
              placeholder="Nama lengkap"
              autoComplete="name"
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-400"
            />
            <FieldError message={state.errors?.nama_lengkap?.[0]} />
          </div>
        ) : null}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-400"
          />
          <FieldError message={state.errors?.email?.[0]} />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-400"
          />
          <FieldError message={state.errors?.password?.[0]} />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="h-10 w-full rounded-lg bg-emerald-500 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Memproses..." : buttonText}
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
      <div className="mt-auto pt-8 text-center text-[11px] text-gray-400">ResikIn App</div>
    </div>
  );
}
