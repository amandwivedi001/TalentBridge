import { Bell } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-20
        border-b
        border-slate-400
        bg-white/95
        backdrop-blur
      "
    >
      <div className="flex h-full items-center justify-end px-8">
        <div className="flex items-center gap-4">
          <button className="relative rounded-xl p-2 transition hover:bg-slate-100">
            <Bell size={20} className="text-slate-700" />

            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="h-8 w-px bg-slate-200" />

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                text-sm
                font-semibold
                text-white
              "
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500">
                Student
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;