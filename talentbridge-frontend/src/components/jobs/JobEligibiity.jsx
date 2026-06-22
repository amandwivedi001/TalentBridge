import SectionCard from "./SectionCard";

function JobEligibility({ job }) {
  return (
    <SectionCard>
      <h2 className="text-xl font-bold text-slate-900">
        Eligibility Criteria
      </h2>

      <div
        className="grid grid-cols-3"
        style={{
          marginTop: "20px",
          gap: "12px",
        }}
      >
        <div
          className="rounded-xl bg-slate-50 text-center"
          style={{
            padding: "16px",
          }}
        >
          <p className="text-xs font-semibold text-slate-500">
            CGPA
          </p>

          <p
            className="text-xl font-bold text-slate-900"
            style={{
              marginTop: "6px",
            }}
          >
            ≥ {job.minCgpa}
          </p>
        </div>

        <div
          className="rounded-xl bg-slate-50 text-center"
          style={{
            padding: "16px",
          }}
        >
          <p className="text-xs font-semibold text-slate-500">
            10th
          </p>

          <p
            className="text-xl font-bold text-slate-900"
            style={{
              marginTop: "6px",
            }}
          >
            ≥ {job.minTenthPercentage}%
          </p>
        </div>

        <div
          className="rounded-xl bg-slate-50 text-center"
          style={{
            padding: "16px",
          }}
        >
          <p className="text-xs font-semibold text-slate-500">
            12th
          </p>

          <p
            className="text-xl font-bold text-slate-900"
            style={{
              marginTop: "6px",
            }}
          >
            ≥ {job.minTwelfthPercentage}%
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

export default JobEligibility;