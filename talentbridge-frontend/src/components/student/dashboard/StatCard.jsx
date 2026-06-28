import Card from "../../common/Card";

const colorVariants = {
    blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
    },
    amber: {
        bg: "bg-amber-50",
        text: "text-amber-600",
    },
    purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
    },
    green: {
        bg: "bg-green-50",
        text: "text-green-600",
    },
};

function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color = "blue",
}) {
    const variant = colorVariants[color];

    return (
        <Card className="transition-all duration-300 hover:shadow-md">
    <div
        className="flex items-start justify-between"
        style={{
            minHeight: "120px",
            padding: "16px",
        }}
    >
        <div>
            <p
                className="text-sm text-slate-500"
                style={{
                    marginBottom: "8px",
                }}
            >
                {title}
            </p>

            <h3
                className="font-bold text-slate-900"
                style={{
                    fontSize: "2.25rem",
                    lineHeight: "1",
                    marginBottom: "10px",
                }}
            >
                {value}
            </h3>

            {subtitle && (
                <p
                    className="text-sm text-slate-500"
                    style={{
                        marginTop: "4px",
                    }}
                >
                    {subtitle}
                </p>
            )}
        </div>

        {Icon && (
            <div
                className={`flex items-center justify-center ${variant.bg}`}
                style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "16px",
                }}
            >
                <Icon
                    size={24}
                    className={variant.text}
                />
            </div>
        )}
    </div>
</Card>
    );
}

export default StatCard;