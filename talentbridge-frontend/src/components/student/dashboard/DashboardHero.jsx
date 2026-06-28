import Card from "../../common/Card";

function DashboardHero({
  user,
  applications,
  interviews,
  resumeScore,
}) {
  const firstName = user?.name?.split(" ")[0] || "User";

  const stats = [
    {
      label: "ATS Score",
      value: resumeScore,
    },
    {
      label: "Applications",
      value: applications?.applied || 0,
    },
    {
      label: "Interviews",
      value: interviews?.total || 0,
    },
  ];

  return (
    <Card
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r
        from-blue-600
        via-indigo-600
        to-violet-600
        px-8
        py-8
        text-white
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-white/[0.04]" />

      <div className="relative">
        {/* Heading */}
        <h1 style={{marginTop:"12px"}} className="text-3xl md:text-3xl font-bold tracking-tight">
          Welcome Back, {firstName} 👋
        </h1>

        {/* Subtitle */}
        <p style={{marginTop:"12px"}} className="mt-3 max-w-2xl text-base md:text-lg text-indigo-100 leading-relaxed">
          Track your applications, improve your resume,
          and prepare for interviews.
        </p>

        {/* KPI Chips */}
        <div style={{marginTop:"12px"}} className="mt-7 flex flex-wrap gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{marginTop:"4px"}}
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/20
                bg-white/10
                px-6
                py-4
                backdrop-blur-md
                transition-all
                hover:bg-white/15
              "
            >
              <span className="text-sm text-indigo-100">
                {stat.label}
              </span>

              <span className="font-bold text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default DashboardHero;