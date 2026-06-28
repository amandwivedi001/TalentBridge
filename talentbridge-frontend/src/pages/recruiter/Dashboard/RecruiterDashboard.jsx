import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
    BriefcaseBusiness,
    FileText,
    Trophy,
    Users,
} from "lucide-react";

import {
    getRecruiterDashboard,
    getRecruiterJobs,
} from "../../../services/recruiterDashboard.service";

import DashboardHero from "../../../components/recruiter/Dashboard/DashboardHero";
import RecruiterStatCard from "../../../components/recruiter/Dashboard/RecruiterStatCard";
import QuickActions from "../../../components/recruiter/Dashboard/QuickActions";
import HiringPipeline from "../../../components/recruiter/Dashboard/HiringPipeline";
import RecentJobs from "../../../components/recruiter/Dashboard/RecentJobs";
import DashboardSkeleton from "../../../components/recruiter/Dashboard/DashboardSkeleton";

function RecruiterDashboard() {

    const { user } = useSelector(
        (state) => state.auth
    );

    const [dashboard, setDashboard] =
        useState(null);

    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const [
                dashboardData,
                jobsData,
            ] = await Promise.all([
                getRecruiterDashboard(),
                getRecruiterJobs(),
            ]);

            setDashboard(
                dashboardData
            );

            setJobs(
                jobsData
            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <DashboardSkeleton />
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
                paddingTop: "1rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingBottom: "1rem"
            }}
        >

            <DashboardHero

                recruiter={user}

                stats={{
                    activeJobs: dashboard.jobs?.active ?? 0,
                    candidates: dashboard.candidates?.total ?? 0,
                }}

            />

            <section
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >

                <RecruiterStatCard
                    title="Active Jobs"
                    value={
                        dashboard.jobs?.active ?? 0
                    }
                    subtitle="Currently hiring"
                    icon={
                        BriefcaseBusiness
                    }
                    color="indigo"
                />

                <RecruiterStatCard
                    title="Applications"
                    value={
                        dashboard.applications?.total ?? 0
                    }
                    subtitle="Applications received"
                    icon={FileText}
                    color="blue"
                />

                <RecruiterStatCard
                    title="Candidates"
                    value={
                        dashboard.candidates?.total ?? 0
                    }
                    subtitle="Under review"
                    icon={Users}
                    color="amber"
                />

                <RecruiterStatCard
                    title="Hired"
                    value={
                        dashboard.applications?.hired ?? 0
                    }
                    subtitle="Successfully hired"
                    icon={Trophy}
                    color="emerald"
                />

            </section>

            <QuickActions />

            <HiringPipeline

                applied={dashboard.applications?.applied ?? 0}

                shortlisted={dashboard.applications?.shortlisted ?? 0}

                interview={dashboard.applications?.interview ?? 0}

                hired={dashboard.applications?.hired ?? 0}

            />

            <RecentJobs
                jobs={jobs}
            />

        </div>

    );

}

export default RecruiterDashboard;