import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function InterviewCompleted() {
    return (
        <div
            className="min-h-screen bg-slate-50 flex items-center justify-center"
            style={{ padding: "0 24px" }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.92,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.45,
                }}
                className="
                    w-full
                    max-w-xl
                    rounded-3xl
                    bg-white
                    shadow-xl
                    border
                    border-slate-200
                    text-center
                "
                style={{ padding: "48px" }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 220,
                    }}
                    className="
                        flex
                        h-24
                        w-24
                        items-center
                        justify-center
                        rounded-full
                        bg-emerald-100
                    "
                    style={{ margin: "0 auto" }}
                >
                    <CheckCircle2
                        size={56}
                        className="text-emerald-500"
                    />
                </motion.div>

                <h1
                    className="text-4xl font-bold text-slate-900"
                    style={{ marginTop: "32px" }}
                >
                    Interview Completed
                </h1>

                <p
                    className="text-lg leading-8 text-slate-500"
                    style={{ marginTop: "16px" }}
                >
                    Your responses have been successfully analyzed by AI.
                </p>

                <p
                    className="text-slate-500"
                    style={{ marginTop: "8px" }}
                >
                    Preparing your personalized interview report...
                </p>

                <div
                    className="h-3 overflow-hidden rounded-full bg-slate-200"
                    style={{ marginTop: "40px" }}
                >
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                            duration: 1.8,
                            ease: "easeInOut",
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

                <p
                    className="text-sm text-slate-400"
                    style={{ marginTop: "20px" }}
                >
                    This usually takes only a moment.
                </p>
            </motion.div>
        </div>
    );
}

export default InterviewCompleted;