function Skeleton({
    className = "",
}) {

    return (

        <div
            className={`
                animate-pulse
                rounded-2xl
                bg-slate-200
                ${className}
            `}
        />

    );

}

function DashboardSkeleton() {

    return (

        <div
            className="
                max-w-7xl
                space-y-8
            "
            style={{
                margin: "0 auto",
                padding: "2rem 1.5rem",
            }}
        >

            {/* Hero */}

            <Skeleton
                className="
                    h-72
                    rounded-3xl
                "
            />

            {/* Stats */}

            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {[1, 2, 3, 4].map((item) => (

                    <Skeleton
                        key={item}
                        className="
                            h-40
                        "
                    />

                ))}

            </div>

            {/* Quick Actions */}

            <div>

                <Skeleton
                    className="
                        h-8
                        w-56
                    "
                />

                <Skeleton
                    className="
                        h-5
                        w-80
                    "
                    style={{
                        marginTop: "0.75rem",
                    }}
                />

                <div
                    className="
                        grid
                        gap-6
                        md:grid-cols-2
                        xl:grid-cols-4
                    "
                    style={{
                        marginTop: "1.5rem",
                    }}
                >

                    {[1, 2, 3, 4].map((item) => (

                        <Skeleton
                            key={item}
                            className="
                                h-56
                            "
                        />

                    ))}

                </div>

            </div>

            {/* Pipeline */}

            <Skeleton
                className="
                    h-56
                    rounded-3xl
                "
            />

            {/* Recent Jobs */}

            <div>

                <Skeleton
                    className="
                        h-8
                        w-52
                    "
                />

                <Skeleton
                    className="
                        h-5
                        w-72
                    "
                    style={{
                        marginTop: "0.75rem",
                    }}
                />

                <div
                    className="
                        grid
                        gap-6
                        lg:grid-cols-2
                    "
                    style={{
                        marginTop: "1.5rem",
                    }}
                >

                    {[1, 2, 3, 4].map((item) => (

                        <Skeleton
                            key={item}
                            className="
                                h-60
                            "
                        />

                    ))}

                </div>

            </div>

        </div>

    );

}

export default DashboardSkeleton;