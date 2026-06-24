import Card from "../common/Card";
import { CheckCircle2 } from "lucide-react";

function StrengthsCard({ strengths = [] }) {
  return (
    <Card>
      <h3
        className="text-lg font-semibold"
        style={{ marginBottom: "1.5rem" }}
      >
        Strengths
      </h3>

      {strengths.length === 0 ? (
        <p className="text-sm text-slate-500">
          Strengths will appear here once your resume is analyzed.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {strengths.map((strength) => (
            <div
              key={strength}
              className="flex gap-3 rounded-2xl bg-green-50"
              style={{ padding: "1rem" }}
            >
              <CheckCircle2
                className="text-green-600"
                size={18}
                style={{ marginTop: "0.125rem" }}
              />

              <p className="text-sm text-slate-700">{strength}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default StrengthsCard;