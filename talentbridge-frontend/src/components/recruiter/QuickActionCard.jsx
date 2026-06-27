import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActionCard({
    title,
    description,
    icon: Icon,
    color = "indigo",
    to,
}) {

    const navigate = useNavigate();

    const colors = {
        indigo: {
            bg: "bg-indigo-100",
            text: "text-indigo-600",
        },

        emerald: {
            bg: "bg-emerald-100",
            text: "text-emerald-600",
        },

        amber: {
            bg: "bg-amber-100",
            text: "text-amber-600",
        },

        blue: {
            bg: "bg-blue-100",
            text: "text-blue-600",
        },
    };

    const theme = colors[color];

    return (

        <button

            onClick={() => navigate(to)}

            className="
                group
                w-full
                rounded-3xl
                border
                border-slate-200
                bg-white
                text-left
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-indigo-200
                hover:shadow-xl
            "
            style={{
                padding: "1.5rem",
            }}

        >

            <div className="flex items-start justify-between">

                <div>

                    <div
                        className={`
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            ${theme.bg}
                        `}
                    >

                        <Icon
                            className={theme.text}
                            size={26}
                        />

                    </div>

                    <h3
                        className="
                            text-xl
                            font-semibold
                            text-slate-900
                        "
                        style={{
                            marginTop: "1.25rem",
                        }}
                    >
                        {title}
                    </h3>

                    <p
                        className="
                            leading-7
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.5rem",
                        }}
                    >
                        {description}
                    </p>

                </div>

                <ChevronRight
                    className="
                        text-slate-400
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                    "
                />

            </div>

        </button>

    );

}

export default QuickActionCard;