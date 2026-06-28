import {
    AlertTriangle,
    Loader2,
    X,
} from "lucide-react";

function DeleteDialog({
    open,
    loading = false,
    title,
    onClose,
    onConfirm,
}) {

    if (!open) {
        return null;
    }

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                backdrop-blur-sm
            "
            style={{
                padding: "1rem",
            }}
        >

            <div
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    bg-white
                    shadow-2xl
                "
            >

                {/* Header */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                    "
                    style={{
                        padding: "1.5rem",
                    }}
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-red-100
                            "
                        >

                            <AlertTriangle
                                className="text-red-600"
                                size={24}
                            />

                        </div>

                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                Delete Job
                            </h2>

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                                style={{
                                    marginTop: "0.25rem",
                                }}
                            >
                                This action cannot be
                                undone.
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="
                            rounded-xl
                            text-slate-500
                            transition
                            hover:bg-slate-100
                        "
                        style={{
                            padding: "0.5rem",
                        }}
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* Body */}

                <div
                    style={{
                        padding: "1.5rem",
                    }}
                >

                    <p
                        className="
                            leading-7
                            text-slate-600
                        "
                    >
                        Are you sure you want to delete

                        <span
                            className="
                                font-semibold
                                text-slate-900
                            "
                        >

                            {" "}
                            {title}{" "}

                        </span>

                        ?

                    </p>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                        "
                        style={{
                            marginTop: "1.5rem",
                            padding: "1rem",
                        }}
                    >

                        <p
                            className="
                                text-sm
                                text-red-700
                            "
                        >
                            Deleting this job will permanently
                            remove the posting and recruiters
                            will no longer be able to manage
                            its applications.
                        </p>

                    </div>

                </div>

                {/* Footer */}

                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        border-t
                        border-slate-200
                    "
                    style={{
                        padding: "1.5rem",
                    }}
                >

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="
                            rounded-xl
                            border
                            border-slate-300
                            font-medium
                            text-slate-700
                            transition
                            hover:bg-slate-100
                        "
                        style={{
                            padding: "0.625rem 1.25rem",
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            flex
                            min-w-[140px]
                            items-center
                            justify-center
                            rounded-xl
                            bg-red-600
                            font-medium
                            text-white
                            transition
                            hover:bg-red-700
                        "
                        style={{
                            padding: "0.625rem 1.25rem",
                        }}
                    >

                        {loading ? (

                            <>

                                <Loader2
                                    size={18}
                                    className="
                                        animate-spin
                                    "
                                    style={{
                                        marginRight: "0.5rem",
                                    }}
                                />

                                Deleting...

                            </>

                        ) : (

                            "Delete Job"

                        )}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteDialog;