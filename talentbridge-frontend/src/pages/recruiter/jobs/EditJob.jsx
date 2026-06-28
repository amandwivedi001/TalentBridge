import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import JobForm from "../../../components/recruiter/jobs/JobForm";
import JobsSkeleton from "../../../components/recruiter/jobs/JobsSkeleton";

import {
    getJobById,
    updateJob,
} from "../../../services/recruiterJob.service";

function EditJob() {

    const { jobId } = useParams();

    const navigate =
        useNavigate();

    const [job, setJob] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
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

    const handleUpdate =
        async (payload) => {

            try {

                setSaving(true);

                await updateJob(
                    jobId,
                    payload
                );

                toast.success(
                    "Job updated successfully."
                );

                navigate(
                    `/recruiter/jobs/${jobId}`
                );

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to update job."
                );

            }

            finally {

                setSaving(false);

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
                max-w-5xl
                space-y-8
            "
            style={{
                margin: "0 auto",
            }}
        >

            {/* Header */}

            <div
                className="
                    sticky
                    top-20
                    z-20
                    flex
                    flex-col
                    gap-6
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white/90
                    shadow-sm
                    backdrop-blur
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
                style={{
                    padding: "1.5rem",
                }}
            >

                <div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(-1)
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-indigo-600
                            transition
                            hover:text-indigo-700
                        "
                        style={{
                            marginBottom: "1rem",
                        }}
                    >

                        <ArrowLeft
                            size={18}
                        />

                        Back

                    </button>

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Edit Job
                    </h1>

                    <p
                        className="
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.5rem",
                        }}
                    >
                        Update the job information,
                        eligibility criteria and hiring
                        status.
                    </p>

                </div>

            </div>

            <JobForm

                initialValues={job}

                loading={saving}

                submitLabel="Save Changes"

                onSubmit={handleUpdate}

            />

        </div>

    );

}

export default EditJob;