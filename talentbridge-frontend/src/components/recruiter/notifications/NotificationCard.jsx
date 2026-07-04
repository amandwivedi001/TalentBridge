import {
    Bell,
    Briefcase,
    CheckCircle2,
    Clock3,
    XCircle,
    FileText,
} from "lucide-react";

function formatRelativeTime(date) {

    const now = new Date();

    const createdAt =
        new Date(date);

    const diff =
        Math.floor(
            (now - createdAt) / 1000
        );

    if (diff < 60) {

        return "Just now";

    }

    if (diff < 3600) {

        return `${Math.floor(diff / 60)} min ago`;

    }

    if (diff < 86400) {

        return `${Math.floor(diff / 3600)} hr ago`;

    }

    if (diff < 172800) {

        return "Yesterday";

    }

    return createdAt.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

}

function NotificationCard({

    notification,

    onClick,

}) {

    const getNotificationMeta =
        () => {

            switch (
                notification.type
            ) {

                case "APPLICATION_APPLIED":

                    return {

                        icon: Briefcase,

                        iconBg:
                            "bg-blue-100",

                        iconColor:
                            "text-blue-600",

                    };

                case "APPLICATION_SHORTLISTED":

                    return {

                        icon: CheckCircle2,

                        iconBg:
                            "bg-green-100",

                        iconColor:
                            "text-green-600",

                    };

                case "APPLICATION_INTERVIEW":

                    return {

                        icon: Clock3,

                        iconBg:
                            "bg-amber-100",

                        iconColor:
                            "text-amber-600",

                    };

                case "APPLICATION_HIRED":

                    return {

                        icon: CheckCircle2,

                        iconBg:
                            "bg-emerald-100",

                        iconColor:
                            "text-emerald-600",

                    };

                case "APPLICATION_REJECTED":

                    return {

                        icon: XCircle,

                        iconBg:
                            "bg-red-100",

                        iconColor:
                            "text-red-600",

                    };

                default:

                    return {

                        icon: Bell,

                        iconBg:
                            "bg-slate-100",

                        iconColor:
                            "text-slate-600",

                    };

            }

        };

    const {

        icon: Icon,

        iconBg,

        iconColor,

    } = getNotificationMeta();

    return (

        <button
            type="button"
            onClick={() =>
                onClick?.(
                    notification
                )
            }
            style={{
                padding: "1.25rem",
            }}
            className={`
                group
                flex
                w-full
                items-start
                gap-4
                rounded-2xl
                border
                text-left
                transition-all
                duration-200
                hover:border-indigo-200
                hover:bg-indigo-50/40
                ${notification.isRead
                    ? "border-slate-200 bg-white"
                    : "border-indigo-200 bg-indigo-50/30"}
            `}
        >

            <div
                className={`
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${iconBg}
                `}
            >

                <Icon
                    size={22}
                    className={iconColor}
                />

            </div>

            <div className="min-w-0 flex-1">

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
                >

                    <div>

                        <h3
                            className="
                                text-base
                                font-semibold
                                text-slate-900
                            "
                        >
                            {notification.title}
                        </h3>

                        <p
                            style={{
                                marginTop: "0.5rem",
                            }}
                            className="
                                text-sm
                                leading-6
                                text-slate-600
                            "
                        >
                            {notification.message}
                        </p>

                    </div>

                    {!notification.isRead && (

                        <span
                            style={{
                                marginTop: "0.5rem",
                            }}
                            className="
                                h-3
                                w-3
                                rounded-full
                                bg-indigo-600
                            "
                        />

                    )}

                </div>

                <div
                    style={{
                        marginTop: "1rem",
                    }}
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >

                    <span
                        className="
                            text-xs
                            font-medium
                            text-slate-500
                        "
                    >
                        {formatRelativeTime(
                            notification.createdAt
                        )}
                    </span>

                    {!notification.isRead && (

                        <span
                            style={{
                                padding: "0.25rem 0.75rem",
                            }}
                            className="
                                rounded-full
                                bg-indigo-100
                                text-xs
                                font-semibold
                                text-indigo-700
                            "
                        >
                            Unread
                        </span>

                    )}

                </div>

            </div>

        </button>

    );

}

export default NotificationCard;