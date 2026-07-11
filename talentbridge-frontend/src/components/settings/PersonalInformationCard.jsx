import Card from "../common/Card";

function PersonalInformationCard({

    role,

    formData,

    onChange,

}) {

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
                    Personal Information
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{
                        marginTop: "0.5rem",
                    }}
                >
                    Manage your personal profile information.
                </p>

            </div>

            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                "
                style={{
                    marginTop: "2rem",
                }}
            >

                {/* Full Name */}

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
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={onChange}
                        placeholder="Enter your full name"
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
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

                {/* Email */}

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
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={formData.email || ""}
                        readOnly
                        className="
                            h-12
                            w-full
                            cursor-not-allowed
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-100
                            text-slate-500
                        "
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

                {role === "STUDENT" && (
                    <>

                        {/* Phone */}

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
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={onChange}
                                placeholder="Enter phone number"
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
                                    paddingLeft: "1rem",
                                    paddingRight: "1rem",
                                }}
                            />

                        </div>

                        {/* Bio */}

                        <div
                            className="
                                md:col-span-2
                            "
                        >

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
                                Bio
                            </label>

                            <textarea
                                rows={4}
                                name="bio"
                                value={formData.bio || ""}
                                onChange={onChange}
                                placeholder="Tell us something about yourself..."
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    outline-none
                                    transition
                                    focus:border-indigo-500
                                "
                                style={{
                                    padding: "1rem",
                                }}
                            />

                        </div>

                    </>
                )}

            </div>

        </Card>

    );

}

export default PersonalInformationCard;