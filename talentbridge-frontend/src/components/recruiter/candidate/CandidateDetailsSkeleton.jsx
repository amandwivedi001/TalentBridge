import Card from "../../common/Card";

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

function CandidateDetailsSkeleton() {

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
                    p-10
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-8
                        lg:flex-row
                        lg:justify-between
                    "
                >

                    <div className="flex gap-5">

                        <Skeleton
                            className="
                                h-20
                                w-20
                                rounded-full
                                bg-white/40
                            "
                        />

                        <div className="space-y-4">

                            <Skeleton
                                className="
                                    h-10
                                    w-72
                                    bg-white/40
                                "
                            />

                            <Skeleton
                                className="
                                    h-5
                                    w-96
                                    bg-white/30
                                "
                            />

                            <Skeleton
                                className="
                                    h-5
                                    w-60
                                    bg-white/30
                                "
                            />

                        </div>

                    </div>

                    <Skeleton
                        className="
                            h-40
                            w-52
                            bg-white/30
                        "
                    />

                </div>

            </div>

            {/* Resume + Academic */}

            <div
                className="
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >

                {[1, 2].map((item) => (

                    <Card key={item}>

                        <Skeleton className="h-8 w-52" />

                        <Skeleton className="mt-4 h-5 w-full" />

                        <Skeleton className="mt-8 h-14 w-full" />

                        <Skeleton className="mt-4 h-12 w-48" />

                    </Card>

                ))}

            </div>

            {/* ATS */}

            <Card>

                <Skeleton className="h-8 w-48" />

                <Skeleton className="mt-6 h-36 w-full" />

            </Card>

            {/* Summary */}

            <Card>

                <Skeleton className="h-8 w-64" />

                <Skeleton className="mt-6 h-24 w-full" />

            </Card>

            {/* Skills */}

            <Card>

                <Skeleton className="h-8 w-56" />

                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        gap-3
                    "
                >

                    {Array.from({
                        length: 10,
                    }).map((_, index) => (

                        <Skeleton
                            key={index}
                            className="
                                h-10
                                w-28
                                rounded-full
                            "
                        />

                    ))}

                </div>

            </Card>

            {/* Strengths + Missing */}

            <div
                className="
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >

                {[1, 2].map((item) => (

                    <Card key={item}>

                        <Skeleton className="h-8 w-48" />

                        <div className="mt-6 space-y-3">

                            {[1, 2, 3].map((line) => (

                                <Skeleton
                                    key={line}
                                    className="h-5 w-full"
                                />

                            ))}

                        </div>

                    </Card>

                ))}

            </div>

            {/* Timeline */}

            <Card>

                <Skeleton className="h-8 w-52" />

                <div
                    className="
                        mt-8
                        flex
                        justify-between
                    "
                >

                    {Array.from({
                        length: 4,
                    }).map((_, index) => (

                        <div
                            key={index}
                            className="
                                flex
                                flex-col
                                items-center
                            "
                        >

                            <Skeleton
                                className="
                                    h-12
                                    w-12
                                    rounded-full
                                "
                            />

                            <Skeleton
                                className="
                                    mt-3
                                    h-4
                                    w-20
                                "
                            />

                        </div>

                    ))}

                </div>

            </Card>

            {/* Actions */}

            <Card>

                <Skeleton className="h-8 w-56" />

                <Skeleton className="mt-8 h-12 w-full" />

                <Skeleton className="mt-6 h-12 w-48" />

            </Card>

        </div>

    );

}

export default CandidateDetailsSkeleton;