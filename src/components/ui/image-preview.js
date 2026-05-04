/* eslint-disable @next/next/no-img-element */

export default function ImagePreview({ previewUrl }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50">
      {previewUrl ? (
        <img src={previewUrl} alt="Preview foto laporan" className="h-full min-h-56 w-full object-cover" />
      ) : (
        <div className="grid h-full min-h-56 place-items-center">
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-bold text-gray-400">
              IMG
            </div>
            <div className="mt-2 text-xs text-gray-500 sm:text-sm">Pilih foto untuk melihat preview</div>
          </div>
        </div>
      )}
    </div>
  );
}
