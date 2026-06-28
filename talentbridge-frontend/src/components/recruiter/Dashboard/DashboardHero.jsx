import {
    BriefcaseBusiness,
    Building2,
    Users,
} from "lucide-react";

import Card from "../../common/Card";

function DashboardHero({
    recruiter,
    stats,
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

            {/* Decorative Circles */}

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
                    right-24
                    h-24
                    w-24
                    rounded-full
                    bg-white/5
                "
            />

            {/* Content */}

            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    gap-10
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Left */}

                <div className="max-w-3xl">

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-white/20
                            backdrop-blur
                        "
                    >

                        <BriefcaseBusiness size={28} />

                    </div>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            md:text-5xl
                        "
                        style={{
                            marginTop: "1.25rem",
                        }}
                    >
                        Welcome back,
                        {" "}
                        {recruiter?.firstName || "Recruiter"} 👋
                    </h1>

                    <p
                        className="
                            max-w-2xl
                            text-lg
                            leading-8
                            text-indigo-100
                        "
                        style={{
                            marginTop: "1rem",
                        }}
                    >
                        Manage jobs, review applications,
                        shortlist candidates and streamline
                        your hiring process from one place.
                    </p>

                </div>

                {/* Right */}

                <div
                    className="
                        grid
                        grid-cols-2
                        gap-4
                    "
                >

                    <div
                        className="
                            rounded-2xl
                            bg-white/15
                            backdrop-blur
                        "
                        style={{
                            padding: "1.25rem",
                        }}
                    >

                        <Building2
                            className="text-white"
                            size={22}
                        />

                        <p
                            className="text-3xl font-bold"
                            style={{
                                marginTop: "0.75rem",
                            }}
                        >

                            {stats.activeJobs}

                        </p>

                        <p className="text-indigo-100">

                            Active Jobs

                        </p>

                    </div>

                    <div
                        className="
                            rounded-2xl
                            bg-white/15
                            backdrop-blur
                        "
                        style={{
                            padding: "1.25rem",
                        }}
                    >

                        <Users
                            className="text-white"
                            size={22}
                        />

                        <p
                            className="text-3xl font-bold"
                            style={{
                                marginTop: "0.75rem",
                            }}
                        >

                            {stats.candidates}

                        </p>

                        <p className="text-indigo-100">

                            Candidates

                        </p>

                    </div>

                </div>

            </div>

        </Card>

    );

}

export default DashboardHero;