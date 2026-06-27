import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Brain,
  Bell,
  Settings,
  HelpCircle,
  Users,
  ClipboardList,
  BarChart3,
} from "lucide-react";

export const sidebarConfig = {
  STUDENT: {
    subtitle: "AI Career Platform",
    widget: "profile",
    sections: [
      {
        title: "Main",
        links: [
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
        ],
      },
      {
        title: "Career",
        links: [
          {
            label: "Interview",
            icon: Brain,
            to: "/student/interviews",
          },
          {
            label: "Notifications",
            icon: Bell,
            to: "/student/notifications",
          },
        ],
      },
      {
        title: "Preferences",
        links: [
          {
            label: "Settings",
            icon: Settings,
            to: "/student/settings",
          },
          {
            label: "Help Center",
            icon: HelpCircle,
            to: "/student/help",
          },
        ],
      },
    ],
  },

  RECRUITER: {
    subtitle: "Recruiter Portal",
    widget: "hiring",
    sections: [
      {
        title: "Recruitment",
        links: [
          {
            label: "Dashboard",
            icon: LayoutDashboard,
            to: "/recruiter/dashboard",
          },
          {
            label: "Jobs",
            icon: Briefcase,
            to: "/recruiter/jobs",
          },
          {
            label: "Candidates",
            icon: Users,
            to: "/recruiter/candidates",
          },
          {
            label: "Applications",
            icon: ClipboardList,
            to: "/recruiter/applications",
          },
          {
            label: "Analytics",
            icon: BarChart3,
            to: "/recruiter/analytics",
          },
          {
            label: "Notifications",
            icon: Bell,
            to: "/recruiter/notifications",
          },
        ],
      },
      {
        title: "Preferences",
        links: [
          {
            label: "Settings",
            icon: Settings,
            to: "/recruiter/settings",
          },
          {
            label: "Help Center",
            icon: HelpCircle,
            to: "/recruiter/help",
          },
        ],
      },
    ],
  },
};