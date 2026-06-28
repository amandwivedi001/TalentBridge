import Card from "../../common/Card";
import { TrendingDown } from "lucide-react";

function ImprovementAreas({ areas = [] }) {
  return (
    <Card>
      <h3
        className="text-xl font-semibold"
        style={{ marginBottom: "1.5rem" }}
      >
        Improvement Areas
      </h3>

      {areas.length === 0 ? (
        <p className="text-sm text-slate-500">
          No major gaps found — nice work.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {areas.map((area) => (
            <div
              key={area}
              className="flex gap-3 rounded-2xl bg-amber-50"
              style={{ padding: "1rem" }}
            >
              <TrendingDown
                className="text-amber-600"
                size={18}
                style={{ marginTop: "0.125rem" }}
              />
              <p className="text-sm text-slate-700">{area}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default ImprovementAreas;