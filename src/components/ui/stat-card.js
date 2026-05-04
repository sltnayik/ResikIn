export default function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
      <div className="text-[11px] text-gray-500 sm:text-sm">{label}</div>
      <div className="mt-1 text-lg font-semibold text-gray-800 sm:text-2xl">{value}</div>
    </div>
  );
}
