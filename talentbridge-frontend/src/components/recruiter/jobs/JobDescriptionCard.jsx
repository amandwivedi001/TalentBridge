import { FileText } from "lucide-react";

import Card from "../../common/Card";

function JobDescriptionCard({
    description,
    skills = [],
}) {

    return (

        <Card>

            <div className="flex items-center gap-3">

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-indigo-100
                    "
                >

                    <FileText
                        size={24}
                        className="text-indigo-600"
                    />

                </div>

                <div>

                    <h2
                        className="
                            text-2xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Job Description
                    </h2>

                    <p
                        className="
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.25rem",
                        }}
                    >
                        Responsibilities, expectations and
                        required skills for this position.
                    </p>

                </div>

            </div>

            <div
                className="
                    rounded-2xl
                    bg-slate-50
                "
                style={{
                    marginTop: "2rem",
                    padding: "1.5rem",
                }}
            >

                <p
                    className="
                        whitespace-pre-line
                        leading-8
                        text-slate-700
                    "
                >
                    {description}
                </p>

            </div>

            <div
                style={{
                    marginTop: "2.5rem",
                }}
            >

                <h3
                    className="
                        text-lg
                        font-semibold
                        text-slate-900
                    "
                >
                    Required Skills
                </h3>

                <div
                    className="
                        flex
                        flex-wrap
                        gap-3
                    "
                    style={{
                        marginTop: "1.25rem",
                    }}
                >

                    {skills.length > 0 ? (

                        skills.map((skill) => (

                            <span
                                key={skill}
                                className="
                                    rounded-full
                                    bg-indigo-100
                                    text-sm
                                    font-medium
                                    text-indigo-700
                                "
                                style={{
                                    padding: "0.5rem 1rem",
                                }}
                            >
                                {skill}
                            </span>

                        ))

                    ) : (

                        <p className="text-slate-500">

                            No skills specified.

                        </p>

                    )}

                </div>

            </div>

        </Card>

    );

}

export default JobDescriptionCard;