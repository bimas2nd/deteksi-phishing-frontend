// src/components/ResultCardSkeleton.js (Kode Perbaikan)

export default function ResultCardSkeleton() {
  return (
    <div className="relative mt-6 w-full overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/30 p-6 backdrop-blur-sm animate-pulse">
      <div className="flex flex-col items-center gap-3 text-center">
        {/* Placeholder untuk Ikon */}
        <div className="h-10 w-10 rounded-full bg-slate-700"></div>
        {/* Placeholder untuk Judul */}
        <div className="h-7 w-3/5 rounded-md bg-slate-700"></div>
        {/* Placeholder untuk Pesan */}
        <div className="h-4 w-4/5 rounded-md bg-slate-700"></div>
        <div className="h-4 w-3/5 rounded-md bg-slate-700"></div>
      </div>
    </div>
  );
}