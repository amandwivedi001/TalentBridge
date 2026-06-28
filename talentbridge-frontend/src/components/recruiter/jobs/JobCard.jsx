import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    Calendar,
    MapPin,
    Wallet,
    Users,
    Eye,
    Pencil,
    Trash2,
    Power,
    Loader2,
} from "lucide-react";

import Card from "../../common/Card";
import JobStatusBadge from "./JobStatusBadge";
import DeleteDialog from "./DeleteDialog";

import {
    deleteJob,
    updateJobStatus,
} from "../../../services/recruiterJob.service";

function formatDate(date) {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

}

function JobCard({
    job,
    onRefresh,
}) {

    const navigate =
        useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [showDelete, setShowDelete] =
        useState(false);

    const handleToggleStatus =
        async () => {

            try {

                setLoading(true);

                await updateJobStatus(
                    job.id,
                    !job.isActive
                );

                toast.success(
                    job.isActive
                        ? "Hiring closed."
                        : "Hiring reopened."
                );

                onRefresh();

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to update job."
                );

            }

            finally {

                setLoading(false);

            }

        };

    const handleDelete =
        async () => {

            try {

                setLoading(true);

                await deleteJob(job.id);

                toast.success(
                    "Job deleted successfully."
                );

                setShowDelete(false);

                onRefresh();

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to delete job."
                );

            }

            finally {

                setLoading(false);

            }

        };

    return (

        <>

            <Card className="transition-all duration-300 hover:shadow-xl">

                {/* Header */}

                <div
                    className="flex items-start justify-between gap-5"
                >

                    <div>

                        <h2
                            className="
                    text-2xl
                    font-bold
                    text-slate-900
                "
                        >
                            {job.title}
                        </h2>

                        <p
                            className="
                    text-slate-500
                "
                            style={{
                                marginTop: "0.5rem",
                            }}
                        >
                            {job.role}
                        </p>

                    </div>

                    <JobStatusBadge
                        isActive={job.isActive}
                    />

                </div>

                {/* Skills */}

                <div
                    className="flex flex-wrap gap-2"
                    style={{
                        marginTop: "1.5rem",
                    }}
                >

                    {job.requiredSkills.map(
                        (skill) => (

                            <span
                                key={skill}
                                className="
                        rounded-full
                        bg-indigo-100
                        text-sm
                        font-medium
                        text-indigo-700
                    "
                                style={{
                                    padding: "0.25rem 0.75rem",
                                }}
                            >
                                {skill}
                            </span>

                        )
                    )}

                </div>

                {/* Details */}

                <div
                    className="
            grid
            gap-5
            md:grid-cols-4
        "
                    style={{
                        marginTop: "2rem",
                    }}
                >

                    <div className="flex items-center gap-2 text-slate-600">

                        <MapPin size={18} />

                        {job.location || "Remote"}

                    </div>

                    <div className="flex items-center gap-2 text-slate-600">

                        <Wallet size={18} />

                        {job.salary || "Not specified"}

                    </div>

                    <div className="flex items-center gap-2 text-slate-600">

                        <Users size={18} />

                        {job._count.applications ?? 0}
                        Applicants

                    </div>

                    <div className="flex items-center gap-2 text-slate-600">

                        <Calendar size={18} />

                        {formatDate(
                            job.createdAt
                        )}

                    </div>

                </div>

                {/* Footer */}

                <div
                    className="
            flex
            flex-wrap
            gap-3
        "
                    style={{
                        marginTop: "2rem",
                    }}
                >

                    <button
                        onClick={() =>
                            navigate(
                                `/recruiter/jobs/${job.id}`
                            )
                        }
                        className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-300
                font-medium
                hover:bg-slate-100
            "
                        style={{
                            padding: "0.5rem 1rem",
                        }}
                    >
                        <Eye size={18} />
                        View
                    </button>

                    <button
                        onClick={() =>
                            navigate(
                                `/recruiter/jobs/${job.id}/edit`
                            )
                        }
                        className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-300
                font-medium
                hover:bg-slate-100
            "
                        style={{
                            padding: "0.5rem 1rem",
                        }}
                    >
                        <Pencil size={18} />
                        Edit
                    </button>

                    <button
                        onClick={handleToggleStatus}
                        disabled={loading}
                        className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-indigo-600
                font-medium
                text-white
                hover:bg-indigo-700
            "
                        style={{
                            padding: "0.5rem 1rem",
                        }}
                    >

                        {loading ? (

                            <Loader2
                                size={18}
                                className="animate-spin"
                            />

                        ) : (

                            <Power size={18} />

                        )}

                        {job.isActive
                            ? "Close Hiring"
                            : "Reopen Hiring"}

                    </button>

                    <button
                        onClick={() =>
                            setShowDelete(true)
                        }
                        className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-red-200
                font-medium
                text-red-600
                hover:bg-red-50
            "
                        style={{
                            marginLeft: "auto",
                            padding: "0.5rem 1rem",
                        }}
                    >
                        <Trash2 size={18} />
                        Delete
                    </button>

                </div>

            </Card>

            <DeleteDialog
                open={showDelete}
                loading={loading}
                title={job.title}
                onClose={() =>
                    setShowDelete(false)
                }
                onConfirm={handleDelete}
            />

        </>

    );

}

export default JobCard;