import {
    Inbox,
    BriefcaseBusiness,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../../common/Card";

function EmptyApplications() {

    const navigate =
        useNavigate();

    return (

        <Card
            className="
                flex
                flex-col
                items-center
                justify-center
                text-center
            "
            style={{
                paddingTop: "5rem",
                paddingBottom: "5rem",
            }}
        >

            <div
                className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-100
                "
            >

                <Inbox
                    size={40}
                    className="
                        text-indigo-600
                    "
                />

            </div>

            <h2
                className="
                    text-3xl
                    font-bold
                    text-slate-900
                "
                style={{ marginTop: "2rem" }}
            >
                No Applications Yet
            </h2>

            <p
                className="
                    max-w-xl
                    text-lg
                    leading-8
                    text-slate-500
                "
                style={{ marginTop: "1rem" }}
            >
                Once students start applying to your
                job postings, you'll be able to review
                their applications, evaluate AI resume
                analysis, and manage your hiring process
                from here.
            </p>

            <button
                onClick={() =>
                    navigate("/recruiter/jobs")
                }
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-indigo-600
                    to-violet-600
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                "
                style={{
                    marginTop: "2.5rem",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "0.75rem",
                    paddingBottom: "0.75rem",
                }}
            >

                <BriefcaseBusiness
                    size={18}
                />

                View Jobs

            </button>

        </Card>

    );

}

export default EmptyApplications;