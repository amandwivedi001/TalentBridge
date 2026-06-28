import { useNavigate } from "react-router-dom";

import {
    Brain,
    FileText,
    Briefcase,
    User,
    Calendar,
    ChevronRight,
    Trophy,
} from "lucide-react";

function getInterviewIcon(type) {

    switch (type) {

        case "RESUME_BASED":
            return FileText;

        case "DSA":
            return Brain;

        case "SKILL_BASED":
            return Briefcase;

        case "HR":
            return User;

        default:
            return Brain;

    }

}

function getInterviewTitle(type) {

    switch (type) {

        case "RESUME_BASED":
            return "Resume Based";

        case "DSA":
            return "DSA";

        case "SKILL_BASED":
            return "Skill Based";

        case "HR":
            return "HR";

        default:
            return type;

    }

}

function getScoreColor(score) {

    if (score >= 85)
        return "bg-emerald-100 text-emerald-700";

    if (score >= 70)
        return "bg-blue-100 text-blue-700";

    if (score >= 55)
        return "bg-amber-100 text-amber-700";

    return "bg-red-100 text-red-700";

}

function formatDifficulty(level) {

    if (!level) return "-";

    return (
        level.charAt(0) +
        level.slice(1).toLowerCase()
    );

}

function formatDate(date) {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

}

function HistoryCard({
    interview,
}) {

    const navigate =
        useNavigate();

    const Icon =
        getInterviewIcon(
            interview.interviewType
        );

    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
            style={{
                padding: "24px",
            }}
        >

            <div
                className="
                    flex
                    items-start
                    justify-between
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-4
                    "
                >

                    <div
                        className="
                            rounded-2xl
                            bg-indigo-100
                        "
                        style={{
                            padding: "12px",
                        }}
                    >

                        <Icon
                            size={24}
                            className="text-indigo-600"
                        />

                    </div>

                    <div>

                        <h3
                            className="
                                text-xl
                                font-bold
                                text-slate-900
                            "
                        >
                            {getInterviewTitle(
                                interview.interviewType
                            )}
                        </h3>

                        <p
                            className="
                                text-slate-500
                            "
                            style={{
                                marginTop: "4px",
                            }}
                        >
                            {formatDifficulty(
                                interview.difficulty
                            )}
                        </p>

                    </div>

                </div>

                <div
                    className={`
                        rounded-full
                        text-sm
                        font-semibold
                        ${getScoreColor(
                            interview.overallScore
                        )}
                    `}
                    style={{
                        padding: "8px 16px",
                    }}
                >
                    {interview.overallScore}%
                </div>

            </div>

            <div
                className="
                    flex
                    items-center
                    justify-between
                    text-sm
                    text-slate-500
                "
                style={{
                    marginTop: "32px",
                }}
            >

                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    <Calendar size={16} />

                    {formatDate(
                        interview.createdAt
                    )}

                </div>

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-emerald-50
                        text-emerald-700
                    "
                    style={{
                        padding: "4px 12px",
                    }}
                >

                    <Trophy size={16} />

                    Completed

                </div>

            </div>

            <button

                onClick={() =>
                    navigate(
                        `/student/interviews/report/${interview.id}`
                    )
                }

                className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-indigo-200
                    font-semibold
                    text-indigo-600
                    transition
                    hover:bg-indigo-50
                "
                style={{
                    marginTop: "32px",
                    padding: "12px 0",
                }}

            >

                View Report

                <ChevronRight size={18} />

            </button>

        </div>

    );

}

export default HistoryCard;