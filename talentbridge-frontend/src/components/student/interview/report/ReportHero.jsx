import {
    Bot,
    Calendar,
    BadgeCheck,
    Sparkles,
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
    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    );
}

function Badge({
    icon: Icon,
    label,
}) {
    return (
        <div
            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-indigo-100
                bg-indigo-50
                text-sm
                font-medium
                text-indigo-700
            "
            style={{
                padding: "8px 16px",
            }}
        >
            <Icon size={16} />
            {label}
        </div>
    );
}

function ReportHero({
    report,
}) {
    return (
        <section
            className="
                overflow-hidden
                rounded-3xl
                bg-gradient-to-br
                from-indigo-600
                via-violet-600
                to-blue-600
                text-white
                shadow-xl
            "
            style={{
                padding: "40px",
            }}
        >
            <div
                className="
                    flex
                    flex-col
                    gap-8
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >
                <div>
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-white/15
                            text-sm
                        "
                        style={{
                            padding: "8px 16px",
                        }}
                    >
                        <Bot size={18} />

                        AI Interview Report
                    </div>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            leading-tight
                        "
                        style={{
                            marginTop: "24px",
                        }}
                    >
                        Congratulations!
                    </h1>

                    <p
                        className="
                            max-w-2xl
                            text-lg
                            text-indigo-100
                        "
                        style={{
                            marginTop: "16px",
                        }}
                    >
                        Your interview has been completed
                        successfully. Here is a detailed AI
                        evaluation of your performance.
                    </p>

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-3
                        "
                        style={{
                            marginTop: "32px",
                        }}
                    >
                        <Badge
                            icon={Sparkles}
                            label={formatInterviewType(
                                report.interviewType
                            )}
                        />

                        <Badge
                            icon={BadgeCheck}
                            label={formatDifficulty(
                                report.difficulty
                            )}
                        />

                        {report.skill && (
                            <Badge
                                icon={Bot}
                                label={report.skill}
                            />
                        )}
                    </div>
                </div>

                <div
                    className="
                        rounded-3xl
                        bg-white/10
                        backdrop-blur-md
                    "
                    style={{
                        padding: "24px",
                    }}
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <Calendar size={22} />

                        <div>
                            <p
                                className="
                                    text-sm
                                    text-indigo-100
                                "
                            >
                                Completed On
                            </p>

                            <p
                                className="
                                    text-lg
                                    font-semibold
                                "
                                style={{
                                    marginTop: "4px",
                                }}
                            >
                                {formatDate(
                                    report.completedAt
                                )}
                            </p>
                        </div>
                    </div>

                    <div
                        className="
                            border-t
                            border-white/20
                        "
                        style={{
                            marginTop: "24px",
                            paddingTop: "24px",
                        }}
                    >
                        <p
                            className="
                                text-sm
                                text-indigo-100
                            "
                        >
                            Questions Answered
                        </p>

                        <h2
                            className="
                                text-3xl
                                font-bold
                            "
                            style={{
                                marginTop: "8px",
                            }}
                        >
                            {report.totalQuestions}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ReportHero;