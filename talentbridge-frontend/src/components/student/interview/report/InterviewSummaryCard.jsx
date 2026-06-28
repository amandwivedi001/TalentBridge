import Card from "../../../common/Card";

import {
    Calendar,
    ClipboardList,
    Brain,
    Target,
    BadgeCheck,
} from "lucide-react";

function formatInterviewType(type) {
    if (!type) return "-";

    return type
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );
}

function formatDifficulty(level) {
    if (!level) return "-";

    return (
        level.charAt(0) +
        level.slice(1).toLowerCase()
    );
}

function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}

function SummaryItem({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div className="flex items-start gap-4">
            <div
                className="rounded-xl bg-indigo-50"
                style={{
                    padding: "12px",
                }}
            >
                <Icon
                    size={18}
                    className="text-indigo-600"
                />
            </div>

            <div>
                <p className="text-sm text-slate-500">
                    {label}
                </p>

                <h4
                    className="font-semibold text-slate-900"
                    style={{
                        marginTop: "4px",
                    }}
                >
                    {value}
                </h4>
            </div>
        </div>
    );
}

function InterviewSummaryCard({
    report,
}) {
    return (
        <Card className="h-full">
            <div className="flex h-full flex-col">

                <h2 className="text-xl font-semibold text-slate-900">
                    Interview Summary
                </h2>

                <div
                    className="space-y-6"
                    style={{
                        marginTop: "32px",
                    }}
                >

                    <SummaryItem
                        icon={Brain}
                        label="Interview Type"
                        value={formatInterviewType(
                            report.interviewType
                        )}
                    />

                    <SummaryItem
                        icon={Target}
                        label="Difficulty"
                        value={formatDifficulty(
                            report.difficulty
                        )}
                    />

                    <SummaryItem
                        icon={ClipboardList}
                        label="Questions"
                        value={`${report.totalQuestions} Questions`}
                    />

                    <SummaryItem
                        icon={Calendar}
                        label="Completed On"
                        value={formatDate(
                            report.completedAt
                        )}
                    />

                    <SummaryItem
                        icon={BadgeCheck}
                        label="Status"
                        value="Completed"
                    />

                </div>

                <div
                    style={{
                        marginTop: "auto",
                        paddingTop: "32px",
                    }}
                >

                    <div
                        className="rounded-2xl bg-indigo-50"
                        style={{
                            padding: "20px",
                        }}
                    >

                        <p className="text-sm font-medium text-indigo-700">
                            AI Recommendation
                        </p>

                        <p
                            className="text-sm leading-6 text-slate-600"
                            style={{
                                marginTop: "8px",
                            }}
                        >
                            Keep practicing consistently and
                            review your AI feedback to improve
                            future interview performance.
                        </p>

                    </div>

                </div>

            </div>
        </Card>
    );
}

export default InterviewSummaryCard;