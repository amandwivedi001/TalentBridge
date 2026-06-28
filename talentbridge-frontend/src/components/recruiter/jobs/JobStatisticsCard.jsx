import {
    Users,
    CalendarDays,
    RefreshCw,
    Activity,
} from "lucide-react";

import Card from "../../common/Card";

function StatItem({
    icon: Icon,
    label,
    value,
    color,
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

            <div className="flex items-center gap-3">

                <div
                    className={`
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        ${color}
                    `}
                >

                    <Icon
                        size={20}
                    />

                </div>

                <div>

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                    >
                        {label}
                    </p>

                    <h3
                        className="
                            text-xl
                            font-bold
                            text-slate-900
                        "
                        style={{
                            marginTop: "0.25rem",
                        }}
                    >
                        {value}
                    </h3>

                </div>

            </div>

        </div>

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

function JobStatisticsCard({
    job,
}) {

    return (

        <Card>

            <div
                style={{
                    marginBottom: "2rem",
                }}
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-slate-900
                    "
                >
                    Job Statistics
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{
                        marginTop: "0.5rem",
                    }}
                >
                    Quick overview of this job posting.
                </p>

            </div>

            <div
                className="
                    grid
                    gap-5
                    md:grid-cols-2
                "
            >

                <StatItem
                    icon={Users}
                    label="Applicants"
                    value={job.applicationCount ?? 0}
                    color="
                        bg-indigo-100
                        text-indigo-600
                    "
                />

                <StatItem
                    icon={Activity}
                    label="Status"
                    value={
                        job.isActive
                            ? "Open"
                            : "Closed"
                    }
                    color={
                        job.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                    }
                />

                <StatItem
                    icon={CalendarDays}
                    label="Created"
                    value={formatDate(job.createdAt)}
                    color="
                        bg-blue-100
                        text-blue-600
                    "
                />

                <StatItem
                    icon={RefreshCw}
                    label="Last Updated"
                    value={formatDate(job.updatedAt)}
                    color="
                        bg-amber-100
                        text-amber-600
                    "
                />

            </div>

        </Card>

    );

}

export default JobStatisticsCard;