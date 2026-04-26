export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy">
      <p className="font-display text-2xl text-offwhite mb-8">
        Preparing your journey...
      </p>
      <div className="w-64 h-1 rounded-full bg-white/10 overflow-hidden">
        <div className="loading-bar h-full w-full rounded-full" />
      </div>
    </div>
  );
}
