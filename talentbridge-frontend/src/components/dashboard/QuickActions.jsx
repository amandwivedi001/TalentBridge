import Card from "../common/Card";
import {
  Upload,
  Briefcase,
  Brain,
} from "lucide-react";

function QuickActions() {
  const actions = [
    {
      title: "Upload Resume",
      subtitle: "Improve ATS",
      icon: Upload,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Browse Jobs",
      subtitle: "Find Roles",
      icon: Briefcase,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Mock Interview",
      subtitle: "Practice Skills",
      icon: Brain,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <Card className="h-full p-6">
      <h3 className="mb-6 text-lg font-semibold">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="
                group
                rounded-2xl
                border
                border-slate-300
                p-5
                text-center
                transition-all
                hover:-translate-y-1
                hover:border-slate-300
                hover:shadow-md
              "
            >
              <div
                className={`
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  ${action.color}
                `}
              >
                <Icon size={26} />
              </div>

              <h4 className="mt-4 font-semibold text-slate-900">
                {action.title}
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                {action.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

export default QuickActions;