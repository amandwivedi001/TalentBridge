import {
    ArrowLeft,
    Calendar,
    MapPin,
    Wallet,
    Users,
    Pencil,
    Trash2,
    Power,
    Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import JobStatusBadge from "./JobStatusBadge";

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

function JobHero({
    job,
    loading = false,
    onToggleStatus,
    onDelete,
}) {

    const navigate = useNavigate();

    return (

        <div
            className="
                relative
                overflow-hidden
                rounded-3xl
                bg-gradient-to-r
                from-indigo-600
                via-violet-600
                to-blue-600
                text-white
                shadow-xl
            "
            style={{
                padding: "2rem",
            }}
        >

            {/* Decorative */}

            <div
                className="
                    absolute
                    -right-16
                    -top-16
                    h-52
                    w-52
                    rounded-full
                    bg-white/10
                "
            />

            <div
                className="
                    absolute
                    bottom-0
                    right-24
                    h-28
                    w-28
                    rounded-full
                    bg-white/5
                "
            />

            <div className="relative z-10">

                {/* Back */}

                <button
                    onClick={() => navigate(-1)}
                    className="
                        flex
                        items-center
                        gap-2
                        text-indigo-100
                        transition
                        hover:text-white
                    "
                    style={{
                        marginBottom: "1.5rem",
                    }}
                >

                    <ArrowLeft size={18} />

                    Back

                </button>

                <div
                    className="
                        flex
                        flex-col
                        gap-8
                        lg:flex-row
                        lg:items-start
                        lg:justify-between
                    "
                >

                    {/* Left */}

                    <div>

                        <div className="flex items-center gap-4">

                            <h1
                                className="
                                    text-4xl
                                    font-bold
                                "
                            >
                                {job.title}
                            </h1>

                            <JobStatusBadge
                                isActive={job.isActive}
                            />

                        </div>

                        <p
                            className="
                                text-lg
                                text-indigo-100
                            "
                            style={{
                                marginTop: "0.75rem",
                            }}
                        >
                            {job.role}
                        </p>

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-6
                                text-indigo-100
                            "
                            style={{
                                marginTop: "2rem",
                            }}
                        >

                            <div className="flex items-center gap-2">

                                <MapPin size={18} />

                                {job.location || "Remote"}

                            </div>

                            <div className="flex items-center gap-2">

                                <Wallet size={18} />

                                {job.salary || "Not specified"}

                            </div>

                            <div className="flex items-center gap-2">

                                <Users size={18} />

                                {job._count.applications || 0}
                                Applicants

                            </div>

                            <div className="flex items-center gap-2">

                                <Calendar size={18} />

                                {formatDate(
                                    job.createdAt
                                )}

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-3
                        "
                    >

                        <button
                            onClick={() =>
                                navigate(
                                    `/recruiter/jobs/${job.id}/edit`
                                )
                            }
                            className="
                                flex
                                h-12
                                items-center
                                gap-2
                                rounded-xl
                                bg-white
                                font-semibold
                                text-indigo-700
                                transition
                                hover:scale-105
                            "
                            style={{
                                padding: "0 1.25rem",
                            }}
                        >

                            <Pencil size={18} />

                            Edit

                        </button>

                        <button
                            onClick={onToggleStatus}
                            disabled={loading}
                            className="
                                flex
                                h-12
                                items-center
                                gap-2
                                rounded-xl
                                bg-white/15
                                font-semibold
                                backdrop-blur
                                transition
                                hover:bg-white/20
                            "
                            style={{
                                padding: "0 1.25rem",
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
                            onClick={onDelete}
                            className="
                                flex
                                h-12
                                items-center
                                gap-2
                                rounded-xl
                                bg-red-500
                                font-semibold
                                transition
                                hover:bg-red-600
                            "
                            style={{
                                padding: "0 1.25rem",
                            }}
                        >

                            <Trash2 size={18} />

                            Delete

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default JobHero;