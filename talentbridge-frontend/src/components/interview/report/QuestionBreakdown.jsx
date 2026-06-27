import { useState } from "react";
import { ListChecks } from "lucide-react";

import QuestionCard from "./QuestionCard";

function QuestionBreakdown({
    questions = [],
}) {

    const [expandedIndex, setExpandedIndex] =
        useState(0);

    const handleToggle = (index) => {

        setExpandedIndex((prev) =>
            prev === index ? -1 : index
        );

    };

    return (

        <section>

            <div
                style={{
                    marginBottom: "32px",
                }}
            >

                <div className="flex items-center gap-3">

                    <div
                        className="
                            rounded-2xl
                            bg-indigo-100
                        "
                        style={{
                            padding: "12px",
                        }}
                    >

                        <ListChecks
                            className="text-indigo-600"
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
                            Question Breakdown
                        </h2>

                        <p
                            className="
                                text-slate-500
                            "
                            style={{
                                marginTop: "8px",
                            }}
                        >
                            Review each interview question,
                            your answer, and the AI evaluation.
                        </p>

                    </div>

                </div>

            </div>

            <div className="space-y-5">

                {questions.map(
                    (
                        question,
                        index
                    ) => (

                        <QuestionCard

                            key={question.id}

                            question={question}

                            index={index}

                            expanded={
                                expandedIndex ===
                                index
                            }

                            onToggle={() =>
                                handleToggle(index)
                            }

                        />

                    )
                )}

            </div>

        </section>

    );

}

export default QuestionBreakdown;