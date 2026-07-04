function Skeleton({
    className = "",
}) {

    return (

        <div
            className={`
                animate-pulse
                rounded-xl
                bg-slate-200
                ${className}
            `}
        />

    );

}

function NotificationSkeleton() {

    return (

        <div
            style={{
                gap: "1.25rem",
            }}
            className="flex flex-col"
        >

            {Array.from({
                length: 6,
            }).map((_, index) => (

                <div
                    key={index}
                    style={{
                        padding: "1.25rem",
                    }}
                    className="
                        flex
                        items-start
                        gap-4
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                    "
                >

                    {/* Icon */}

                    <Skeleton
                        className="
                            h-12
                            w-12
                            shrink-0
                            rounded-xl
                        "
                    />

                    {/* Content */}

                    <div className="flex-1">

                        <div
                            className="
                                flex
                                justify-between
                            "
                        >

                            <Skeleton
                                className="
                                    h-5
                                    w-56
                                "
                            />

                            <Skeleton
                                className="
                                    h-3
                                    w-3
                                    rounded-full
                                "
                            />

                        </div>

                        <Skeleton
                            style={{
                                marginTop: "1rem",
                            }}
                            className="
                                h-4
                                w-full
                            "
                        />

                        <Skeleton
                            style={{
                                marginTop: "0.5rem",
                            }}
                            className="
                                h-4
                                w-3/4
                            "
                        />

                        <div
                            style={{
                                marginTop: "1.25rem",
                            }}
                            className="
                                flex
                                justify-between
                                items-center
                            "
                        >

                            <Skeleton
                                className="
                                    h-3
                                    w-20
                                "
                            />

                            <Skeleton
                                className="
                                    h-6
                                    w-20
                                    rounded-full
                                "
                            />

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default NotificationSkeleton;