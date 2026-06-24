import Card from "../common/Card";
import { Code2 } from "lucide-react";

function SkillsInventory({ skills = [] }) {
  return (
    <Card>
      <div
        className="flex items-center gap-3"
        style={{ marginBottom: "1.5rem" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
          <Code2 className="text-indigo-600" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Skills Inventory
          </h3>
          <p className="text-sm text-slate-500">AI extracted skills</p>
        </div>
      </div>

      {skills.length === 0 ? (
        <p className="text-sm text-slate-500">
          No skills detected yet — upload a resume to get started.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-xl border border-indigo-100 bg-indigo-50 text-sm font-medium text-indigo-700"
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

export default SkillsInventory;