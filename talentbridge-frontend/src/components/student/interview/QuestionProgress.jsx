import { motion } from "framer-motion";

function QuestionProgress({
    current,
    total,
}) {
    const percentage =
        ((current + 1) / total) * 100;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700">
                    Question {current + 1} of {total}
                </h3>

                <span className="text-sm text-slate-500">
                    {Math.round(percentage)}%
                </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{
                        width: `${percentage}%`,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-indigo-600
                        to-violet-600
                    "
                />
            </div>
        </div>
    );
}

export default QuestionProgress;