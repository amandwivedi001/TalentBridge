import Card from "../common/Card";
import { Brain, ArrowRight } from "lucide-react";

function RecommendationsCard({ suggestions = [] }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100">
          <Brain className="text-indigo-600" size={22} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            AI Recommendations
          </h3>
          <p className="text-sm text-slate-500">
            Personalized improvements suggested by AI
          </p>
        </div>
      </div>

      {suggestions.length === 0 ? (
        <p
          className="text-sm text-slate-500"
          style={{ marginTop: "1.5rem" }}
        >
          No new recommendations right now — check back after your next upload.
        </p>
      ) : (
        <div
          className="grid gap-4"
          style={{ marginTop: "1.5rem" }}
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="flex items-start gap-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50"
              style={{ padding: "1.25rem" }}
            >
              <ArrowRight
                size={18}
                className="text-indigo-600"
                style={{ marginTop: "0.25rem" }}
              />

              <p className="leading-7 text-slate-700">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default RecommendationsCard;