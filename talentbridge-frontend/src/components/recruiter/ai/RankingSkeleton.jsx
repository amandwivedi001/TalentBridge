import Card from "../../common/Card";

function Skeleton({
    className = "",
    style = {},
}) {

    return (
        <div
            className={`
                animate-pulse
                rounded-xl
                bg-slate-200
                ${className}
            `}
            style={style}
        />
    );

}

function RankingSkeleton() {

    return (

        <Card>

            {/* Header */}

            <div className="flex items-center gap-4">

                <Skeleton
                    className="
                        h-14
                        w-14
                        rounded-2xl
                    "
                />

                <div className="space-y-3">

                    <Skeleton
                        className="
                            h-7
                            w-56
                        "
                    />

                    <Skeleton
                        className="
                            h-4
                            w-80
                        "
                    />

                </div>

            </div>

            {/* Candidate Rows */}

            <div
                className="space-y-4"
                style={{ marginTop: "2rem" }}
            >

                {Array.from({
                    length: 4,
                }).map((_, index) => (

                    <div
                        key={index}
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-2xl
                            border
                            border-slate-200
                        "
                        style={{ padding: "1.25rem" }}
                    >

                        <div className="flex items-center gap-5">

                            <Skeleton
                                className="
                                    h-12
                                    w-12
                                    rounded-full
                                "
                            />

                            <div className="space-y-3">

                                <Skeleton
                                    className="
                                        h-5
                                        w-48
                                    "
                                />

                                <Skeleton
                                    className="
                                        h-4
                                        w-72
                                    "
                                />

                            </div>

                        </div>

                        <div className="flex items-center gap-6">

                            <div className="space-y-2">

                                <Skeleton
                                    className="
                                        h-4
                                        w-12
                                    "
                                />

                                <Skeleton
                                    className="
                                        h-8
                                        w-14
                                    "
                                />

                            </div>

                            <Skeleton
                                className="
                                    h-10
                                    w-28
                                "
                            />

                        </div>

                    </div>

                ))}

            </div>

        </Card>

    );

}

export default RankingSkeleton;