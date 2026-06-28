import { useNavigate } from "react-router-dom";

import Card from "../../../common/Card";

import {
    ArrowLeft,
    RotateCcw,
} from "lucide-react";

function ReportActions() {

    const navigate =
        useNavigate();

    return (

        <Card>

            <div
                className="
                    flex
                    flex-col
                    items-center
                    text-center
                "
            >

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-slate-900
                    "
                >
                    Ready for another challenge?
                </h2>

                <p
                    className="
                        max-w-2xl
                        text-lg
                        leading-8
                        text-slate-500
                    "
                    style={{
                        marginTop: "16px",
                    }}
                >
                    Keep practicing with AI-powered
                    interviews and track your
                    improvement over time.
                </p>

                <div
                    className="
                        flex
                        flex-wrap
                        justify-center
                        gap-5
                    "
                    style={{
                        marginTop: "40px",
                    }}
                >

                    <button

                        onClick={() =>
                            navigate(
                                "/student/interviews"
                            )
                        }

                        className="
                            flex
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
                            hover:shadow-xl
                        "
                        style={{
                            padding: "16px 32px",
                        }}
                    >

                        <RotateCcw size={20} />

                        Start New Interview

                    </button>

                    <button

                        onClick={() =>
                            navigate(
                                "/student/dashboard"
                            )
                        }

                        className="
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            font-semibold
                            text-slate-700
                            transition
                            hover:bg-slate-50
                        "
                        style={{
                            padding: "16px 32px",
                        }}
                    >

                        <ArrowLeft size={20} />

                        Back to Dashboard

                    </button>

                </div>

            </div>

        </Card>

    );

}

export default ReportActions;