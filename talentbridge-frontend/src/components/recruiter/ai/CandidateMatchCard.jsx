import {
    BrainCircuit,
    CheckCircle2,
    CircleAlert,
    Sparkles,
} from "lucide-react";

import Card from "../../common/Card";

function CandidateMatchCard({
    candidateMatch,
}) {

    if (!candidateMatch) {

        return null;

    }

    const {
        matchScore,
        matchedSkills,
        missingSkills,
        reasoning,
    } = candidateMatch;

    const getScoreConfig = () => {

        if (matchScore >= 90) {

            return {
                label: "Excellent Match",
                color: "text-emerald-600",
                bg: "bg-emerald-500",
                ring: "ring-emerald-100",
            };

        }

        if (matchScore >= 75) {

            return {
                label: "Strong Match",
                color: "text-blue-600",
                bg: "bg-blue-500",
                ring: "ring-blue-100",
            };

        }

        if (matchScore >= 60) {

            return {
                label: "Moderate Match",
                color: "text-amber-600",
                bg: "bg-amber-500",
                ring: "ring-amber-100",
            };

        }

        return {
            label: "Weak Match",
            color: "text-red-600",
            bg: "bg-red-500",
            ring: "ring-red-100",
        };

    };

    const config =
        getScoreConfig();

    return (

        <Card>

            <div
                className="
                    flex
                    flex-col
                    gap-8
                    lg:flex-row
                    lg:justify-between
                "
            >

                {/* Left */}

                <div className="flex-1">

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                rounded-2xl
                                bg-indigo-100
                            "
                            style={{ padding: "0.75rem" }}
                        >

                            <BrainCircuit
                                className="text-indigo-600"
                                size={24}
                            />

                        </div>

                        <div>

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                AI Candidate Match
                            </h2>

                            <p
                                className="
                                    text-slate-500
                                "
                                style={{ marginTop: "0.25rem" }}
                            >
                                AI compared this candidate
                                against the job requirements.
                            </p>

                        </div>

                    </div>

                    {/* Progress */}

                    <div
                        style={{ marginTop: "2rem" }}
                    >

                        <div
                            className="flex justify-between"
                            style={{ marginBottom: "0.5rem" }}
                        >

                            <span className="font-medium text-slate-600">
                                Match Score
                            </span>

                            <span
                                className={`font-bold ${config.color}`}
                            >
                                {matchScore}%
                            </span>

                        </div>

                        <div className="h-3 rounded-full bg-slate-200">

                            <div
                                className={`h-3 rounded-full transition-all duration-700 ${config.bg}`}
                                style={{
                                    width: `${matchScore}%`,
                                }}
                            />

                        </div>

                        <p
                            className={`font-semibold ${config.color}`}
                            style={{ marginTop: "0.75rem" }}
                        >
                            {config.label}
                        </p>

                    </div>

                    {/* AI Recommendation */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-indigo-100
                            bg-indigo-50
                        "
                        style={{
                            marginTop: "2rem",
                            padding: "1.25rem",
                        }}
                    >

                        <div className="flex gap-3">

                            <Sparkles
                                className="text-indigo-600"
                                style={{ marginTop: "0.25rem" }}
                                size={20}
                            />

                            <div>

                                <h3
                                    className="
                                        font-semibold
                                        text-indigo-900
                                    "
                                >
                                    AI Recommendation
                                </h3>

                                <p
                                    className="
                                        leading-7
                                        text-indigo-700
                                    "
                                    style={{ marginTop: "0.5rem" }}
                                >
                                    {reasoning}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div
                    className="
                        grid
                        gap-6
                        lg:w-[360px]
                    "
                >

                    {/* Matched */}

                    <div>

                        <h3
                            className="
                                font-semibold
                                text-slate-900
                            "
                            style={{ marginBottom: "1rem" }}
                        >
                            Matched Skills
                        </h3>

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-3
                            "
                        >

                            {matchedSkills.map(
                                (
                                    skill
                                ) => (

                                    <span
                                        key={skill}
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            bg-emerald-100
                                            text-sm
                                            font-medium
                                            text-emerald-700
                                        "
                                        style={{
                                            paddingLeft: "1rem",
                                            paddingRight: "1rem",
                                            paddingTop: "0.5rem",
                                            paddingBottom: "0.5rem",
                                        }}
                                    >

                                        <CheckCircle2
                                            size={16}
                                        />

                                        {skill}

                                    </span>

                                )
                            )}

                        </div>

                    </div>

                    {/* Missing */}

                    <div>

                        <h3
                            className="
                                font-semibold
                                text-slate-900
                            "
                            style={{ marginBottom: "1rem" }}
                        >
                            Missing Skills
                        </h3>

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-3
                            "
                        >

                            {missingSkills.length === 0 ? (

                                <span
                                    className="
                                        rounded-full
                                        bg-emerald-100
                                        text-sm
                                        font-medium
                                        text-emerald-700
                                    "
                                    style={{
                                        paddingLeft: "1rem",
                                        paddingRight: "1rem",
                                        paddingTop: "0.5rem",
                                        paddingBottom: "0.5rem",
                                    }}
                                >
                                    No major skill gaps
                                </span>

                            ) : (

                                missingSkills.map(
                                    (
                                        skill
                                    ) => (

                                        <span
                                            key={skill}
                                            className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                rounded-full
                                                bg-red-100
                                                text-sm
                                                font-medium
                                                text-red-700
                                            "
                                            style={{
                                                paddingLeft: "1rem",
                                                paddingRight: "1rem",
                                                paddingTop: "0.5rem",
                                                paddingBottom: "0.5rem",
                                            }}
                                        >

                                            <CircleAlert
                                                size={16}
                                            />

                                            {skill}

                                        </span>

                                    )
                                )

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </Card>

    );

}

export default CandidateMatchCard;