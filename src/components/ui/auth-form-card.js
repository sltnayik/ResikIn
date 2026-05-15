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

export default function AuthFormCard({ title, subtitle, buttonText, footerText, footerLinkText, footerLinkHref, secondaryLinkText, secondaryLinkHref, mode = "login", successMessage = "" }) {
  const action = mode === "register" ? registerAction : loginAction;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const isRegister = mode === "register";

  useEffect(() => {
    if (!state.message) return;

    toast.error(state.message);
  }, [state.message]);

  const hasEmailError = Boolean(state.errors?.email?.[0]);
  const hasPasswordError = Boolean(state.errors?.password?.[0]);
  const hasNameError = Boolean(state.errors?.nama_lengkap?.[0]);

  return (
    <div className="leafy-bg flex min-h-[82vh] flex-col px-6 py-8 sm:px-8">
      {isPending ? <LoadingSpinner fullscreen label={isRegister ? "Membuat akun" : "Masuk"} /> : null}
      <div className="mx-auto w-full max-w-md rounded-4xl border border-gray-200 bg-white/95 p-8 shadow-2xl shadow-emerald-100/50 backdrop-blur-sm transition">
        <div className="mb-8 text-center">
          <AppLogo />
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-gray-500">{subtitle}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
        </div>
        {successMessage ? <div className="mb-4 rounded-3xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm">{successMessage}</div> : null}
        {state.message ? <div className="mb-4 rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-sm">{state.message}</div> : null}
        <form action={formAction} className="space-y-5" noValidate>
          {isRegister ? (
            <div>
              <label htmlFor="nama_lengkap" className="mb-2 block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                id="nama_lengkap"
                type="text"
                name="nama_lengkap"
                required
                placeholder="Masukkan nama lengkap"
                autoComplete="name"
                aria-invalid={hasNameError}
                className={`h-12 w-full rounded-3xl border px-4 text-sm transition outline-none focus:ring-2 focus:ring-emerald-200 ${
                  hasNameError ? "border-red-300 focus:border-red-500" : "border-gray-200 bg-white focus:border-emerald-400"
                }`}
              />
              <FieldError message={state.errors?.nama_lengkap?.[0]} />
            </div>
          ) : null}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="email@domain.com"
              autoComplete="email"
              aria-invalid={hasEmailError}
              className={`h-12 w-full rounded-3xl border px-4 text-sm transition outline-none focus:ring-2 focus:ring-emerald-200 ${
                hasEmailError ? "border-red-300 focus:border-red-500" : "border-gray-200 bg-white focus:border-emerald-400"
              }`}
            />
            {isRegister ? <p className="mt-2 text-[11px] text-gray-500">Gunakan email aktif untuk menerima tautan verifikasi.</p> : null}
            <FieldError message={state.errors?.email?.[0]} />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              placeholder="Minimal 8 karakter"
              autoComplete={isRegister ? "new-password" : "current-password"}
              aria-invalid={hasPasswordError}
              className={`h-12 w-full rounded-3xl border px-4 text-sm transition outline-none focus:ring-2 focus:ring-emerald-200 ${
                hasPasswordError ? "border-red-300 focus:border-red-500" : "border-gray-200 bg-white focus:border-emerald-400"
              }`}
            />
            {isRegister ? <p className="mt-2 text-[11px] text-gray-500">Password minimal 8 karakter, kombinasi huruf dan angka.</p> : null}
            <FieldError message={state.errors?.password?.[0]} />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="flex h-12 w-full items-center justify-center rounded-3xl bg-emerald-500 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Memproses..." : buttonText}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          {footerText}{" "}
          <Link href={footerLinkHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
            {footerLinkText}
          </Link>
        </div>
        {secondaryLinkText && secondaryLinkHref ? (
          <div className="mt-3 text-center text-sm">
            <Link href={secondaryLinkHref} className="font-semibold text-emerald-700 hover:text-emerald-800">
              {secondaryLinkText}
            </Link>
          </div>
        ) : null}
        <div className="mt-8 rounded-3xl border border-gray-100 bg-gray-50 px-4 py-3 text-center text-[11px] text-gray-400">ResikIn App</div>
      </div>
    </div>
  );
}
