import {
    BriefcaseBusiness,
    FileText,
    BadgeCheck,
    Brain,
} from "lucide-react";

function StatCard({

    title,

    value,

    icon: Icon,

    bg,

    iconColor,

    suffix = "",

}) {

    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
            "
            style={{
                padding: "1.5rem",
            }}
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <p
                        className="
                            text-sm
                            font-medium
                            text-slate-500
                        "
                    >
                        {title}
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-slate-900
                        "
                        style={{
                            marginTop: "0.75rem",
                        }}
                    >
                        {value}
                        {suffix}
                    </h2>

                </div>

                <div
                    className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        ${bg}
                    `}
                >

                    <Icon
                        size={28}
                        className={iconColor}
                    />

                </div>

            </div>

        </div>

    );

}

function AnalyticsOverview({

    overview,

}) {

    const cards = [

        {

            title: "Jobs Posted",

            value: overview.totalJobs,

            icon: BriefcaseBusiness,

            bg: "bg-blue-100",

            iconColor: "text-blue-600",

        },

        {

            title: "Applications",

            value: overview.totalApplications,

            icon: FileText,

            bg: "bg-emerald-100",

            iconColor: "text-emerald-600",

        },

        {

            title: "Active Jobs",

            value: overview.activeJobs,

            icon: BadgeCheck,

            bg: "bg-amber-100",

            iconColor: "text-amber-600",

        },

        {

            title: "Average AI Match",

            value: overview.avgMatchScore,

            suffix: "%",

            icon: Brain,

            bg: "bg-violet-100",

            iconColor: "text-violet-600",

        },

    ];

    return (

        <section
            className="
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >

            {cards.map((card) => (

                <StatCard

                    key={card.title}

                    {...card}

                />

            ))}

        </section>

    );

}

export default AnalyticsOverview;