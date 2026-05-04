export default function LoadingSpinner({ fullscreen = false, label = "Memuat" }) {
  const spinner = (
    <div
      role="status"
      aria-label={label}
      className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600"
    />
  );

  if (!fullscreen) {
    return spinner;
  }

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-white/70 backdrop-blur-sm">
      {spinner}
    </div>
  );
}
