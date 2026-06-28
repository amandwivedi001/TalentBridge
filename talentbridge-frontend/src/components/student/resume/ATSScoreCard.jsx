import Card from "../../common/Card";
import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";
import { RefreshCw } from "lucide-react";

import "react-circular-progressbar/dist/styles.css";

const getScoreTier = (score) => {
    if (score >= 75) {
        return {
            color: "#22c55e",
            label: "Excellent ATS Score",
            visibility: "Excellent",
        };
    }
    if (score >= 60) {
        return {
            color: "#f59e0b",
            label: "Good ATS Score",
            visibility: "Above Average",
        };
    }
    if (score >= 50) {
        return {
            color: "#f59e0b",
            label: "Fair ATS Score",
            visibility: "Average",
        };
    }
    return {
        color: "#ef4444",
        label: "Needs Improvement",
        visibility: "Below Average",
    };
};

function ATSScoreCard({ score = 0, lastAnalyzedAt}) {
    const safeScore = Math.min(100, Math.max(0, Math.round(score || 0)));
    const { color, label, visibility } = getScoreTier(safeScore);

    return (
        <Card className="h-full">
            <div className="flex h-full flex-col">
                <h3 className="text-xl font-semibold text-slate-900">
                    ATS Score
                </h3>

                <div className="flex flex-1 flex-col items-center mt-8">
                    <div className="h-[140px] w-[140px]">
                        <CircularProgressbar
                            value={safeScore}
                            text={`${safeScore}`}
                            styles={buildStyles({
                                pathColor: color,
                                textColor: color,
                                trailColor: "#e2e8f0",
                                textSize: "22px",
                                strokeLinecap: "round",
                            })}
                        />
                    </div>

                    <h4 className="mt-6 text-2xl font-bold text-slate-900 text-center">
                        {label}
                    </h4>

                    <div className="mt-6 w-full rounded-2xl bg-slate-50 p-5 text-center">
                        <p className="text-sm text-slate-500">
                            Resume Visibility
                        </p>

                        <p className="mt-1 text-lg font-semibold text-slate-900">
                            {visibility}
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Top {100 - safeScore}% of resumes
                        </p>
                    </div>

                    {lastAnalyzedAt && (
                        <p className="mt-4 text-xs text-slate-400">
                            Last analyzed{" "}
                            {new Date(lastAnalyzedAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    )}

                    <div className="flex-1" />

                    <div className="mt-6 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-700">
                        ATS analysis updates automatically when you upload a new resume.
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ATSScoreCard;