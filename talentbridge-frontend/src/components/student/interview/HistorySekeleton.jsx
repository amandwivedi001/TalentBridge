function Skeleton({
    className = "",
    style,
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

function HistorySkeleton() {

    return (

        <section>

            <div
                className="flex items-center justify-between"
                style={{
                    marginBottom: "32px",
                }}
            >

                <div>

                    <Skeleton className="h-8 w-64" />

                    <Skeleton
                        className="h-5 w-96"
                        style={{
                            marginTop: "12px",
                        }}
                    />

                </div>

                <Skeleton className="h-10 w-28 rounded-full" />

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                {[1, 2, 3, 4].map((item) => (

                    <div
                        key={item}
                        className="
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                        "
                        style={{
                            padding: "24px",
                        }}
                    >

                        <div className="flex justify-between">

                            <div className="flex gap-4">

                                <Skeleton className="h-14 w-14 rounded-2xl" />

                                <div>

                                    <Skeleton className="h-6 w-40" />

                                    <Skeleton
                                        className="h-4 w-20"
                                        style={{
                                            marginTop: "12px",
                                        }}
                                    />

                                </div>

                            </div>

                            <Skeleton className="h-9 w-16 rounded-full" />

                        </div>

                        <div
                            className="flex justify-between"
                            style={{
                                marginTop: "32px",
                            }}
                        >

                            <Skeleton className="h-4 w-32" />

                            <Skeleton className="h-7 w-24 rounded-full" />

                        </div>

                        <Skeleton
                            className="h-12 w-full rounded-2xl"
                            style={{
                                marginTop: "32px",
                            }}
                        />

                    </div>

                ))}

            </div>

        </section>

    );

}

export default HistorySkeleton;