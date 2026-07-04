import {
    FileCheck,
    Users,
    BadgeCheck,
    Briefcase,
} from "lucide-react";

import Card from "../../common/Card";

function Stat({
    label,
    value,
    icon: Icon,
}) {

    return (

        <div
            className="
                rounded-2xl
                bg-white/10
                backdrop-blur
            "
            style={{ padding: "1.25rem" }}
        >

            <div className="flex items-center justify-between">

                <div>

                    <p
                        className="
                            text-sm
                            text-indigo-100
                        "
                    >
                        {label}
                    </p>

                    <h3
                        className="
                            text-3xl
                            font-bold
                        "
                        style={{ marginTop: "0.5rem" }}
                    >
                        {value}
                    </h3>

                </div>

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white/15
                    "
                >

                    <Icon size={24} />

                </div>

            </div>

        </div>

    );

}

function ApplicationHero({

    total = 0,

    shortlisted = 0,

    interview = 0,

    hired = 0,

}) {

    return (

        <Card
            className="
                relative
                overflow-hidden
                border-0
                bg-gradient-to-r
                from-violet-600
                via-indigo-600
                to-blue-600
                text-white
                shadow-2xl
            "
        >

            {/* Decorations */}

            <div
                className="
                    absolute
                    -right-10
                    -top-10
                    h-40
                    w-40
                    rounded-full
                    bg-white/10
                "
            />

            <div
                className="
                    absolute
                    bottom-0
                    right-28
                    h-24
                    w-24
                    rounded-full
                    bg-white/5
                "
            />

            <div className="relative z-10">

                <div
                    className="
                        flex
                        flex-col
                        gap-10
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    {/* Left */}

                    <div className="max-w-2xl">

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-white/20
                            "
                            style={{ marginBottom: "1.25rem" }}
                        >

                            <FileCheck size={28} />

                        </div>

                        <h1
                            className="
                                text-4xl
                                font-bold
                                md:text-5xl
                            "
                        >
                            Applications
                        </h1>

                        <p
                            className="
                                text-lg
                                leading-8
                                text-indigo-100
                            "
                            style={{ marginTop: "1.25rem" }}
                        >
                            Review candidate applications,
                            evaluate AI-powered resume analysis,
                            and manage every stage of your hiring
                            process from one place.
                        </p>

                    </div>

                    {/* Right */}

                    <div
                        className="
                            grid
                            gap-4
                            sm:grid-cols-2
                        "
                    >

                        <Stat
                            label="Applications"
                            value={total}
                            icon={Users}
                        />

                        <Stat
                            label="Shortlisted"
                            value={shortlisted}
                            icon={BadgeCheck}
                        />

                        <Stat
                            label="Interview"
                            value={interview}
                            icon={Briefcase}
                        />

                        <Stat
                            label="Hired"
                            value={hired}
                            icon={FileCheck}
                        />

                    </div>

                </div>

            </div>

        </Card>

    );

}

export default ApplicationHero;