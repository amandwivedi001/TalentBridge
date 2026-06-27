import Card from "../common/Card";

import {
    Send,
    UserCheck,
    MessagesSquare,
    Trophy,
    ChevronRight,
} from "lucide-react";

const stages = [

    {
        key: "applied",
        title: "Applied",
        icon: Send,
        color: "blue",
    },

    {
        key: "shortlisted",
        title: "Shortlisted",
        icon: UserCheck,
        color: "amber",
    },

    {
        key: "interview",
        title: "Interview",
        icon: MessagesSquare,
        color: "indigo",
    },

    {
        key: "hired",
        title: "Hired",
        icon: Trophy,
        color: "emerald",
    },

];

const colors = {

    blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
    },

    amber: {
        bg: "bg-amber-100",
        text: "text-amber-600",
    },

    indigo: {
        bg: "bg-indigo-100",
        text: "text-indigo-600",
    },

    emerald: {
        bg: "bg-emerald-100",
        text: "text-emerald-600",
    },

};

function HiringPipeline({

    applied = 0,

    shortlisted = 0,

    interview = 0,

    hired = 0,

}) {

    const values = {

        applied,

        shortlisted,

        interview,

        hired,

    };

    return (

        <Card>

            <div
                style={{
                    marginBottom: "2rem",
                }}
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-slate-900
                    "
                >
                    Hiring Pipeline
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{
                        marginTop: "0.5rem",
                    }}
                >
                    Monitor candidate progress
                    through each hiring stage.
                </p>

            </div>

            <div
                className="
                    flex
                    flex-col
                    gap-6
                    xl:flex-row
                    xl:items-center
                "
            >

                {stages.map(
                    (
                        stage,
                        index
                    ) => {

                        const theme =
                            colors[
                                stage.color
                            ];

                        const Icon =
                            stage.icon;

                        return (

                            <div
                                key={stage.key}
                                className="
                                    flex
                                    flex-1
                                    items-center
                                "
                            >

                                <div
                                    className="
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                    "
                                    style={{
                                        padding: "1.25rem",
                                    }}
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <div>

                                            <p
                                                className="
                                                    text-sm
                                                    text-slate-500
                                                "
                                            >
                                                {stage.title}
                                            </p>

                                            <h3
                                                className="
                                                    text-3xl
                                                    font-bold
                                                    text-slate-900
                                                "
                                                style={{
                                                    marginTop: "0.5rem",
                                                }}
                                            >
                                                {
                                                    values[
                                                        stage.key
                                                    ]
                                                }
                                            </h3>

                                        </div>

                                        <div
                                            className={`
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-xl
                                                ${theme.bg}
                                            `}
                                        >

                                            <Icon
                                                size={22}
                                                className={
                                                    theme.text
                                                }
                                            />

                                        </div>

                                    </div>

                                </div>

                                {index <
                                    stages.length -
                                        1 && (

                                    <ChevronRight
                                        className="
                                            hidden
                                            text-slate-300
                                            xl:block
                                        "
                                        style={{
                                            margin: "0 1rem",
                                        }}
                                        size={28}
                                    />

                                )}

                            </div>

                        );

                    }
                )}

            </div>

        </Card>

    );

}

export default HiringPipeline;