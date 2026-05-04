export default function PhoneShell({ children, className = "" }) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <section
        className={`mx-auto min-h-[82vh] w-full overflow-hidden rounded-2xl border border-[#dfe8df] bg-white shadow-[0_20px_60px_-30px_rgba(17,24,39,.35)] ${className}`}
      >
        {children}
      </section>
    </main>
  );
}
