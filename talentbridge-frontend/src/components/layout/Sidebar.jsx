import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Brain,
  Bell,
  LogOut,
  Settings,
  HelpCircle,
  Zap,
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const mainLinks = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/student/dashboard" },
  { label: "Resume", icon: FileText, to: "/student/resume" },
  { label: "Jobs", icon: Briefcase, to: "/student/jobs" },
];

const careerLinks = [
  { label: "Interview", icon: Brain, to: "/student/interviews" },
  { label: "Notifications", icon: Bell, to: "/student/notifications" },
];

const preferenceLinks = [
  { label: "Settings", icon: Settings, to: "/student/settings" },
  { label: "Help Center", icon: HelpCircle, to: "/student/help" },
];

function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  const renderLink = (link) => {
    const Icon = link.icon;

    return (
      <NavLink
        key={link.label}
        to={link.to}
        className={({ isActive }) =>
          `
        group flex h-12 items-center gap-3 rounded-xl px-3
        font-medium transition-all duration-200
        ${isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }
      `
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              size={20}
              className={
                isActive
                  ? "text-white"
                  : "text-slate-400 group-hover:text-slate-600"
              }
            />

            <span>{link.label}</span>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside
  className="
    fixed
    left-0
    top-0
    z-40
    hidden
    h-screen
    w-72
    flex-col
    border-r
    border-slate-200
    bg-white
    lg:flex
  "
>
      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white shadow-sm">
            TB
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              TalentBridge
            </h1>

            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              AI Career Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex flex-col gap-8">
          {/* Main */}
          <div>
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Main
            </p>

            <nav className="flex flex-col gap-1">
              {mainLinks.map(renderLink)}
            </nav>
          </div>

          {/* Career */}
          <div>
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Career
            </p>

            <nav className="flex flex-col gap-1">
              {careerLinks.map(renderLink)}
            </nav>
          </div>

          {/* Preferences */}
          <div>
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Preferences
            </p>

            <nav className="flex flex-col gap-1">
              {preferenceLinks.map(renderLink)}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Widgets */}
      <div className="shrink-0 px-4 pb-6">
        {/* Profile Strength */}
        <div className="mb-4 rounded-xl border border-blue-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-blue-800">
            <Zap size={16} className="fill-blue-600 text-blue-600" />
            <span className="text-sm font-bold">
              Profile Strength
            </span>
          </div>

          <p className="mb-3 text-xs text-slate-600">
            Add your latest projects to stand out to recruiters.
          </p>

          <div className="mb-1 h-1.5 w-full rounded-full bg-blue-200">
            <div
              className="h-1.5 rounded-full bg-blue-600"
              style={{ width: "70%" }}
            />
          </div>

          <p className="text-right text-[10px] font-medium text-blue-700">
            70% Complete
          </p>
        </div>

        {/* User Card */}
        <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-slate-300">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {user?.name || "Aman Student"}
              </p>

              <p className="truncate text-xs text-slate-500">
                Free Plan
              </p>
            </div>
          </div>

          <button className="rounded-md p-2 text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;