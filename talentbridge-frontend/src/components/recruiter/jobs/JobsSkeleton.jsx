function Skeleton({ className = "", style = {} }) {
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

function JobsSkeleton() {
    return (
        <div
            className="max-w-7xl space-y-8"
            style={{
                margin: "0 auto",
            }}
        >

            {/* Hero */}

            <div
                className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600"
                style={{
                    padding: "2rem",
                }}
            >

                <Skeleton className="h-5 w-24 bg-white/30" />

                <Skeleton
                    className="h-12 w-96 bg-white/30"
                    style={{
                        marginTop: "2rem",
                    }}
                />

                <Skeleton
                    className="h-6 w-56 bg-white/20"
                    style={{
                        marginTop: "1rem",
                    }}
                />

                <div
                    className="flex flex-wrap gap-6"
                    style={{
                        marginTop: "2rem",
                    }}
                >

                    <Skeleton className="h-5 w-28 bg-white/20" />
                    <Skeleton className="h-5 w-28 bg-white/20" />
                    <Skeleton className="h-5 w-28 bg-white/20" />
                    <Skeleton className="h-5 w-36 bg-white/20" />

                </div>

                <div
                    className="flex gap-3"
                    style={{
                        marginTop: "2rem",
                    }}
                >

                    <Skeleton className="h-12 w-28 bg-white/30" />
                    <Skeleton className="h-12 w-40 bg-white/20" />
                    <Skeleton className="h-12 w-28 bg-white/20" />

                </div>

            </div>

            {/* Description */}

            <div
                className="rounded-3xl border border-slate-200 bg-white"
                style={{
                    padding: "2rem",
                }}
            >

                <Skeleton className="h-8 w-56" />

                <Skeleton
                    className="h-5 w-80"
                    style={{
                        marginTop: "0.75rem",
                    }}
                />

                <Skeleton
                    className="h-5 w-full"
                    style={{
                        marginTop: "2rem",
                    }}
                />

                <Skeleton
                    className="h-5 w-full"
                    style={{
                        marginTop: "0.75rem",
                    }}
                />

                <Skeleton
                    className="h-5 w-4/5"
                    style={{
                        marginTop: "0.75rem",
                    }}
                />

                <Skeleton
                    className="h-5 w-3/4"
                    style={{
                        marginTop: "0.75rem",
                    }}
                />

                <div
                    className="flex flex-wrap gap-3"
                    style={{
                        marginTop: "2.5rem",
                    }}
                >

                    {[1, 2, 3, 4, 5].map((item) => (
                        <Skeleton
                            key={item}
                            className="h-10 w-28 rounded-full"
                        />
                    ))}

                </div>

            </div>

            {/* Bottom Cards */}

            <div className="grid gap-8 xl:grid-cols-2">

                {/* Eligibility */}

                <div
                    className="rounded-3xl border border-slate-200 bg-white"
                    style={{
                        padding: "2rem",
                    }}
                >

                    <Skeleton className="h-8 w-52" />

                    <Skeleton
                        className="h-5 w-72"
                        style={{
                            marginTop: "0.75rem",
                        }}
                    />

                    <div
                        className="grid gap-5 md:grid-cols-3"
                        style={{
                            marginTop: "2rem",
                        }}
                    >

                        {[1, 2, 3].map((item) => (

                            <div
                                key={item}
                                className="rounded-2xl border border-slate-200"
                                style={{
                                    padding: "1.25rem",
                                }}
                            >

                                <Skeleton className="h-4 w-24" />

                                <Skeleton
                                    className="h-8 w-20"
                                    style={{
                                        marginTop: "1rem",
                                    }}
                                />

                            </div>

                        ))}

                    </div>

                    <Skeleton
                        className="h-24 w-full"
                        style={{
                            marginTop: "2rem",
                        }}
                    />

                </div>

                {/* Statistics */}

                <div
                    className="rounded-3xl border border-slate-200 bg-white"
                    style={{
                        padding: "2rem",
                    }}
                >

                    <Skeleton className="h-8 w-48" />

                    <Skeleton
                        className="h-5 w-60"
                        style={{
                            marginTop: "0.75rem",
                        }}
                    />

                    <div
                        className="grid gap-5 md:grid-cols-2"
                        style={{
                            marginTop: "2rem",
                        }}
                    >

                        {[1, 2, 3, 4].map((item) => (

                            <div
                                key={item}
                                className="rounded-2xl border border-slate-200"
                                style={{
                                    padding: "1.25rem",
                                }}
                            >

                                <Skeleton className="h-10 w-10 rounded-xl" />

                                <Skeleton
                                    className="h-4 w-20"
                                    style={{
                                        marginTop: "1rem",
                                    }}
                                />

                                <Skeleton
                                    className="h-7 w-28"
                                    style={{
                                        marginTop: "0.75rem",
                                    }}
                                />

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default JobsSkeleton;