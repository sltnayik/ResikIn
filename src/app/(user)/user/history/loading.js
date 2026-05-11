export default function UserHistoryLoading() {
  return (
    <div className="animate-pulse p-6">
      <div className="mb-6 h-8 w-52 rounded-md bg-gray-200" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-56 rounded-xl bg-gray-100" />
        <div className="h-56 rounded-xl bg-gray-100" />
        <div className="h-56 rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}
