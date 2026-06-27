import {
    BriefcaseBusiness,
} from "lucide-react";

import RecentJobCard from "./RecentJobCard";

function RecentJobs({
    jobs = [],
}) {

    return (

        <section>

            <div
                className="flex items-center justify-between"
                style={{
                    marginBottom: "2rem",
                }}
            >

                <div>

                    <h2
                        className="
                            text-2xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Recent Jobs
                    </h2>

                    <p
                        className="
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.5rem",
                        }}
                    >
                        Monitor and manage your latest job postings.
                    </p>

                </div>

            </div>

            {jobs.length === 0 ? (

                <div
                    className="
                        rounded-3xl
                        border
                        border-dashed
                        border-slate-300
                        bg-white
                        text-center
                    "
                    style={{
                        padding: "3rem",
                    }}
                >

                    <BriefcaseBusiness
                        size={56}
                        className="
                            mx-auto
                            text-indigo-500
                        "
                    />

                    <h3
                        className="
                            text-2xl
                            font-bold
                            text-slate-900
                        "
                        style={{
                            marginTop: "1.5rem",
                        }}
                    >
                        No Jobs Posted Yet
                    </h3>

                    <p
                        className="
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.75rem",
                        }}
                    >
                        Create your first job posting to
                        start receiving applications.
                    </p>

                </div>

            ) : (

                <div
                    className="
                        grid
                        gap-6
                        lg:grid-cols-2
                    "
                >

                    {jobs
                        .slice(0, 4)
                        .map((job) => (

                            <RecentJobCard
                                key={job.id}
                                job={job}
                            />

                        ))}

                </div>

            )}

        </section>

    );

}

export default RecentJobs;