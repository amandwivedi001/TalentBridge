import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SessionHeader({
    interviewType,
    difficulty,
}) {
    const navigate = useNavigate();

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
                sticky
                top-0
                z-20
                border-b
                border-slate-200
                bg-white/90
                backdrop-blur-lg
            "
        >
            <div
                className="flex max-w-5xl items-center justify-between"
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "1.25rem",
                    paddingBottom: "1.25rem",
                }}
            >
                <button
                    onClick={() => navigate(-1)}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        text-slate-600
                        transition-all
                        hover:bg-slate-100
                        hover:text-slate-900
                    "
                    style={{
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                    }}
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <div className="text-center">
                    <h1 className="text-xl font-bold text-slate-900">
                        AI Mock Interview
                    </h1>

                    <div
                        className="flex justify-center gap-3"
                        style={{ marginTop: "0.5rem" }}
                    >
                        <span
                            className="
                                rounded-full
                                bg-indigo-50
                                text-xs
                                font-semibold
                                text-indigo-700
                            "
                            style={{
                                paddingLeft: "0.75rem",
                                paddingRight: "0.75rem",
                                paddingTop: "0.25rem",
                                paddingBottom: "0.25rem",
                            }}
                        >
                            {interviewType}
                        </span>

                        <span
                            className="
                                rounded-full
                                bg-violet-50
                                text-xs
                                font-semibold
                                text-violet-700
                            "
                            style={{
                                paddingLeft: "0.75rem",
                                paddingRight: "0.75rem",
                                paddingTop: "0.25rem",
                                paddingBottom: "0.25rem",
                            }}
                        >
                            {difficulty}
                        </span>
                    </div>
                </div>

                <div className="w-20" />
            </div>
        </motion.header>
    );
}

export default SessionHeader;