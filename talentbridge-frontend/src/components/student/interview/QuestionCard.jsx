import { motion, AnimatePresence } from "framer-motion";
import Card from "../../common/Card";

function QuestionCard({
    question,
    questionNumber,
}) {
    return (
        <Card className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={questionNumber}
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: -20,
                    }}
                    transition={{
                        duration: 0.35,
                    }}
                    className="space-y-8"
                >
                    <div>
                        <p
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-widest
                                text-indigo-600
                            "
                        >
                            Question
                        </p>
                    </div>

                    <h2
                        className="
                            text-3xl
                            font-bold
                            leading-relaxed
                            text-slate-900
                        "
                    >
                        {question}
                    </h2>
                </motion.div>
            </AnimatePresence>
        </Card>
    );
}

export default QuestionCard;