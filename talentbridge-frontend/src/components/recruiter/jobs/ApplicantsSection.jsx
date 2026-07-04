import {
    Users,
} from "lucide-react";

import ApplicantCard from "./ApplicantCard";

function ApplicantsSection({
    applicants = [],
}) {

    return (

        <section>

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
                style={{ marginBottom: "2rem" }}
            >

                <div>

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <div
                            className="
                                rounded-2xl
                                bg-indigo-100
                            "
                            style={{ padding: "0.75rem" }}
                        >

                            <Users
                                className="
                                    text-indigo-600
                                "
                                size={24}
                            />

                        </div>

                        <div>

                            <h2
                                className="
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                Applicants
                            </h2>

                            <p
                                className="
                                    text-slate-500
                                "
                                style={{ marginTop: "0.25rem" }}
                            >
                                Review every candidate who
                                applied for this position.
                            </p>

                        </div>

                    </div>

                </div>

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        shadow-sm
                    "
                    style={{
                        paddingLeft: "1.25rem",
                        paddingRight: "1.25rem",
                        paddingTop: "0.75rem",
                        paddingBottom: "0.75rem",
                    }}
                >

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                    >
                        Total Applicants
                    </p>

                    <h3
                        className="
                            text-3xl
                            font-bold
                            text-indigo-600
                        "
                        style={{ marginTop: "0.25rem" }}
                    >
                        {applicants.length}
                    </h3>

                </div>

            </div>

            {applicants.length === 0 ? (

                <div
                    className="
                        rounded-3xl
                        border
                        border-dashed
                        border-slate-300
                        bg-slate-50
                        text-center
                    "
                    style={{
                        paddingLeft: "2.5rem",
                        paddingRight: "2.5rem",
                        paddingTop: "5rem",
                        paddingBottom: "5rem",
                    }}
                >

                    <Users
                        size={48}
                        className="
                            text-slate-400
                        "
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    />

                    <h3
                        className="
                            text-2xl
                            font-bold
                            text-slate-900
                        "
                        style={{ marginTop: "1.5rem" }}
                    >
                        No Applicants Yet
                    </h3>

                    <p
                        className="
                            text-slate-500
                        "
                        style={{ marginTop: "0.75rem" }}
                    >
                        Students haven't applied to this
                        job yet. Once they do, you'll be
                        able to review their resumes and
                        manage their hiring status here.
                    </p>

                </div>

            ) : (

                <div
                    className="
                        space-y-6
                    "
                >

                    {applicants.map(
                        (
                            application
                        ) => (

                            <ApplicantCard
                                key={application.id}
                                application={application}
                            />

                        )
                    )}

                </div>

            )}

        </section>

    );

}

export default ApplicantsSection;