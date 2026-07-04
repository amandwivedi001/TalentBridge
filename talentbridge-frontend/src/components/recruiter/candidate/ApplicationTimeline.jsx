import {
    CheckCircle2,
    Clock3,
} from "lucide-react";

import Card from "../../common/Card";

const STAGES = [

    {
        key: "APPLIED",
        label: "Applied",
    },

    {
        key: "SHORTLISTED",
        label: "Shortlisted",
    },

    {
        key: "INTERVIEW",
        label: "Interview",
    },

    {
        key: "HIRED",
        label: "Hired",
    },

];

function ApplicationTimeline({
    status,
}) {

    const currentIndex =
        STAGES.findIndex(
            (stage) =>
                stage.key === status
        );

    return (

        <Card>

            <div
                style={{ marginBottom: "2rem" }}
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-slate-900
                    "
                >
                    Hiring Timeline
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{ marginTop: "0.5rem" }}
                >
                    Current progress of the
                    candidate in the recruitment
                    process.
                </p>

            </div>

            <div
                className="
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >

                {STAGES.map(
                    (
                        stage,
                        index
                    ) => {

                        const completed =
                            currentIndex >=
                            index;

                        return (

                            <div
                                key={stage.key}
                                className="
                                    relative
                                    flex
                                    flex-1
                                    items-center
                                "
                            >

                                {/* Connector */}

                                {index !==
                                    STAGES.length - 1 && (

                                        <div
                                            className={`
                                                absolute
                                                left-10
                                                top-5
                                                hidden
                                                h-1
                                                w-full
                                                md:block
                                                ${completed
                                                    ? "bg-indigo-600"
                                                    : "bg-slate-200"
                                                }
                                            `}
                                        />

                                    )}

                                <div
                                    className="
                                        relative
                                        z-10
                                        flex
                                        flex-col
                                        items-center
                                    "
                                >

                                    <div
                                        className={`
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            transition-all
                                            ${completed
                                                ? "bg-indigo-600 text-white"
                                                : "bg-slate-200 text-slate-500"
                                            }
                                        `}
                                    >

                                        {completed
                                            ? (
                                                <CheckCircle2
                                                    size={22}
                                                />
                                            )
                                            : (
                                                <Clock3
                                                    size={20}
                                                />
                                            )}

                                    </div>

                                    <p
                                        className={`
                                            text-sm
                                            font-semibold
                                            ${completed
                                                ? "text-indigo-700"
                                                : "text-slate-500"
                                            }
                                        `}
                                        style={{ marginTop: "0.75rem" }}
                                    >
                                        {stage.label}
                                    </p>

                                </div>

                            </div>

                        );

                    }
                )}

            </div>

            {status ===
                "REJECTED" && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                        "
                        style={{
                            marginTop: "2.5rem",
                            padding: "1.25rem",
                        }}
                    >

                        <h3
                            className="
                                font-semibold
                                text-red-700
                            "
                        >
                            Application Closed
                        </h3>

                        <p
                            className="
                                text-sm
                                text-red-600
                            "
                            style={{ marginTop: "0.5rem" }}
                        >
                            This application has
                            been rejected and is no
                            longer progressing
                            through the hiring
                            pipeline.
                        </p>

                    </div>

                )}

        </Card>

    );

}

export default ApplicationTimeline;