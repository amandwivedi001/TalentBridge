function JobStatusBadge({
    isActive,
}) {

    return (

        <span
            style={{
                padding: "0.375rem 0.75rem",
            }}
            className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                text-xs
                font-semibold
                ${
                    isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                }
            `}
        >

            <span
                className={`
                    h-2
                    w-2
                    rounded-full
                    ${
                        isActive
                            ? "bg-emerald-500"
                            : "bg-red-500"
                    }
                `}
            />

            {isActive
                ? "Hiring Open"
                : "Hiring Closed"}

        </span>

    );

}

export default JobStatusBadge;