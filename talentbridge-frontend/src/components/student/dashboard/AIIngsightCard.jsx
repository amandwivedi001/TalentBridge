import Card from "../../common/Card";
import { Brain } from "lucide-react";

function AIInsightCard({ insights = {}, score = 0 }) {
  const missingSkills = Array.isArray(insights?.missingSkills)
    ? insights.missingSkills
    : insights?.missingSkills?.split(",").map((s) => s.trim()) || [];

  const strengths = Array.isArray(insights?.strengths)
    ? insights.strengths
    : insights?.strengths?.split(",").map((s) => s.trim()) || [];

  const recommendations = Array.isArray(
    insights?.topRecommendation
  )
    ? insights.topRecommendation
    : insights?.topRecommendation
        ?.split(",")
        .map((s) => s.trim()) || [];

  return (
    <Card
      className="
        rounded-2xl
        bg-gradient-to-br
        from-violet-50
        to-blue-50
      "
    >
      <div
        style={{
          padding: "20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              backgroundColor: "#ede9fe",
            }}
          >
            <Brain
              size={22}
              className="text-violet-600"
            />
          </div>

          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              AI Insight
            </h3>

            <p
              style={{
                margin: "4px 0 0",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              {score}% percentile
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Strengths */}
          <div>
            <h4
              style={{
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#64748b",
              }}
            >
              Strengths
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {strengths.map((strength, index) => (
                <div
                  key={index}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    backgroundColor: "#d1fae5",
                    color: "#065f46",
                    lineHeight: 1.6,
                  }}
                >
                  {strength}
                </div>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div>
            <h4
              style={{
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#64748b",
              }}
            >
              Missing Skills
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {missingSkills.map((skill, index) => (
                <div
                  key={index}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    backgroundColor: "#ede9fe",
                    color: "#6d28d9",
                    lineHeight: 1.6,
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Action */}
          <div>
            <h4
              style={{
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#64748b",
              }}
            >
              Suggested Action
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {recommendations.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    backgroundColor: "#ffffff",
                    color: "#334155",
                    lineHeight: 1.7,
                    border: "1px solid #e2e8f0",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AIInsightCard;