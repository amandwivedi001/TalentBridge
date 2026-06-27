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

function ReportSkeleton() {

    return (

        <div className="min-h-screen bg-slate-50">

            <main
                className="
                    max-w-7xl
                    space-y-8
                "
                style={{
                    margin: "0 auto",
                    padding: "40px 24px",
                }}
            >

                <Skeleton
                    className="
                        h-72
                        w-full
                        rounded-3xl
                    "
                />

                <div
                    className="
                        grid
                        gap-6
                        lg:grid-cols-3
                    "
                >

                    <Skeleton
                        className="
                            h-[360px]
                            lg:col-span-2
                        "
                    />

                    <Skeleton
                        className="
                            h-[360px]
                        "
                    />

                </div>

                <Skeleton
                    className="
                        h-56
                        w-full
                    "
                />

                <div
                    className="
                        grid
                        gap-6
                        lg:grid-cols-2
                    "
                >

                    <Skeleton
                        className="
                            h-72
                        "
                    />

                    <Skeleton
                        className="
                            h-72
                        "
                    />

                </div>

                <Skeleton
                    className="
                        h-28
                    "
                />

                <Skeleton
                    className="
                        h-28
                    "
                />

                <Skeleton
                    className="
                        h-28
                    "
                />

                <Skeleton
                    className="
                        h-40
                    "
                />

            </main>

        </div>

    );

}

export default ReportSkeleton;