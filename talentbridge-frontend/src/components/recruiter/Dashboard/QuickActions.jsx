import {
    Plus,
    BriefcaseBusiness,
    Users,
    Bell,
} from "lucide-react";

import QuickActionCard from "./QuickActionCard";

function QuickActions() {

    const actions = [

        {
            title: "Create Job",
            description:
                "Post a new job opening for students.",
            icon: Plus,
            color: "indigo",
            to: "/recruiter/jobs/create",
        },

        {
            title: "Manage Jobs",
            description:
                "Edit, update and monitor job postings.",
            icon: BriefcaseBusiness,
            color: "blue",
            to: "/recruiter/jobs",
        },

        {
            title: "Candidates",
            description:
                "Review applicants and shortlist talent.",
            icon: Users,
            color: "amber",
            to: "/recruiter/candidates",
        },

        {
            title: "Notifications",
            description:
                "Stay updated with hiring activity.",
            icon: Bell,
            color: "emerald",
            to: "/recruiter/notifications",
        },

    ];

    return (

        <section>

            <div
                style={{
                    marginBottom: "1.5rem",
                }}
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-slate-900
                    "
                >
                    Quick Actions
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{
                        marginTop: "0.5rem",
                    }}
                >
                    Frequently used recruiter tools.
                </p>

            </div>

            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {actions.map((action) => (

                    <QuickActionCard
                        key={action.title}
                        {...action}
                    />

                ))}

            </div>

        </section>

    );

}

export default QuickActions;