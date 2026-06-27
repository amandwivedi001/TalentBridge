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
  BarChart3,
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { logOut } from "../../services/auth.service";
import toast from "react-hot-toast";
import { sidebarConfig } from "../../config/sidebar.config";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || "STUDENT";
  const config = sidebarConfig[role];
  const location = useLocation();

  const navigate = useNavigate();

  const renderLink = (link) => {
    const Icon = link.icon;

    const isActive =
      location.pathname === link.to ||
      location.pathname.startsWith(`${link.to}/`);

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

  const handleLogout = async () => {
    try {
      await logOut();

      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
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
    border-slate-400
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
              {config.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {config.sections.map((section) => (
          <div key={section.title}>
            <p
              className="text-xs font-bold uppercase tracking-widest text-slate-400"
              style={{
                marginBottom: "0.75rem", // mb-3
                paddingLeft: "0.75rem",  // px-3
                paddingRight: "0.75rem", // px-3
              }}
            >
              {section.title}
            </p>

            <nav className="flex flex-col gap-1">
              {section.links.map(renderLink)}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Widgets */}
      <div className="shrink-0 px-4 pb-6">
        {/* Profile Strength */}
        <div className="shrink-0 px-4 pb-6">
          {config.widget === "profile" ? (
            // Student Widget
            <div className="mb-4 rounded-xl border border-blue-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-blue-800">
                <Zap size={16} className="fill-blue-600 text-blue-600" />
                <span className="text-sm font-bold">Profile Strength</span>
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
          ) : (
            // Recruiter Widget
            <div className="mb-4 rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-emerald-800">
                <BarChart3 size={16} />
                <span className="text-sm font-bold">Hiring Overview</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Active Jobs</span>
                  <span className="text-sm font-bold text-emerald-700">12</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Applications</span>
                  <span className="text-sm font-bold text-blue-700">48</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Interviews</span>
                  <span className="text-sm font-bold text-violet-700">6</span>
                </div>
              </div>
            </div>
          )}
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

          <button className="rounded-md p-2 text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
            onClick={handleLogout}>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;