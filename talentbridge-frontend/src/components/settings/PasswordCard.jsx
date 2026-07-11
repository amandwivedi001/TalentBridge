import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import Card from "../common/Card";

function PasswordCard({

    passwordData,

    onChange,

    onSubmit,

    loading,

}) {

    const [showCurrent, setShowCurrent] =
        useState(false);

    const [showNew, setShowNew] =
        useState(false);

    const [showConfirm, setShowConfirm] =
        useState(false);

    return (

        <Card>

            <div>

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-slate-900
                    "
                >
                    Change Password
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{
                        marginTop: "0.5rem",
                    }}
                >
                    Update your account password to keep your account secure.
                </p>

            </div>

            <div
                className="
                    space-y-6
                "
                style={{
                    marginTop: "2rem",
                }}
            >

                {/* Current Password */}

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-slate-700
                        "
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        Current Password
                    </label>

                    <div className="relative">

                        <Lock
                            size={18}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            type={
                                showCurrent
                                    ? "text"
                                    : "password"
                            }
                            name="currentPassword"
                            value={
                                passwordData.currentPassword
                            }
                            onChange={onChange}
                            className="
                                h-12
                                w-full
                                rounded-xl
                                border
                                border-slate-300
                                outline-none
                                transition
                                focus:border-indigo-500
                            "
                            style={{
                                paddingLeft: "2.75rem",
                                paddingRight: "3rem",
                            }}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowCurrent(
                                    !showCurrent
                                )
                            }
                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-500
                            "
                        >

                            {showCurrent
                                ? (
                                    <EyeOff size={18} />
                                )
                                : (
                                    <Eye size={18} />
                                )}

                        </button>

                    </div>

                </div>

                {/* New Password */}

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-slate-700
                        "
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        New Password
                    </label>

                    <div className="relative">

                        <Lock
                            size={18}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            type={
                                showNew
                                    ? "text"
                                    : "password"
                            }
                            name="newPassword"
                            value={
                                passwordData.newPassword
                            }
                            onChange={onChange}
                            className="
                                h-12
                                w-full
                                rounded-xl
                                border
                                border-slate-300
                                outline-none
                                transition
                                focus:border-indigo-500
                            "
                            style={{
                                paddingLeft: "2.75rem",
                                paddingRight: "3rem",
                            }}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowNew(
                                    !showNew
                                )
                            }
                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-500
                            "
                        >

                            {showNew
                                ? (
                                    <EyeOff size={18} />
                                )
                                : (
                                    <Eye size={18} />
                                )}

                        </button>

                    </div>

                </div>

                {/* Confirm Password */}

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-slate-700
                        "
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        Confirm Password
                    </label>

                    <div className="relative">

                        <Lock
                            size={18}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            type={
                                showConfirm
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            value={
                                passwordData.confirmPassword
                            }
                            onChange={onChange}
                            className="
                                h-12
                                w-full
                                rounded-xl
                                border
                                border-slate-300
                                outline-none
                                transition
                                focus:border-indigo-500
                            "
                            style={{
                                paddingLeft: "2.75rem",
                                paddingRight: "3rem",
                            }}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirm(
                                    !showConfirm
                                )
                            }
                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-500
                            "
                        >

                            {showConfirm
                                ? (
                                    <EyeOff size={18} />
                                )
                                : (
                                    <Eye size={18} />
                                )}

                        </button>

                    </div>

                </div>

                <div className="flex justify-end">

                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={loading}
                        className="
                            rounded-xl
                            bg-indigo-600
                            font-semibold
                            text-white
                            transition
                            hover:bg-indigo-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                        style={{
                            padding: "0.75rem 1.5rem",
                        }}
                    >
                        {loading
                            ? "Updating..."
                            : "Update Password"}
                    </button>

                </div>

            </div>

        </Card>

    );

}

export default PasswordCard;