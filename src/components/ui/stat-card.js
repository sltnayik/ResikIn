export default function StatCard({ label, value }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-[11px] uppercase tracking-[0.3em] text-gray-500 sm:text-xs">{label}</div>
      <div className="mt-4 text-3xl font-semibold text-gray-900 sm:text-4xl">{value}</div>
    </div>
  );
}
