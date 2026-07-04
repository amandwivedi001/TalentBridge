import { useEffect, useState } from "react";
import {
    BadgeCheck,
    Loader2,
    Save,
} from "lucide-react";
import toast from "react-hot-toast";

import Card from "../../common/Card";
import StatusBadge from "../application/StatusBadge";

import {
    updateApplicationStatus,
} from "../../../services/application.service";

const STATUS_OPTIONS = [
    {
        label: "Shortlisted",
        value: "SHORTLISTED",
    },
    {
        label: "Interview",
        value: "INTERVIEW",
    },
    {
        label: "Hired",
        value: "HIRED",
    },
    {
        label: "Rejected",
        value: "REJECTED",
    },
];

function CandidateActionsCard({
    applicationId,
    currentStatus,
    onStatusUpdated,
}) {

    const [status, setStatus] =
        useState(currentStatus);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        setStatus(currentStatus);

    }, [currentStatus]);

    const handleUpdate =
        async () => {

            if (status === currentStatus) {

                toast("Status is already selected.");

                return;

            }

            try {

                setLoading(true);

                const updated =
                    await updateApplicationStatus(
                        applicationId,
                        status
                    );

                toast.success(
                    "Application status updated successfully."
                );

                onStatusUpdated?.(updated);

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to update application status."
                );

                setStatus(currentStatus);

            }

            finally {

                setLoading(false);

            }

        };

    return (

        <Card>

            <div
                style={{ marginBottom: "2rem" }}
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-slate-900
                    "
                >
                    Recruiter Actions
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{ marginTop: "0.5rem" }}
                >
                    Update the candidate's current hiring stage.
                    Students will automatically receive a notification
                    after the status changes.
                </p>

            </div>

            <div
                className="
                    grid
                    gap-8
                    lg:grid-cols-2
                "
            >

                {/* Current Status */}

                <div>

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-slate-600
                        "
                        style={{ marginBottom: "0.75rem" }}
                    >
                        Current Status
                    </p>

                    <StatusBadge
                        status={currentStatus}
                    />

                </div>

                {/* Update */}

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-semibold
                            text-slate-600
                        "
                        style={{ marginBottom: "0.75rem" }}
                    >
                        Update Status
                    </label>

                    <select
                        value={status}
                        
                        onChange={(e) =>
                            {
                                setStatus(
                                e.target.value
                            )}
                        }
                        disabled={loading}
                        className="
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            outline-none
                            transition
                            focus:border-indigo-500
                            focus:ring-4
                            focus:ring-indigo-100
                        "
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    >

                        {STATUS_OPTIONS.map(
                            (item) => (

                                <option
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>

                            )
                        )}

                    </select>

                </div>

            </div>

            <div
                className="
                    flex
                    justify-end
                "
                style={{ marginTop: "2rem" }}
            >

                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-indigo-600
                        to-violet-600
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-lg
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                    "
                    style={{
                        paddingLeft: "1.5rem",
                        paddingRight: "1.5rem",
                        paddingTop: "0.75rem",
                        paddingBottom: "0.75rem",
                    }}
                >

                    {loading ? (

                        <>

                            <Loader2
                                size={18}
                                className="animate-spin"
                            />

                            Updating...

                        </>

                    ) : (

                        <>

                            <Save size={18} />

                            Update Status

                        </>

                    )}

                </button>

            </div>

            <div
                className="
                    rounded-2xl
                    border
                    border-indigo-100
                    bg-indigo-50
                "
                style={{
                    marginTop: "2rem",
                    padding: "1.25rem",
                }}
            >

                <div className="flex items-start gap-3">

                    <BadgeCheck
                        className="text-indigo-600"
                        style={{ marginTop: "0.25rem" }}
                        size={20}
                    />

                    <div>

                        <h3
                            className="
                                font-semibold
                                text-indigo-900
                            "
                        >
                            Automatic Student Notifications
                        </h3>

                        <p
                            className="
                                text-sm
                                leading-6
                                text-indigo-700
                            "
                            style={{ marginTop: "0.5rem" }}
                        >
                            Whenever you update the application
                            status, TalentBridge automatically
                            sends a notification to the student,
                            keeping them informed throughout the
                            recruitment process.
                        </p>

                    </div>

                </div>

            </div>

        </Card>

    );

}

export default CandidateActionsCard;