import SectionCard from "./SectionCard";

function CompanyInfo({ recruiter }) {
  return (
    <SectionCard>
      <h2 className="text-xl font-bold text-slate-900">
        Company Information
      </h2>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <h3 className="text-lg font-semibold text-slate-900">
          {recruiter.companyName}
        </h3>

        <p
          className="text-slate-500"
          style={{
            marginTop: "6px",
          }}
        >
          Recruiter
        </p>

        <p
          className="text-slate-600"
          style={{
            marginTop: "12px",
          }}
        >
          Hiring through TalentBridge Placement Platform.
        </p>
      </div>
    </SectionCard>
  );
}

export default CompanyInfo;