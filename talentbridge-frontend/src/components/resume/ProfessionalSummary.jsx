import Card from "../common/Card";
import { Brain } from "lucide-react";

function ProfessionalSummary({ summary }) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
          <Brain className="text-purple-600" size={28} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">
            AI Professional Summary
          </h3>

          {summary ? (
            <p
              className="leading-relaxed text-slate-600"
              style={{ marginTop: "1rem" }}
            >
              {summary}
            </p>
          ) : (
            <p
              className="leading-relaxed text-slate-400 italic"
              style={{ marginTop: "1rem" }}
            >
              Upload a resume to generate your AI-written summary.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ProfessionalSummary;