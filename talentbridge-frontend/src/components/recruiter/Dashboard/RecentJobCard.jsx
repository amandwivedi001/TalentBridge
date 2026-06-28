import { useNavigate } from "react-router-dom";

import {
    BriefcaseBusiness,
    Calendar,
    ChevronRight,
    Users,
} from "lucide-react";

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

function RecentJobCard({
    job,
}) {

    const navigate =
        useNavigate();

    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >

            <div className="flex items-start justify-between">

                <div>

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                rounded-2xl
                                bg-indigo-100
                                p-3
                            "
                        >

                            <BriefcaseBusiness
                                size={22}
                                className="text-indigo-600"
                            />

                        </div>

                        <div>

                            <h3
                                className="
                                    text-xl
                                    font-semibold
                                    text-slate-900
                                "
                            >
                                {job.title}
                            </h3>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                "
                            >
                                {job.location}
                            </p>

                        </div>

                    </div>

                </div>

                <span
                    className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${
                            job.isActive
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                        }
                    `}
                >
                    {job.isActive ? "Open" : "Closed"}
                </span>

            </div>

            <div className="mt-8 flex items-center justify-between">

                <div className="flex items-center gap-2 text-slate-500">

                    <Calendar size={16} />

                    {formatDate(job.createdAt)}

                </div>

                <div className="flex items-center gap-2 text-slate-500">

                    <Users size={16} />

                    {job.applicationCount ?? 0} Applicants

                </div>

            </div>

            <button

                onClick={() =>
                    navigate(
                        `/recruiter/jobs/${job.id}`
                    )
                }

                className="
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-indigo-200
                    py-3
                    font-semibold
                    text-indigo-600
                    transition
                    hover:bg-indigo-50
                "
            >

                View Job

                <ChevronRight size={18} />

            </button>

        </div>

    );

}

export default RecentJobCard;