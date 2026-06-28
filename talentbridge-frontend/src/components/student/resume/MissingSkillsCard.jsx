import Card from "../../common/Card";
import { Sparkles } from "lucide-react";

function MissingSkillsCard({ skills = [] }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100">
          <Sparkles className="text-indigo-600" size={22} />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            Skills To Learn Next
          </h3>
          <p className="text-sm text-slate-500">
            High impact skills missing from your profile
          </p>
        </div>
      </div>

      {skills.length === 0 ? (
        <p
          className="text-sm text-slate-500"
          style={{ marginTop: "1.5rem" }}
        >
          Your skill set already covers what this role needs.
        </p>
      ) : (
        <div
          className="flex flex-wrap gap-3"
          style={{ marginTop: "1.5rem" }}
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 text-sm font-semibold text-indigo-700"
              style={{
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}

export default MissingSkillsCard;