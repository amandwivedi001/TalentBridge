import Card from "../common/Card";
import { GraduationCap } from "lucide-react";

const FALLBACK = "—";

function EducationSnapshot({ cgpa, tenth, twelfth }) {
  const stats = [
    { label: "CGPA", value: cgpa ?? FALLBACK, suffix: "" },
    { label: "10th", value: tenth ?? FALLBACK, suffix: tenth ? "%" : "" },
    { label: "12th", value: twelfth ?? FALLBACK, suffix: twelfth ? "%" : "" },
  ];

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
          <GraduationCap className="text-indigo-600" size={22} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Education Snapshot
          </h3>
          <p className="text-sm text-slate-500">
            Academic performance overview
          </p>
        </div>
      </div>

      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        style={{ marginTop: "1.5rem" }}
      >
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 text-center"
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
            }}
          >
            <p className="text-sm font-medium text-slate-500">
              {item.label}
            </p>

            <p
              className="text-3xl font-bold text-slate-900"
              style={{ marginTop: "0.5rem" }}
            >
              {item.value}
              {item.suffix}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default EducationSnapshot;