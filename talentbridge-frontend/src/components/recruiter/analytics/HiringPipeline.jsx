import Card from "../../common/Card";

const STATUS_CONFIG = {

    APPLIED: {
        label: "Applied",
        color: "bg-slate-500",
    },

    SHORTLISTED: {
        label: "Shortlisted",
        color: "bg-blue-500",
    },

    INTERVIEW: {
        label: "Interview",
        color: "bg-amber-500",
    },

    HIRED: {
        label: "Hired",
        color: "bg-emerald-500",
    },

    REJECTED: {
        label: "Rejected",
        color: "bg-red-500",
    },

    WITHDRAWN: {
        label: "Withdrawn",
        color: "bg-slate-400",
    },

};

function HiringPipeline({

    pipeline,

}) {

    const totalApplications =
        Object.values(pipeline).reduce(
            (sum, value) => sum + value,
            0
        );

    return (

        <Card>

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <h2
                        className="
                            text-xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Hiring Pipeline
                    </h2>

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.25rem",
                        }}
                    >
                        Candidate progress across every hiring stage.
                    </p>

                </div>

                <span
                    className="
                        rounded-full
                        bg-indigo-100
                        text-sm
                        font-semibold
                        text-indigo-700
                    "
                    style={{
                        padding: "0.5rem 1rem",
                    }}
                >
                    {totalApplications} Applications
                </span>

            </div>

            <div
                className="space-y-6"
                style={{
                    marginTop: "2rem",
                }}
            >

                {Object.entries(
                    STATUS_CONFIG
                ).map(

                    ([status, config]) => {

                        const value =
                            pipeline[status] || 0;

                        const percentage =
                            totalApplications
                                ? Math.round(
                                    (value /
                                        totalApplications) *
                                    100
                                )
                                : 0;

                        return (

                            <div
                                key={status}
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                    style={{
                                        marginBottom: "0.5rem",
                                    }}
                                >

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                            text-slate-700
                                        "
                                    >
                                        {config.label}
                                    </span>

                                    <span
                                        className="
                                            text-sm
                                            font-semibold
                                            text-slate-900
                                        "
                                    >
                                        {value}
                                        {" • "}
                                        {percentage}%
                                    </span>

                                </div>

                                <div
                                    className="
                                        h-3
                                        overflow-hidden
                                        rounded-full
                                        bg-slate-200
                                    "
                                >

                                    <div
                                        className={`
                                            h-full
                                            rounded-full
                                            transition-all
                                            duration-500
                                            ${config.color}
                                        `}
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />

                                </div>

                            </div>

                        );

                    }

                )}

            </div>

        </Card>

    );

}

export default HiringPipeline;