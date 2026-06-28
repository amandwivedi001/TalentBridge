import {
    GraduationCap,
    CheckCircle2,
} from "lucide-react";

import Card from "../../common/Card";

function EligibilityItem({
    label,
    value,
}) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
            "
            style={{
                padding: "1.25rem",
            }}
        >

            <p
                className="
                    text-sm
                    font-medium
                    text-slate-500
                "
            >
                {label}
            </p>

            <h3
                className="
                    text-3xl
                    font-bold
                    text-slate-900
                "
                style={{
                    marginTop: "0.5rem",
                }}
            >
                {value}
            </h3>

        </div>

    );

}

function JobEligibilityCard({
    cgpa,
    tenth,
    twelfth,
    isActive,
}) {

    return (

        <Card>

            <div className="flex items-center gap-3">

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-indigo-100
                    "
                >

                    <GraduationCap
                        size={24}
                        className="text-indigo-600"
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
                        Eligibility Criteria
                    </h2>

                    <p
                        className="
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.25rem",
                        }}
                    >
                        Minimum academic requirements
                        to apply for this position.
                    </p>

                </div>

            </div>

            <div
                className="
                    grid
                    gap-5
                    md:grid-cols-3
                "
                style={{
                    marginTop: "2rem",
                }}
            >

                <EligibilityItem
                    label="Minimum CGPA"
                    value={
                        cgpa
                            ? `${cgpa}/10`
                            : "Not Required"
                    }
                />

                <EligibilityItem
                    label="Minimum 10th %"
                    value={
                        tenth
                            ? `${tenth}%`
                            : "Not Required"
                    }
                />

                <EligibilityItem
                    label="Minimum 12th %"
                    value={
                        twelfth
                            ? `${twelfth}%`
                            : "Not Required"
                    }
                />

            </div>

            <div
                className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                "
                style={{
                    marginTop: "2rem",
                    padding: "1.25rem",
                }}
            >

                <div>

                    <h3
                        className="
                            text-lg
                            font-semibold
                            text-slate-900
                        "
                    >
                        Hiring Status
                    </h3>

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.25rem",
                        }}
                    >
                        Current availability of this
                        job posting.
                    </p>

                </div>

                <div
                    className={`
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        text-sm
                        font-semibold
                        ${
                            isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }
                    `}
                    style={{
                        padding: "0.5rem 1rem",
                    }}
                >

                    <CheckCircle2 size={18} />

                    {isActive
                        ? "Hiring Open"
                        : "Hiring Closed"}

                </div>

            </div>

        </Card>

    );

}

export default JobEligibilityCard;