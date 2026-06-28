import Card from "../../common/Card";

function ResumeHero({ score = 0 }) {
  const safeScore = Math.min(100, Math.max(0, Math.round(score || 0)));

  return (
    <Card className="overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100">
            AI Resume Intelligence
          </p>

          <h1
            className="text-3xl font-bold lg:text-4xl"
            style={{ marginTop: "0.75rem" }}
          >
            Resume Analysis Center
          </h1>

          <p
            className="max-w-2xl text-lg text-indigo-100"
            style={{ marginTop: "1rem" }}
          >
            Analyze your resume, improve ATS score, identify missing skills,
            and receive AI-powered career recommendations.
          </p>
        </div>

        <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider">
              ATS
            </p>

            <p
              className="text-4xl font-bold"
              style={{ marginTop: "0.25rem" }}
            >
              {safeScore}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ResumeHero;