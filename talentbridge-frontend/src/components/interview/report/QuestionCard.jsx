import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    CheckCircle2,
    AlertTriangle,
    XCircle,
} from "lucide-react";

import QuestionDetails from "./QuestionDetails";

function getScoreInfo(score = 0) {

    if (score >= 85) {

        return {
            color: "emerald",
            label: "Excellent",
            icon: CheckCircle2,
            badge:
                "bg-emerald-100 text-emerald-700",
        };

    }

    if (score >= 70) {

        return {
            color: "blue",
            label: "Good",
            icon: CheckCircle2,
            badge:
                "bg-blue-100 text-blue-700",
        };

    }

    if (score >= 55) {

        return {
            color: "amber",
            label: "Average",
            icon: AlertTriangle,
            badge:
                "bg-amber-100 text-amber-700",
        };

    }

    return {

        color: "red",

        label: "Needs Improvement",

        icon: XCircle,

        badge:
            "bg-red-100 text-red-700",

    };

}

function QuestionCard({

    question,

    index,

    expanded,

    onToggle,

}) {

    const scoreInfo = useMemo(
        () => getScoreInfo(question.score),
        [question.score]
    );

    const StatusIcon =
        scoreInfo.icon;

    return (

        <motion.div
            layout
            className="
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
            "
        >

            <button

                onClick={onToggle}

                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    p-6
                    text-left
                    transition
                    hover:bg-slate-50
                "

            >

                <div>

                    <p
                        className="
                            text-sm
                            font-medium
                            text-slate-500
                        "
                    >
                        Question {index + 1}
                    </p>

                    <h3
                        className="
                            mt-2
                            text-xl
                            font-semibold
                            text-slate-900
                        "
                    >
                        {scoreInfo.label}
                    </h3>

                </div>

                <div
                    className="
                        flex
                        items-center
                        gap-4
                    "
                >

                    <div
                        className={`
                            flex
                            items-center
                            gap-2
                            rounded-full
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            ${scoreInfo.badge}
                        `}
                    >

                        <StatusIcon
                            size={16}
                        />

                        {question.score}/100

                    </div>

                    <motion.div

                        animate={{
                            rotate: expanded
                                ? 180
                                : 0,
                        }}

                        transition={{
                            duration: 0.25,
                        }}

                    >

                        <ChevronDown
                            className="text-slate-500"
                        />

                    </motion.div>

                </div>

            </button>

            <AnimatePresence>

                {expanded && (

                    <motion.div

                        initial={{
                            opacity: 0,
                            height: 0,
                        }}

                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}

                        exit={{
                            opacity: 0,
                            height: 0,
                        }}

                        transition={{
                            duration: 0.25,
                        }}

                    >

                        <div className="border-t border-slate-200 px-6 pb-6">

                            <QuestionDetails
                                question={question}
                            />

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </motion.div>

    );

}

export default QuestionCard;