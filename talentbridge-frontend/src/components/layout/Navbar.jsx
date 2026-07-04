import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { getUnreadNotificationCount } from "../../services/notification.service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setUnreadCount,
} from "../../features/notifications/notificationSlice";
function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const unreadCount =
    useSelector(

      (state) =>
        state.notifications.unreadCount

    );

  useEffect(() => {

    fetchUnreadCount();

  }, []);

  const fetchUnreadCount =
    async () => {

      try {

        const data =
          await getUnreadNotificationCount();

        dispatch(
          setUnreadCount(
            data.count
          )
        );

      }

      catch (error) {

        console.error(
          "Failed to fetch notification count",
          error
        );

      }

    };
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
      <div
        className="flex h-full items-center justify-end"
        style={{
          paddingLeft: "2rem", // px-8
          paddingRight: "2rem", // px-8
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              navigate(
                user.role === "STUDENT"
                  ? "/student/notifications"
                  : "/recruiter/notifications"
              )
            }
            className="relative rounded-xl transition hover:bg-slate-100"
            style={{
              padding: "0.5rem", // p-2
            }}
          >
            <Bell size={20} className="text-slate-700" />

            {unreadCount > 0 && (

              <span
                style={{
                  right: "-0.25rem",
                  top: "-0.25rem",
                  paddingLeft: "0.25rem",
                  paddingRight: "0.25rem",
                }}
                className="
            absolute
            flex
            h-5
            min-w-[20px]
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-[10px]
            font-bold
            text-white
        "
              >
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>

            )}          </button>

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

              <p>
                {user.role === "STUDENT"
                  ? "Student"
                  : "Recruiter"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;