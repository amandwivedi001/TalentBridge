import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import JobForm from "../../../components/recruiter/jobs/JobForm";

import {
    createJob,
} from "../../../services/recruiterJob.service";

function CreateJob() {

    const navigate =
        useNavigate();

    const [loading, setLoading] =
        useState(false);

    const handleSubmit =
        async (payload) => {

            try {

                setLoading(true);

                await createJob(payload);

                toast.success(
                    "Job created successfully."
                );

                navigate(
                    "/recruiter/jobs"
                );

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to create job."
                );

            }

            finally {

                setLoading(false);

            }

        };

    return (

        <div
            className="
                max-w-5xl
                space-y-8
            "
            style={{
                margin: "0 auto",
                padding: 0,
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
                    margin: 0,
                }}
            >

                <div
                    style={{
                        margin: 0,
                        padding: 0,
                    }}
                >

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
                            padding: 0,
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
                        style={{
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        Create New Job
                    </h1>

                    <p
                        className="
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.5rem",
                            padding: 0,
                        }}
                    >
                        Publish a new opportunity and
                        start receiving applications
                        from talented students.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/recruiter/jobs"
                        )
                    }
                    className="
                        h-12
                        rounded-xl
                        border
                        border-slate-300
                        font-semibold
                        text-slate-700
                        transition
                        hover:bg-slate-100
                    "
                    style={{
                        padding: "0 1.5rem",
                        margin: 0,
                    }}
                >
                    Cancel
                </button>

            </div>

            {/* Form */}

            <JobForm

                loading={loading}

                submitLabel="Create Job"

                cancelLabel="Cancel"

                onCancel={() =>
                    navigate(
                        "/recruiter/jobs"
                    )
                }

                onSubmit={handleSubmit}

            />

        </div>

    );

}

export default CreateJob;