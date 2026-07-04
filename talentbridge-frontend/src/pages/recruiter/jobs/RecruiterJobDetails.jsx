import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getJobById,
    deleteJob,
    updateJobStatus,
    getRankedCandidates,
} from "../../../services/recruiterJob.service";

import {
    getApplicantsForJob,
} from "../../../services/application.service";

import JobHero from "../../../components/recruiter/jobs/JobHero";
import JobDescriptionCard from "../../../components/recruiter/jobs/JobDescriptionCard";
import JobEligibilityCard from "../../../components/recruiter/jobs/JobEligibilityCard";
import JobStatisticsCard from "../../../components/recruiter/jobs/JobStatisticsCard";
import DeleteDialog from "../../../components/recruiter/jobs/DeleteDialog";
import JobsSkeleton from "../../../components/recruiter/jobs/JobsSkeleton";
import ApplicantsSection from "../../../components/recruiter/jobs/ApplicantsSection";

import CandidateRanking from "../../../components/recruiter/ai/CandidateRanking"
import RankingSkeleton from "../../../components/recruiter/ai/RankingSkeleton";

function RecruiterJobDetails() {

    const { jobId } = useParams();

    const navigate = useNavigate();

    const [job, setJob] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [showDelete, setShowDelete] =
        useState(false);

    const [applicants, setApplicants] =
        useState([]);

    const [loadingApplicants, setLoadingApplicants] =
        useState(false);

    const [rankedCandidates, setRankedCandidates] =
        useState([]);

    const [loadingRanking, setLoadingRanking] =
        useState(false);

    useEffect(() => {

        fetchJob();

        fetchApplicants();

        fetchRanking();

    }, [jobId]);

    const fetchJob = async () => {

        try {

            setLoading(true);

            const data =
                await getJobById(jobId);

            setJob(data);

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to load job."
            );

            navigate("/recruiter/jobs");

        }

        finally {

            setLoading(false);

        }

    };

    const fetchApplicants =
        async () => {

            try {

                setLoadingApplicants(true);

                const data =
                    await getApplicantsForJob(jobId);

                setApplicants(data);
            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to load applicants."

                );

            }

            finally {

                setLoadingApplicants(false);

            }

        };

    const fetchRanking = async () => {

        try {

            setLoadingRanking(true);

            const rankings =
                await getRankedCandidates(jobId);

            setRankedCandidates(rankings);

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to fetch ranking."
            );

        }

        finally {

            setLoadingRanking(false);

        }

    };

    const handleToggleStatus =
        async () => {

            try {

                setActionLoading(true);

                await updateJobStatus(
                    job.id,
                    !job.isActive
                );

                toast.success(
                    job.isActive
                        ? "Hiring closed."
                        : "Hiring reopened."
                );

                fetchJob();

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to update job."
                );

            }

            finally {

                setActionLoading(false);

            }

        };

    const handleDelete =
        async () => {

            try {

                setActionLoading(true);

                await deleteJob(job.id);

                toast.success(
                    "Job deleted successfully."
                );

                navigate("/recruiter/jobs");

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to delete job."
                );

            }

            finally {

                setActionLoading(false);

            }

        };

    if (loading) {

        return <JobsSkeleton />;

    }

    if (!job) {

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

            <JobHero
                job={job}
                loading={actionLoading}
                onToggleStatus={
                    handleToggleStatus
                }
                onDelete={() =>
                    setShowDelete(true)
                }
            />

            <JobDescriptionCard
                description={job.description}
                skills={job.requiredSkills}
            />

            <div
                className="
                    grid
                    gap-8
                    xl:grid-cols-2
                "
            >

                <JobEligibilityCard
                    cgpa={job.minCgpa}
                    tenth={job.minTenthPercentage}
                    twelfth={job.minTwelfthPercentage}
                    isActive={job.isActive}
                />

                <JobStatisticsCard
                    job={job}
                />
            </div>

            {loadingRanking ? (
                <RankingSkeleton />
            ) : (
                <CandidateRanking
                    candidates={rankedCandidates}
                />
            )}

            <section
                className="
                    rounded-3xl
                    border-2
                    border-dashed
                    border-slate-300
                    bg-white
                    text-center
                "
                style={{
                    padding: "2.5rem",
                }}
            >

                {loadingApplicants ? (

                    <div
                        className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
        "
                        style={{ padding: "2rem" }}
                    >

                        <p className="text-slate-500">
                            Loading applicants...
                        </p>

                    </div>

                ) : (

                    <ApplicantsSection
                        applicants={applicants}
                    />

                )}

            </section>

            <DeleteDialog
                open={showDelete}
                loading={actionLoading}
                title={job.title}
                onClose={() =>
                    setShowDelete(false)
                }
                onConfirm={handleDelete}
            />

        </div>

    );

}

export default RecruiterJobDetails;