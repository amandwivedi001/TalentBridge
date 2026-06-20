function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-32 rounded-3xl bg-slate-200 animate-pulse" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-36
              rounded-3xl
              bg-slate-200
              animate-pulse
            "
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;