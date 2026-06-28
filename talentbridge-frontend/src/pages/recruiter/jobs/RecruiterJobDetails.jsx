import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getJobById,
    deleteJob,
    updateJobStatus,
} from "../../../services/recruiterJob.service";

import JobHero from "../../../components/recruiter/jobs/JobHero";
import JobDescriptionCard from "../../../components/recruiter/jobs/JobDescriptionCard";
import JobEligibilityCard from "../../../components/recruiter/jobs/JobEligibilityCard";
import JobStatisticsCard from "../../../components/recruiter/jobs/JobStatisticsCard";
import DeleteDialog from "../../../components/recruiter/jobs/DeleteDialog";
import JobsSkeleton from "../../../components/recruiter/jobs/JobsSkeleton";

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

    useEffect(() => {

        fetchJob();

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

            {/* Reserved for Day 10 */}

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

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-slate-900
                    "
                >
                    Applicants
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{
                        marginTop: "0.75rem",
                    }}
                >
                    Candidate management will be
                    available here in the next module.
                </p>

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