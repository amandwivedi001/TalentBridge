import Card from "../../common/Card";
import { Trophy } from "lucide-react";

function TopJobsTable({

    jobs,

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
                        Top Performing Jobs
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
                        Jobs ranked by total applications and average AI match score.
                    </p>

                </div>

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-amber-100
                    "
                >

                    <Trophy
                        size={24}
                        className="text-amber-600"
                    />

                </div>

            </div>

            <div
                className="overflow-x-auto"
                style={{
                    marginTop: "2rem",
                }}
            >

                <table className="min-w-full">

                    <thead>

                        <tr
                            className="
                                border-b
                                border-slate-200
                            "
                        >

                            <th
                                className="
                                    text-left
                                    text-sm
                                    font-semibold
                                    text-slate-500
                                "
                                style={{
                                    paddingTop: "0.75rem",
                                    paddingBottom: "0.75rem",
                                }}
                            >
                                Rank
                            </th>

                            <th
                                className="
                                    text-left
                                    text-sm
                                    font-semibold
                                    text-slate-500
                                "
                                style={{
                                    paddingTop: "0.75rem",
                                    paddingBottom: "0.75rem",
                                }}
                            >
                                Job Title
                            </th>

                            <th
                                className="
                                    text-center
                                    text-sm
                                    font-semibold
                                    text-slate-500
                                "
                                style={{
                                    paddingTop: "0.75rem",
                                    paddingBottom: "0.75rem",
                                }}
                            >
                                Applications
                            </th>

                            <th
                                className="
                                    text-center
                                    text-sm
                                    font-semibold
                                    text-slate-500
                                "
                                style={{
                                    paddingTop: "0.75rem",
                                    paddingBottom: "0.75rem",
                                }}
                            >
                                Avg AI Match
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {jobs.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="
                                        text-center
                                        text-slate-500
                                    "
                                    style={{
                                        paddingTop: "2.5rem",
                                        paddingBottom: "2.5rem",
                                    }}
                                >
                                    No job analytics available.
                                </td>

                            </tr>

                        ) : (

                            jobs.map(

                                (
                                    job,
                                    index
                                ) => (

                                    <tr
                                        key={job.id}
                                        className="
                                            border-b
                                            border-slate-100
                                            transition
                                            hover:bg-slate-50
                                        "
                                    >

                                        <td
                                            style={{
                                                paddingTop: "1.25rem",
                                                paddingBottom: "1.25rem",
                                            }}
                                        >

                                            <div
                                                className="
                                                    flex
                                                    h-9
                                                    w-9
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-indigo-100
                                                    font-bold
                                                    text-indigo-700
                                                "
                                            >
                                                {index + 1}
                                            </div>

                                        </td>

                                        <td
                                            style={{
                                                paddingTop: "1.25rem",
                                                paddingBottom: "1.25rem",
                                            }}
                                        >

                                            <p
                                                className="
                                                    font-semibold
                                                    text-slate-900
                                                "
                                            >
                                                {job.title}
                                            </p>

                                        </td>

                                        <td
                                            className="
                                                text-center
                                                font-semibold
                                                text-slate-800
                                            "
                                            style={{
                                                paddingTop: "1.25rem",
                                                paddingBottom: "1.25rem",
                                            }}
                                        >
                                            {job.applications}
                                        </td>

                                        <td
                                            className="
                                                text-center
                                            "
                                            style={{
                                                paddingTop: "1.25rem",
                                                paddingBottom: "1.25rem",
                                            }}
                                        >

                                            <span
                                                className="
                                                    rounded-full
                                                    bg-emerald-100
                                                    text-sm
                                                    font-semibold
                                                    text-emerald-700
                                                "
                                                style={{
                                                    padding: "0.25rem 0.75rem",
                                                }}
                                            >
                                                {job.avgMatchScore}%
                                            </span>

                                        </td>

                                    </tr>

                                )

                            )

                        )}

                    </tbody>

                </table>

            </div>

        </Card>

    );

}

export default TopJobsTable;