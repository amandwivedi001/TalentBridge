import Card from "../common/Card";
import {
  CheckCircle2,
  FileText,
  Target,
  Zap,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

function ResumeScoreCard({ score = 72 }) {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const breakdown = [
    {
      label: "Keyword Match",
      value: 65,
      color: "bg-amber-500",
      icon: Target,
    },
    {
      label: "Formatting & Layout",
      value: 90,
      color: "bg-emerald-500",
      icon: FileText,
    },
    {
      label: "Impact & Action Verbs",
      value: 60,
      color: "bg-amber-500",
      icon: Zap,
    },
  ];

  return (
    <Card className="overflow-hidden border border-slate-200 p-0 shadow-lg shadow-slate-200/40">
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* LEFT - ATS SCORE */}
        <div className="flex flex-col items-center justify-center border-b border-slate-100 bg-slate-50/50 p-8 lg:border-b-0 lg:border-r">
          <h3 className="mb-6 text-center text-sm font-bold uppercase tracking-widest text-slate-500">
            Overall ATS Score
          </h3>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-xl" />

            <svg
              className="-rotate-90 transform"
              width="160"
              height="160"
            >
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth="12"
                fill="none"
              />

              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#8b5cf6"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black text-slate-900">
                {score}
              </span>
              <span className="text-xs font-bold text-slate-400">
                /100
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700">
            <CheckCircle2 size={16} />
            Average Visibility
          </div>
        </div>

        {/* CENTER - BREAKDOWN */}
        <div className="border-b border-slate-100 p-8 lg:col-span-2 lg:border-b-0">
          <div style={{marginBottom: "15px"}} className="mb-8 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Score Breakdown
            </h3>

            <span className="text-sm font-medium text-slate-500">
              What needs work?
            </span>
          </div>

          <div className="space-y-7">
            {breakdown.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Icon
                        size={16}
                        className="text-slate-400"
                      />
                      {item.label}
                    </div>

                    <span className="text-sm font-bold text-slate-900">
                      {item.value}%
                    </span>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT - ATS INSIGHTS */}
        <div style={{marginLeft: "20px"}} className="bg-slate-50/30 p-8 lg:border-l lg:border-slate-100">
          <h3 style={{marginBottom: "15px"}} className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-500">
            ATS Insights
          </h3>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-0.5 text-violet-500"
              />

              <div>
                <p className="text-xs text-slate-500">
                  Resume Visibility
                </p>
                <p className="text-lg font-bold text-slate-900">
                  Average
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp
                size={18}
                className="mt-0.5 text-violet-500"
              />

              <div>
                <p className="text-xs text-slate-500">
                  Ranking
                </p>
                <p className="text-lg font-bold text-violet-600">
                  Top 72%
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lightbulb
                size={18}
                className="mt-0.5 text-violet-500"
              />

              <div>
                <p className="text-xs text-slate-500">
                  Recommendation
                </p>
                <p className="font-semibold text-slate-900">
                  Add Docker Skills
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ResumeScoreCard;