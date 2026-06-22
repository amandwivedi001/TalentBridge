import SectionCard from "./SectionCard";

function JobDescription({ description }) {
  return (
    <SectionCard>
      <h2 className="text-xl font-bold text-slate-900">
        Job Description
      </h2>

      <p
        className="text-slate-600 leading-7"
        style={{
          marginTop: "16px",
        }}
      >
        {description}
      </p>
    </SectionCard>
  );
}

export default JobDescription;