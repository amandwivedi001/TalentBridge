import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import ApplicationHero from "../../../components/recruiter/application/ApplicationHero";
import ApplicationFilters from "../../../components/recruiter/application/ApplicationFilters";
import ApplicationList from "../../../components/recruiter/application/ApplicationList";
import ApplicationsSkeleton from "../../../components/recruiter/application/ApplicationsSkeleton";

import {
    getRecruiterApplications,
} from "../../../services/application.service";

import {
    getMyJobs,
} from "../../../services/recruiterJob.service";

function RecruiterApplications() {

    const [applications, setApplications] =
        useState([]);

    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("");

    const [job, setJob] =
        useState("");

    const [sort, setSort] =
        useState("newest");

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            setLoading(true);

            const [
                applicationsData,
                jobsData,
            ] = await Promise.all([

                getRecruiterApplications(),

                getMyJobs(),

            ]);

            setApplications(
                applicationsData
            );

            setJobs(
                jobsData
            );

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to load applications."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const filteredApplications =
        useMemo(() => {

            let filtered =
                [...applications];

            if (search.trim()) {

                const keyword =
                    search.toLowerCase();

                filtered =
                    filtered.filter(
                        (application) =>

                            application.student.user.name
                                .toLowerCase()
                                .includes(keyword)

                            ||

                            application.student.user.email
                                .toLowerCase()
                                .includes(keyword)

                            ||

                            application.job.title
                                .toLowerCase()
                                .includes(keyword)

                    );

            }

            if (status) {

                filtered =
                    filtered.filter(

                        (application) =>

                            application.status ===
                            status

                    );

            }

            if (job) {

                filtered =
                    filtered.filter(

                        (application) =>

                            application.job.id ===
                            job

                    );

            }

            filtered.sort((a, b) =>

                sort === "newest"

                    ?

                    new Date(b.createdAt) -
                    new Date(a.createdAt)

                    :

                    new Date(a.createdAt) -
                    new Date(b.createdAt)

            );

            return filtered;

        }, [

            applications,

            search,

            status,

            job,

            sort,

        ]);

    const stats =
        useMemo(() => {

            return {

                total:
                    applications.length,

                shortlisted:
                    applications.filter(

                        (item) =>

                            item.status ===
                            "SHORTLISTED"

                    ).length,

                interview:
                    applications.filter(

                        (item) =>

                            item.status ===
                            "INTERVIEW"

                    ).length,

                hired:
                    applications.filter(

                        (item) =>

                            item.status ===
                            "HIRED"

                    ).length,

            };

        }, [applications]);

    if (loading) {

        return (
            <ApplicationsSkeleton />
        );

    }

    return (

        <div
            className="
                max-w-7xl
                space-y-8
            "
            style={{
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >

            <ApplicationHero

                total={stats.total}

                shortlisted={
                    stats.shortlisted
                }

                interview={
                    stats.interview
                }

                hired={
                    stats.hired
                }

            />

            <ApplicationFilters

                search={search}

                onSearchChange={
                    setSearch
                }

                status={status}

                onStatusChange={
                    setStatus
                }

                job={job}

                onJobChange={
                    setJob
                }

                sort={sort}

                onSortChange={
                    setSort
                }

                jobs={jobs}

            />

            <ApplicationList
                applications={
                    filteredApplications
                }
            />

        </div>

    );

}

export default RecruiterApplications;