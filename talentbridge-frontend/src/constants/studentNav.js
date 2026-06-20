import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Brain,
  Bell,
} from "lucide-react";

export const studentNav = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/student/dashboard",
  },
  {
    label: "Resume",
    icon: FileText,
    to: "/student/resume",
  },
  {
    label: "Jobs",
    icon: Briefcase,
    to: "/student/jobs",
  },
  {
    label: "Mock Interviews",
    icon: Brain,
    to: "/student/interviews",
  },
  {
    label: "Notifications",
    icon: Bell,
    to: "/student/notifications",
  },
];