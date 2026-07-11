import Card from "../../common/Card";
import { Brain, Trophy } from "lucide-react";

function TopCandidates({

    candidates,

}) {

    return (

        <Card>

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <h2
                        className="
                            text-xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Top AI Candidates
                    </h2>

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.25rem",
                        }}
                    >
                        Highest AI match scores across all applications.
                    </p>

                </div>

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-violet-100"
                    >

                    <Brain
                        size={24}
                        className="text-violet-600"
                    />

                </div>

            </div>

            <div
                className="space-y-4"
                style={{
                    marginTop: "2rem",
                }}
            >

                {candidates.length === 0 ? (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-200
                            text-center
                            text-slate-500
                        "
                        style={{
                            paddingTop: "2.5rem",
                            paddingBottom: "2.5rem",
                        }}
                    >
                        No AI candidate matches available.
                    </div>

                ) : (

                    candidates.map(

                        (
                            candidate,
                            index
                        ) => (

                            <div
                                key={
                                    candidate.applicationId
                                }
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    transition
                                    hover:border-indigo-200
                                    hover:bg-indigo-50
                                "
                                style={{
                                    padding: "1rem",
                                }}
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-indigo-100
                                            font-bold
                                            text-indigo-700
                                        "
                                    >
                                        {candidate.studentName
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>

                                    <div>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <p
                                                className="
                                                    font-semibold
                                                    text-slate-900
                                                "
                                            >
                                                {candidate.studentName}
                                            </p>

                                            {index === 0 && (

                                                <Trophy
                                                    size={16}
                                                    className="text-amber-500"
                                                />

                                            )}

                                        </div>

                                        <p
                                            className="
                                                text-sm
                                                text-slate-500
                                            "
                                        >
                                            {candidate.jobTitle}
                                        </p>

                                    </div>

                                </div>

                                <div
                                    className="
                                        rounded-full
                                        bg-emerald-100
                                        text-sm
                                        font-bold
                                        text-emerald-700
                                    "
                                    style={{
                                        padding: "0.5rem 1rem",
                                    }}
                                >
                                    {candidate.matchScore}%
                                </div>

                            </div>

                        )

                    )

                )}

            </div>

        </Card>

    );

}

export default TopCandidates;