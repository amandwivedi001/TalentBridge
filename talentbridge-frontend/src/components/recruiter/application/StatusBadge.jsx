import {
    Clock3,
    CheckCircle2,
    CalendarClock,
    Trophy,
    XCircle,
    Undo2,
} from "lucide-react";

const STATUS_CONFIG = {

    APPLIED: {
        label: "Applied",
        icon: Clock3,
        className: "bg-blue-100 text-blue-700",
    },

    SHORTLISTED: {
        label: "Shortlisted",
        icon: CheckCircle2,
        className: "bg-emerald-100 text-emerald-700",
    },

    INTERVIEW: {
        label: "Interview",
        icon: CalendarClock,
        className: "bg-amber-100 text-amber-700",
    },

    HIRED: {
        label: "Hired",
        icon: Trophy,
        className: "bg-purple-100 text-purple-700",
    },

    REJECTED: {
        label: "Rejected",
        icon: XCircle,
        className: "bg-red-100 text-red-700",
    },

    WITHDRAWN: {
        label: "Withdrawn",
        icon: Undo2,
        className: "bg-slate-100 text-slate-700",
    },

};

function StatusBadge({
    status,
}) {

    const config =
        STATUS_CONFIG[status] ||
        STATUS_CONFIG.APPLIED;

    const Icon = config.icon;

    return (

        <span
            className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                text-sm
                font-semibold
                ${config.className}
            `}
            style={{
                paddingLeft: "0.75rem",
                paddingRight: "0.75rem",
                paddingTop: "0.375rem",
                paddingBottom: "0.375rem",
            }}
        >

            <Icon size={16} />

            {config.label}

        </span>

    );

}

export default StatusBadge;