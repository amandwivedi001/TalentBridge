import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, Plus } from "lucide-react";

function EmptyJobs() {

    const navigate = useNavigate();

    return (

        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                rounded-3xl
                border-2
                border-dashed
                border-slate-300
                bg-white
                text-center
            "
            style={{
                padding: "5rem 2rem",
            }}
        >

            <div
                className="
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-100
                "
            >

                <BriefcaseBusiness
                    size={42}
                    className="text-indigo-600"
                />

            </div>

            <h2
                className="
                    text-3xl
                    font-bold
                    text-slate-900
                "
                style={{
                    marginTop: "2rem",
                }}
            >
                No Jobs Posted Yet
            </h2>

            <p
                className="
                    max-w-lg
                    text-lg
                    leading-8
                    text-slate-500
                "
                style={{
                    marginTop: "1rem",
                }}
            >
                Start hiring talented students by
                creating your first job posting.
                Once published, applications will
                appear here automatically.
            </p>

            <button
                onClick={() =>
                    navigate("/recruiter/jobs/create")
                }
                className="
                    flex
                    h-14
                    items-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-indigo-600
                    to-violet-600
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-indigo-200
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                "
                style={{
                    marginTop: "2.5rem",
                    padding: "0 2rem",
                }}
            >

                <Plus size={20} />

                Create First Job

            </button>

        </div>

    );

}

export default EmptyJobs;