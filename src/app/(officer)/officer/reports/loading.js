export default function OfficerReportsLoading() {
  return (
    <div className="animate-pulse p-6">
      <div className="mb-4 h-10 w-full rounded-md bg-gray-100" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-64 rounded-xl bg-gray-100" />
        <div className="h-64 rounded-xl bg-gray-100" />
        <div className="h-64 rounded-xl bg-gray-100" />
        <div className="h-64 rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}
