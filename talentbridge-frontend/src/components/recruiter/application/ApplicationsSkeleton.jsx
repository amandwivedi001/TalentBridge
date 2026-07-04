import Card from "../../common/Card";

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

function SkeletonCard() {

    return (

        <Card>

            <div
                className="
                    flex
                    flex-col
                    gap-8
                    lg:flex-row
                    lg:justify-between
                "
            >

                {/* Left */}

                <div className="flex gap-5">

                    <Skeleton
                        className="
                            h-16
                            w-16
                            rounded-full
                        "
                    />

                    <div className="space-y-3">

                        <Skeleton className="h-7 w-56" />

                        <Skeleton className="h-4 w-72" />

                        <Skeleton className="h-4 w-52" />

                    </div>

                </div>

                {/* Right */}

                <div
                    className="
                        flex
                        flex-col
                        items-start
                        gap-4
                        lg:items-end
                    "
                >

                    <Skeleton className="h-9 w-32 rounded-full" />

                    <Skeleton className="h-11 w-40" />

                </div>

            </div>

            <div
                className="
                    grid
                    gap-4
                    md:grid-cols-3
                "
                style={{ marginTop: "2rem" }}
            >

                {[1, 2, 3].map((item) => (

                    <div
                        key={item}
                        className="
                            rounded-2xl
                            border
                            border-slate-200
                        "
                        style={{ padding: "1.25rem" }}
                    >

                        <Skeleton className="h-4 w-24" />

                        <Skeleton
                            className="h-8 w-20"
                            style={{ marginTop: "1rem" }}
                        />

                        <Skeleton
                            className="h-4 w-full"
                            style={{ marginTop: "1.25rem" }}
                        />

                    </div>

                ))}

            </div>

        </Card>

    );

}

function ApplicationsSkeleton() {

    return (

        <div className="space-y-8">

            {/* Hero */}

            <div
                className="
                    animate-pulse
                    rounded-3xl
                    bg-gradient-to-r
                    from-indigo-300
                    via-violet-300
                    to-blue-300
                "
                style={{ padding: "2.5rem" }}
            >

                <Skeleton className="h-10 w-72 bg-white/40" />

                <Skeleton
                    className="h-5 w-[500px] bg-white/30"
                    style={{ marginTop: "1.25rem" }}
                />

                <div
                    className="
                        grid
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                    style={{ marginTop: "2.5rem" }}
                >

                    {[1, 2, 3, 4].map((item) => (

                        <Skeleton
                            key={item}
                            className="
                                h-28
                                bg-white/30
                            "
                        />

                    ))}

                </div>

            </div>

            {/* Filters */}

            <Card>

                <div
                    className="
                        grid
                        gap-4
                        lg:grid-cols-4
                    "
                >

                    {[1, 2, 3, 4].map((item) => (

                        <Skeleton
                            key={item}
                            className="h-12"
                        />

                    ))}

                </div>

            </Card>

            {/* Cards */}

            <div className="space-y-6">

                {[1, 2, 3, 4].map((item) => (

                    <SkeletonCard
                        key={item}
                    />

                ))}

            </div>

        </div>

    );

}

export default ApplicationsSkeleton;