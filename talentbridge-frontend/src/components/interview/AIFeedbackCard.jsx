import { Brain, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "../common/Card";

function AIFeedbackCard({ feedback }) {
    if (!feedback) return null;

    const score = Number(feedback.score ?? 0);

    const scoreColor =
        score >= 8
            ? "text-emerald-600 bg-emerald-50"
            : score >= 5
                ? "text-amber-600 bg-amber-50"
                : "text-red-600 bg-red-50";

    return (
        <AnimatePresence>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.98,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                exit={{
                    opacity: 0,
                    y: 20,
                }}
                transition={{
                    duration: 0.35,
                }}
            >
                <Card className="overflow-hidden rounded-3xl border border-violet-100">
                    {/* Header */}

                    <div className="flex items-center gap-3">
                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gradient-to-br
                                from-violet-500
                                to-indigo-600
                                text-white
                            "
                        >
                            <Brain size={22} />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                AI Evaluation
                            </h3>

                            <p className="text-sm text-slate-500">
                                Generated instantly after your submission.
                            </p>
                        </div>
                    </div>

                    {/* Divider */}

                    <div
                        className="h-px bg-slate-100"
                        style={{
                            marginTop: "1.5rem",
                            marginBottom: "1.5rem",
                        }}
                    />

                    {/* Score */}

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Score
                            </p>

                            <h2
                                className="text-4xl font-bold text-slate-900"
                                style={{ marginTop: "0.5rem" }}
                            >
                                {score}
                                <span className="text-2xl text-slate-400">
                                    /10
                                </span>
                            </h2>
                        </div>

                        <div
                            className={`
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                ${scoreColor}
                            `}
                        >
                            <Star size={28} />
                        </div>
                    </div>

                    {/* Feedback */}

                    <div style={{ marginTop: "2rem" }}>
                        <p
                            className="text-sm font-semibold uppercase tracking-wider text-slate-500"
                            style={{ marginBottom: "0.75rem" }}
                        >
                            Feedback
                        </p>

                        <div
                            className="
                                rounded-2xl
                                bg-slate-50
                            "
                            style={{ padding: "1.25rem" }}
                        >
                            <p className="whitespace-pre-line leading-8 text-slate-700">
                                {feedback.feedback}
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}

export default AIFeedbackCard;