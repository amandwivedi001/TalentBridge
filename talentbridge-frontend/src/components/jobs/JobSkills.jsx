import SectionCard from "./SectionCard";

function JobSkills({ skills }) {
  return (
    <SectionCard>
      <h2 className="text-xl font-bold text-slate-900">
        Required Skills
      </h2>

      <p
  className="text-sm text-slate-500"
  style={{
    marginTop: "4px",
  }}
>
  {skills.length} skills recruiters are looking for
</p>

      <div
        className="flex flex-wrap"
        style={{
          marginTop: "16px",
          gap: "10px",
        }}
      >
        {skills?.map((skill) => (
          <span
            key={skill}
            className="
              rounded-full
              bg-blue-50
              text-blue-700
              text-sm
              font-semibold
            "
            style={{
              paddingTop: "8px",
              paddingBottom: "8px",
              paddingLeft: "14px",
              paddingRight: "14px",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}

export default JobSkills;