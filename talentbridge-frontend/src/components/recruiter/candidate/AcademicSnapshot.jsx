import {
    GraduationCap,
    School,
    Award,
} from "lucide-react";

import Card from "../../common/Card";

function StatCard({
    icon: Icon,
    title,
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
            style={{ padding: "1.5rem" }}
        >

            <div
                className="
                    flex
                    items-center
                    gap-4
                "
            >

                <div
                    className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        ${color}
                    `}
                >

                    <Icon
                        size={22}
                    />

                </div>

                <div>

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                    >
                        {title}
                    </p>

                    <h3
                        className="
                            text-2xl
                            font-bold
                            text-slate-900
                        "
                        style={{ marginTop: "0.25rem" }}
                    >
                        {value}
                    </h3>

                </div>

            </div>

        </div>

    );

}

function AcademicSnapshot({

    cgpa,

    tenth,

    twelfth,

}) {

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
                    Academic Snapshot
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{ marginTop: "0.5rem" }}
                >
                    Academic performance extracted
                    from the candidate's resume.
                </p>

            </div>

            <div
                className="
                    grid
                    gap-5
                    md:grid-cols-3
                "
            >

                <StatCard
                    icon={GraduationCap}
                    title="CGPA"
                    value={
                        cgpa ?? "--"
                    }
                    color="
                        bg-indigo-100
                        text-indigo-600
                    "
                />

                <StatCard
                    icon={School}
                    title="10th Percentage"
                    value={
                        tenth
                            ? `${tenth}%`
                            : "--"
                    }
                    color="
                        bg-emerald-100
                        text-emerald-600
                    "
                />

                <StatCard
                    icon={Award}
                    title="12th Percentage"
                    value={
                        twelfth
                            ? `${twelfth}%`
                            : "--"
                    }
                    color="
                        bg-amber-100
                        text-amber-600
                    "
                />

            </div>

        </Card>

    );

}

export default AcademicSnapshot;