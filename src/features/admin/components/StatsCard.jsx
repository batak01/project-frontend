export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div
      className="
        bg-white
        p-6
        rounded-2xl
        shadow
        border
        border-slate-100
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

          {subtitle && (
            <p className="text-green-600 text-sm mt-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}