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

function SettingsSkeleton() {

    return (

        <div
            className="
                max-w-5xl
                space-y-8
            "
            style={{
                margin: "0 auto",
            }}
        >

            <div>

                <Skeleton
                    className="
                        h-10
                        w-64
                    "
                />

                <Skeleton
                    className="
                        h-5
                        w-96
                    "
                    style={{
                        marginTop: "1rem",
                    }}
                />

            </div>

            <div
                className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                "
                style={{
                    padding: "2rem",
                }}
            >

                <Skeleton
                    className="
                        h-8
                        w-56
                    "
                />

                <div
                    className="
                        grid
                        gap-6
                        md:grid-cols-2
                    "
                    style={{
                        marginTop: "2rem",
                    }}
                >

                    {Array.from({
                        length: 6,
                    }).map((_, index) => (

                        <div
                            key={index}
                        >

                            <Skeleton
                                className="
                                    h-4
                                    w-28
                                "
                            />

                            <Skeleton
                                className="
                                    h-12
                                    w-full
                                "
                                style={{
                                    marginTop: "0.75rem",
                                }}
                            />

                        </div>

                    ))}

                </div>

            </div>

            <div
                className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                "
                style={{
                    padding: "2rem",
                }}
            >

                <Skeleton
                    className="
                        h-8
                        w-48
                    "
                />

                <div
                    className="
                        grid
                        gap-6
                    "
                    style={{
                        marginTop: "2rem",
                    }}
                >

                    {Array.from({
                        length: 3,
                    }).map((_, index) => (

                        <div
                            key={index}
                        >

                            <Skeleton
                                className="
                                    h-4
                                    w-36
                                "
                            />

                            <Skeleton
                                className="
                                    h-12
                                    w-full
                                "
                                style={{
                                    marginTop: "0.75rem",
                                }}
                            />

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default SettingsSkeleton;