import {
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const features = [
  "AI Resume Analysis",
  "Smart Candidate Matching",
  "Mock Interviews",
  "Placement Tracking",
];

function AuthHero() {
  return (
    <div className="relative h-full overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Background Glows */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative flex h-full flex-col justify-center px-12 lg:px-20">
        <div className="max-w-xl">
          
          {/* Logo Section - Simplified */}
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 shadow-lg shadow-teal-500/30">
              <BriefcaseBusiness size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              TalentBridge
            </h1>
          </div>

          {/* Badge - Cleaned up */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-400 border border-teal-500/20">
            <Sparkles size={16} />
            AI Powered Placement Suite
          </div>

          {/* Headline */}
          <h2 className="mb-6 text-4xl lg:text-5xl font-bold leading-tight">
            Build Your Career
            <span className="block text-teal-400 mt-2">
              With Confidence
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-slate-400 max-w-md">
            Analyze resumes, practice interviews, discover jobs and track placements with a single intelligent platform.
          </p>

          {/* Features - Borders removed, visual hierarchy improved */}
          <div className="mb-12 grid gap-y-4 gap-x-8 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 text-slate-300"
              >
                <CheckCircle2
                  size={20}
                  className="text-teal-400 shrink-0"
                />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Stats - Added a top border to ground the numbers */}
          <div className="pt-10 border-t border-white/10 grid grid-cols-3 gap-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">
                10K+
              </h3>
              <p className="text-sm font-medium text-slate-500">
                Resumes
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">
                2K+
              </h3>
              <p className="text-sm font-medium text-slate-500">
                Interviews
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">
                500+
              </h3>
              <p className="text-sm font-medium text-slate-500">
                Placed
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AuthHero;