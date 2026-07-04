import {
    BrainCircuit,
    Trophy,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../../common/Card";

function CandidateRanking({
    candidates = [],
}) {

    const navigate =
        useNavigate();

    return (

        <Card>

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
                style={{ marginBottom: "2rem" }}
            >

                <div>

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                rounded-2xl
                                bg-indigo-100
                            "
                            style={{ padding: "0.75rem" }}
                        >

                            <BrainCircuit
                                className="text-indigo-600"
                                size={24}
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
                                AI Candidate Ranking
                            </h2>

                            <p
                                className="text-slate-500"
                                style={{ marginTop: "0.25rem" }}
                            >

                                Candidates ranked automatically
                                using AI resume matching.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {candidates.length === 0 ? (

                <div
                    className="
                        rounded-2xl
                        border
                        border-dashed
                        border-slate-300
                        bg-slate-50
                        text-center
                    "
                    style={{ padding: "2.5rem" }}
                >

                    <BrainCircuit
                        size={42}
                        className="
                            text-slate-400
                        "
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    />

                    <p
                        className="text-slate-500"
                        style={{ marginTop: "1rem" }}
                    >

                        AI rankings will appear after
                        candidates apply.

                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {candidates.map(

                        (candidate, index) => (

                            <div
                                key={candidate.applicationId}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    border
                                    border-slate-200
                                "
                                style={{ padding: "1.25rem" }}
                            >

                                <div className="flex items-center gap-5">

                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-amber-100
                                            text-amber-600
                                            font-bold
                                        "
                                    >

                                        {index === 0
                                            ? (
                                                <Trophy
                                                    size={20}
                                                />
                                            )
                                            : (
                                                index + 1
                                            )}

                                    </div>

                                    <div>

                                        <h3
                                            className="
                                                font-semibold
                                                text-slate-900
                                            "
                                        >
                                            {
                                                candidate.student.name
                                            }
                                        </h3>

                                        <p
                                            className="
                                                text-sm
                                                text-slate-500
                                            "
                                            style={{ marginTop: "0.25rem" }}
                                        >
                                            {
                                                candidate.reasoning
                                            }
                                        </p>

                                    </div>

                                </div>

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-6
                                    "
                                >

                                    <div className="text-center">

                                        <p className="text-xs text-slate-500">

                                            Match

                                        </p>

                                        <h3
                                            className="
                                                text-3xl
                                                font-bold
                                                text-indigo-600
                                            "
                                        >
                                            {
                                                candidate.matchScore
                                            }%
                                        </h3>

                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/recruiter/candidates/${candidate.applicationId}`
                                            )
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            bg-indigo-600
                                            text-white
                                            hover:bg-indigo-700
                                        "
                                        style={{
                                            paddingLeft: "1rem",
                                            paddingRight: "1rem",
                                            paddingTop: "0.5rem",
                                            paddingBottom: "0.5rem",
                                        }}
                                    >

                                        View

                                        <ArrowRight
                                            size={18}
                                        />

                                    </button>

                                </div>

                            </div>

                        )

                    )}

                </div>

            )}

        </Card>

    );

}

export default CandidateRanking;