import Card from "../../../common/Card";

import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function getScoreInfo(score) {

    if (score >= 85) {

        return {

            color: "#22c55e",

            title: "Excellent",

            recruiter: "Interview Ready",

            message:
                "Excellent job! You demonstrated strong technical knowledge and communicated your ideas clearly.",

        };

    }

    if (score >= 70) {

        return {

            color: "#2563eb",

            title: "Good",

            recruiter: "Strong Candidate",

            message:
                "Good overall performance. With a little more depth and confidence you can perform even better.",

        };

    }

    if (score >= 55) {

        return {

            color: "#f59e0b",

            title: "Average",

            recruiter: "Needs Improvement",

            message:
                "You have a good foundation but should improve your explanations and technical depth.",

        };

    }

    return {

        color: "#ef4444",

        title: "Needs Improvement",

        recruiter: "More Practice Required",

        message:
            "Practice more mock interviews and strengthen your core concepts before your next interview.",

    };

}

function OverallScoreCard({
    score,
}) {

    const safeScore =
        Math.max(
            0,
            Math.min(
                100,
                Math.round(score || 0)
            )
        );

    const {

        color,

        title,

        recruiter,

        message,

    } = getScoreInfo(
        safeScore
    );

    return (

        <Card className="h-full">

            <div
                className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    gap-10
                "
            >

                <div
                    className="
                        flex
                        justify-center
                    "
                >

                    <div
                        className="
                            h-52
                            w-52
                        "
                    >

                        <CircularProgressbar

                            value={safeScore}

                            text={`${safeScore}`}

                            styles={buildStyles({

                                pathColor: color,

                                textColor: color,

                                trailColor:
                                    "#e2e8f0",

                                strokeLinecap:
                                    "round",

                                textSize:
                                    "18px",

                            })}

                        />

                    </div>

                </div>

                <div
                    className="
                        flex-1
                    "
                >

                    <p
                        className="
                            text-sm
                            font-medium
                            uppercase
                            tracking-wide
                            text-slate-500
                        "
                    >
                        Overall Performance
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-slate-900
                        "
                        style={{
                            marginTop: "12px",
                        }}
                    >
                        {title}
                    </h2>

                    <p
                        className="
                            max-w-2xl
                            text-lg
                            leading-8
                            text-slate-600
                        "
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        {message}
                    </p>

                    <div
                        className="
                            grid
                            gap-4
                            sm:grid-cols-3
                        "
                        style={{
                            marginTop: "32px",
                        }}
                    >

                        <div
                            className="
                                rounded-2xl
                                bg-slate-50
                            "
                            style={{
                                padding: "20px",
                            }}
                        >

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Performance
                            </p>

                            <h3
                                className="
                                    text-xl
                                    font-bold
                                "
                                style={{
                                    marginTop: "8px",
                                }}
                            >
                                {title}
                            </h3>

                        </div>

                        <div
                            className="
                                rounded-2xl
                                bg-slate-50
                            "
                            style={{
                                padding: "20px",
                            }}
                        >

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Recruiter Readiness
                            </p>

                            <h3
                                className="
                                    text-xl
                                    font-bold
                                "
                                style={{
                                    marginTop: "8px",
                                }}
                            >
                                {recruiter}
                            </h3>

                        </div>

                        <div
                            className="
                                rounded-2xl
                                bg-slate-50
                            "
                            style={{
                                padding: "20px",
                            }}
                        >

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Final Score
                            </p>

                            <h3
                                className="
                                    text-xl
                                    font-bold
                                "
                                style={{
                                    marginTop: "8px",
                                }}
                            >
                                {safeScore}/100
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </Card>

    );

}

export default OverallScoreCard;