import Card from "../../common/Card";

function RecruiterStatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color = "indigo",
}) {

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

    const theme =
        colors[color] ||
        colors.indigo;

    return (

        <Card
            className="
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >

            <div
                className="
                    flex
                    items-start
                    justify-between
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
                        {title}
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-slate-900
                        "
                        style={{
                            marginTop: "0.75rem",
                        }}
                    >
                        {value}
                    </h2>

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.5rem",
                        }}
                    >
                        {subtitle}
                    </p>

                </div>

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
                        size={28}
                        className={theme.text}
                    />

                </div>

            </div>

        </Card>

    );

}

export default RecruiterStatCard;