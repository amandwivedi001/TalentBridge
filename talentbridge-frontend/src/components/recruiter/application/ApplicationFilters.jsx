import {
    Search,
    Briefcase,
    ListFilter,
    ArrowUpDown,
} from "lucide-react";

function ApplicationFilters({

    search,
    onSearchChange,

    status,
    onStatusChange,

    job,
    onJobChange,

    sort,
    onSortChange,

    jobs = [],

}) {

    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
            "
            style={{ padding: "1.5rem" }}
        >

            <div
                className="
                    grid
                    gap-4
                    lg:grid-cols-4
                "
            >

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            onSearchChange(
                                e.target.value
                            )
                        }
                        placeholder="Search candidate..."
                        className="
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            outline-none
                            transition
                            focus:border-indigo-500
                            focus:ring-4
                            focus:ring-indigo-100
                        "
                        style={{
                            paddingLeft: "2.75rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

                {/* Job */}

                <div className="relative">

                    <Briefcase
                        size={18}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            pointer-events-none
                        "
                    />

                    <select
                        value={job}
                        onChange={(e) =>
                            onJobChange(
                                e.target.value
                            )
                        }
                        className="
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            outline-none
                            transition
                            focus:border-indigo-500
                            focus:ring-4
                            focus:ring-indigo-100
                        "
                        style={{
                            paddingLeft: "2.75rem",
                            paddingRight: "1rem",
                        }}
                    >

                        <option value="">
                            All Jobs
                        </option>

                        {jobs.map((item) => (

                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.title}
                            </option>

                        ))}

                    </select>

                </div>

                {/* Status */}

                <div className="relative">

                    <ListFilter
                        size={18}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            pointer-events-none
                        "
                    />

                    <select
                        value={status}
                        onChange={(e) =>
                            onStatusChange(
                                e.target.value
                            )
                        }
                        className="
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            outline-none
                            transition
                            focus:border-indigo-500
                            focus:ring-4
                            focus:ring-indigo-100
                        "
                        style={{
                            paddingLeft: "2.75rem",
                            paddingRight: "1rem",
                        }}
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="APPLIED">
                            Applied
                        </option>

                        <option value="SHORTLISTED">
                            Shortlisted
                        </option>

                        <option value="INTERVIEW">
                            Interview
                        </option>

                        <option value="HIRED">
                            Hired
                        </option>

                        <option value="REJECTED">
                            Rejected
                        </option>

                        <option value="WITHDRAWN">
                            Withdrawn
                        </option>

                    </select>

                </div>

                {/* Sort */}

                <div className="relative">

                    <ArrowUpDown
                        size={18}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            pointer-events-none
                        "
                    />

                    <select
                        value={sort}
                        onChange={(e) =>
                            onSortChange(
                                e.target.value
                            )
                        }
                        className="
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            outline-none
                            transition
                            focus:border-indigo-500
                            focus:ring-4
                            focus:ring-indigo-100
                        "
                        style={{
                            paddingLeft: "2.75rem",
                            paddingRight: "1rem",
                        }}
                    >

                        <option value="newest">
                            Newest First
                        </option>

                        <option value="oldest">
                            Oldest First
                        </option>

                    </select>

                </div>

            </div>

        </div>

    );

}

export default ApplicationFilters;