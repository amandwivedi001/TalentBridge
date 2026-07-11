import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getRecruiterAnalytics } from "../../../services/analytics.service";

import AnalyticsSkeleton from "../../../components/recruiter/analytics/AnalyticsSkeleton";
import AnalyticsOverview from "../../../components/recruiter/analytics/AnalyticsOverview";
import HiringPipeline from "../../../components/recruiter/analytics/HiringPipeline";
import TopJobsTable from "../../../components/recruiter/analytics/TopJobsTable";
import TopCandidates from "../../../components/recruiter/analytics/TopCandidates";
import RecentApplications from "../../../components/recruiter/analytics/RecentApplications";

function RecruiterAnalytics() {

    const [analytics, setAnalytics] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const fetchAnalytics =
        async () => {

            try {

                setLoading(true);

                const data =
                    await getRecruiterAnalytics();

                setAnalytics(data);

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to load analytics."

                );

            }

            finally {

                setLoading(false);

            }

        };

    if (loading) {

        return <AnalyticsSkeleton />;

    }

    if (!analytics) {

        return null;

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

            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-slate-900
                    "
                >
                    Recruitment Analytics
                </h1>

                <p
                    className="
                        text-slate-500
                    "
                    style={{
                        marginTop: "0.5rem",
                    }}
                >
                    Monitor hiring performance,
                    recruitment pipeline, AI matching,
                    and job insights.
                </p>

            </div>

            <AnalyticsOverview
                overview={analytics.overview}
            />

            <div
                className="
                    grid
                    gap-8
                    xl:grid-cols-2
                "
            >

                <HiringPipeline
                    pipeline={analytics.pipeline}
                />

                <TopCandidates
                    candidates={analytics.topCandidates}
                />

            </div>

            <TopJobsTable
                jobs={analytics.topJobs}
            />

            <RecentApplications
                applications={
                    analytics.recentApplications
                }
            />

        </div>

    );

}

export default RecruiterAnalytics;