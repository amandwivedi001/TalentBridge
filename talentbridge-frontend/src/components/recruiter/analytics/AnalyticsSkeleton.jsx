function Skeleton({
    className = "",
    style = {},
}) {

    return (

        <div
            className={`
                animate-pulse
                rounded-2xl
                bg-slate-200
                ${className}
            `}
            style={style}
        />

    );

}

function AnalyticsSkeleton() {

    return (

        <div className="space-y-8">

            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {Array.from({
                    length: 4,
                }).map((_, index) => (

                    <div
                        key={index}
                        className="
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                        "
                        style={{
                            padding: "1.5rem",
                        }}
                    >

                        <Skeleton
                            className="
                                h-4
                                w-28
                            "
                        />

                        <Skeleton
                            className="
                                h-10
                                w-20
                            "
                            style={{
                                marginTop: "1.5rem",
                            }}
                        />

                    </div>

                ))}

            </div>

            <Skeleton
                className="
                    h-96
                    w-full
                "
            />

            <div
                className="
                    grid
                    gap-8
                    xl:grid-cols-2
                "
            >

                <Skeleton
                    className="
                        h-80
                        w-full
                    "
                />

                <Skeleton
                    className="
                        h-80
                        w-full
                    "
                />

            </div>

            <Skeleton
                className="
                    h-80
                    w-full
                "
            />

        </div>

    );

}

export default AnalyticsSkeleton;