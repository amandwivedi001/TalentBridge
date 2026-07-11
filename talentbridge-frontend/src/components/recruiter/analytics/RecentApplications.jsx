import Card from "../../common/Card";

const STATUS_STYLES = {

    APPLIED:
        "bg-slate-100 text-slate-700",

    SHORTLISTED:
        "bg-blue-100 text-blue-700",

    INTERVIEW:
        "bg-amber-100 text-amber-700",

    HIRED:
        "bg-emerald-100 text-emerald-700",

    REJECTED:
        "bg-red-100 text-red-700",

    WITHDRAWN:
        "bg-slate-200 text-slate-700",

};

function formatDate(date) {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

}

function RecentApplications({

    applications,

}) {

    return (

        <Card>

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <h2
                        className="
                            text-xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Recent Applications
                    </h2>

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.25rem",
                        }}
                    >
                        Latest application activity across all your job postings.
                    </p>

                </div>

            </div>

            <div
                style={{
                    marginTop: "2rem",
                }}
            >

                {applications.length === 0 ? (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-200
                            text-center
                            text-slate-500
                        "
                        style={{
                            paddingTop: "3rem",
                            paddingBottom: "3rem",
                        }}
                    >
                        No recent applications.
                    </div>

                ) : (

                    <div
                        className="
                            divide-y
                            divide-slate-200
                        "
                    >

                        {applications.map(

                            (
                                application
                            ) => (

                                <div
                                    key={
                                        application.id
                                    }
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                    style={{
                                        paddingTop: "1.25rem",
                                        paddingBottom: "1.25rem",
                                    }}
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-indigo-100
                                                font-semibold
                                                text-indigo-700
                                            "
                                        >

                                            {application.studentName
                                                ?.charAt(0)
                                                ?.toUpperCase()}

                                        </div>

                                        <div>

                                            <h3
                                                className="
                                                    font-semibold
                                                    text-slate-900
                                                "
                                            >
                                                {application.studentName}
                                            </h3>

                                            <p
                                                className="
                                                    text-sm
                                                    text-slate-500
                                                "
                                            >
                                                Applied for{" "}
                                                <span
                                                    className="
                                                        font-medium
                                                    "
                                                >
                                                    {application.jobTitle}
                                                </span>
                                            </p>

                                        </div>

                                    </div>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-6
                                        "
                                    >

                                        <span
                                            className={`
                                                rounded-full
                                                text-sm
                                                font-semibold
                                                ${STATUS_STYLES[
                                                    application.status
                                                ]}
                                            `}
                                            style={{
                                                padding: "0.25rem 0.75rem",
                                            }}
                                        >
                                            {application.status}
                                        </span>

                                        <span
                                            className="
                                                w-24
                                                text-right
                                                text-sm
                                                text-slate-500
                                            "
                                        >
                                            {formatDate(
                                                application.createdAt
                                            )}
                                        </span>

                                    </div>

                                </div>

                            )

                        )}

                    </div>

                )}

            </div>

        </Card>

    );

}

export default RecentApplications;