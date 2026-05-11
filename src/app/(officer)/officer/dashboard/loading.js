export default function OfficerDashboardLoading() {
  return (
    <div className="animate-pulse p-6">
      <div className="mb-6 h-8 w-48 rounded-md bg-gray-200" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="h-24 rounded-lg bg-gray-100" />
        <div className="h-24 rounded-lg bg-gray-100" />
        <div className="h-24 rounded-lg bg-gray-100" />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="h-56 rounded-xl bg-gray-100" />
        <div className="h-56 rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}
