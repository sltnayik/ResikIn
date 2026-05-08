export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-6 w-full animate-pulse">
      {/* Skeleton untuk Header/Judul */}
      <div className="h-10 w-48 bg-gray-200 rounded-md mb-4"></div>

      {/* Barisan Card Laporan Palsu */}
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}