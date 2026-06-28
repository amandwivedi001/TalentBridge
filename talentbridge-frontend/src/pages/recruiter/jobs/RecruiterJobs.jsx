import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    BriefcaseBusiness,
    Plus,
    Search,
} from "lucide-react";

import {
    getMyJobs,
} from "../../../services/recruiterJob.service";

import JobCard from "../../../components/recruiter/jobs/JobCard";
import EmptyJobs from "../../../components/recruiter/jobs/EmptyJobs";
import JobsSkeleton from "../../../components/recruiter/jobs/JobsSkeleton";

function RecruiterJobs() {

    const navigate =
        useNavigate();

    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("ALL");

    useEffect(() => {

        fetchJobs();

    }, []);

    const fetchJobs =
        async () => {

            try {

                setLoading(true);

                const data =
                    await getMyJobs();

                setJobs(data);

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to load jobs."
                );

            }

            finally {

                setLoading(false);

            }

        };

    const filteredJobs =
        useMemo(() => {

            return jobs.filter((job) => {

                const matchesSearch =

                    job.title
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||

                    job.role
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );

                const matchesStatus =

                    status === "ALL"

                        ? true

                        : status === "OPEN"

                            ? job.isActive

                            : !job.isActive;

                return (
                    matchesSearch &&
                    matchesStatus
                );

            });

        }, [
            jobs,
            search,
            status,
        ]);

    if (loading) {

        return (
            <JobsSkeleton />
        );

    }

    return (

        <div
            className="
        max-w-7xl
        space-y-8
    "
            style={{
                margin: "0 auto",
            }}
        >

            {/* Hero */}

            <div
                className="
            flex
            flex-col
            gap-6
            rounded-3xl
            bg-gradient-to-r
            from-indigo-600
            via-violet-600
            to-blue-600
            text-white
            lg:flex-row
            lg:items-center
            lg:justify-between
        "
                style={{
                    padding: "2rem",
                }}
            >

                <div>

                    <div
                        className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white/20
                "
                        style={{
                            padding: "0.375rem 1rem",
                        }}
                    >

                        <BriefcaseBusiness
                            size={18}
                        />

                        Job Management

                    </div>

                    <h1
                        className="
                    text-4xl
                    font-bold
                "
                        style={{
                            marginTop: "1.25rem",
                        }}
                    >
                        Manage Job Postings
                    </h1>

                    <p
                        className="
                    max-w-2xl
                    text-indigo-100
                "
                        style={{
                            marginTop: "0.75rem",
                        }}
                    >
                        Create, edit and monitor
                        all your hiring positions
                        from one place.
                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate(
                            "/recruiter/jobs/create"
                        )
                    }
                    className="
                flex
                h-14
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-white
                font-semibold
                text-indigo-700
                transition
                hover:scale-105
            "
                    style={{
                        padding: "0 1.5rem",
                    }}
                >

                    <Plus
                        size={20}
                    />

                    Create Job

                </button>

            </div>

            {/* Filters */}

            <div
                className="
            flex
            flex-col
            gap-4
            lg:flex-row
        "
            >

                <div
                    className="
                relative
                flex-1
            "
                >

                    <Search
                        size={18}
                        className="
                    absolute
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                "
                        style={{
                            left: "1rem",
                        }}
                    />

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="Search jobs..."
                        className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    outline-none
                    focus:border-indigo-500
                "
                        style={{
                            paddingLeft: "2.75rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(
                            e.target.value
                        )
                    }
                    className="
                h-12
                rounded-xl
                border
                border-slate-300
            "
                    style={{
                        padding: "0 1rem",
                    }}
                >

                    <option value="ALL">
                        All Jobs
                    </option>

                    <option value="OPEN">
                        Hiring Open
                    </option>

                    <option value="CLOSED">
                        Hiring Closed
                    </option>

                </select>

            </div>

            {/* Jobs */}

            {filteredJobs.length === 0 ? (

                <EmptyJobs />

            ) : (

                <div
                    className="
                grid
                gap-6
            "
                >

                    {filteredJobs.map(
                        (job) => (

                            <JobCard
                                key={job.id}
                                job={job}
                                onRefresh={
                                    fetchJobs
                                }
                            />

                        )
                    )}

                </div>

            )}

        </div>

    );

}

export default RecruiterJobs;