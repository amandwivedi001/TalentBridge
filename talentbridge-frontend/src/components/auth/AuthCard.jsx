import { BriefcaseBusiness } from "lucide-react";

function AuthCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div
      className="
        w-full
        max-w-md
        rounded-4xl
        border
        border-slate-100
        bg-white
        p-8
        sm:p-12
        shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]
      "
    >
      <div className="mb-8 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
          <BriefcaseBusiness size={28} />
        </div>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-slate-500 font-medium">
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  );
}

export default AuthCard;