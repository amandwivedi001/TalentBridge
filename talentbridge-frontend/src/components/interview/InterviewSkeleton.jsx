import Card from "../common/Card";

function SkeletonBlock({ className = "" }) {
    return (
        <div
            className={`
                animate-pulse
                rounded-lg
                bg-slate-200
                ${className}
            `}
        />
    );
}

function InterviewSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
            {/* Header */}

            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
                <div
                    className="flex max-w-5xl items-center justify-between"
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingLeft: "1.5rem",
                        paddingRight: "1.5rem",
                        paddingTop: "1.25rem",
                        paddingBottom: "1.25rem",
                    }}
                >
                    <SkeletonBlock className="h-10 w-24 rounded-xl" />

                    <div className="flex flex-col items-center gap-3">
                        <SkeletonBlock className="h-6 w-48" />

                        <div className="flex gap-3">
                            <SkeletonBlock className="h-8 w-28 rounded-full" />

                            <SkeletonBlock className="h-8 w-24 rounded-full" />
                        </div>
                    </div>

                    <div className="w-24" />
                </div>
            </header>

            {/* Content */}

            <main
                className="max-w-4xl"
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "2.5rem",
                    paddingBottom: "2.5rem",
                }}
            >
                <div className="space-y-10">
                    {/* Progress */}

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <SkeletonBlock className="h-4 w-36" />

                            <SkeletonBlock className="h-4 w-10" />
                        </div>

                        <SkeletonBlock className="h-3 w-full rounded-full" />
                    </div>

                    {/* Question Card */}

                    <Card className="rounded-3xl">
                        <div className="space-y-8">
                            <SkeletonBlock className="h-4 w-24" />

                            <SkeletonBlock className="h-8 w-4/5" />

                            <SkeletonBlock className="h-8 w-3/5" />
                        </div>
                    </Card>

                    {/* Answer */}

                    <Card className="rounded-3xl">
                        <div className="space-y-5">
                            <SkeletonBlock className="h-5 w-36" />

                            <SkeletonBlock className="h-4 w-72" />

                            <SkeletonBlock className="h-72 w-full rounded-2xl" />
                        </div>
                    </Card>

                    {/* Button */}

                    <div className="flex justify-end">
                        <SkeletonBlock className="h-14 w-44 rounded-2xl" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default InterviewSkeleton;