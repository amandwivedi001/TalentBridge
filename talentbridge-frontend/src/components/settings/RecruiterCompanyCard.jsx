import Card from "../common/Card";

function RecruiterCompanyCard({

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
                    Company Information
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{
                        marginTop: "0.5rem",
                    }}
                >
                    Keep your company profile updated so candidates know more about your organization.
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

                {/* Company Name */}

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
                        Company Name
                    </label>

                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName || ""}
                        onChange={onChange}
                        placeholder="Google"
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

                {/* Designation */}

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
                        Designation
                    </label>

                    <input
                        type="text"
                        name="designation"
                        value={formData.designation || ""}
                        onChange={onChange}
                        placeholder="Technical Recruiter"
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

                {/* Website */}

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
                        Company Website
                    </label>

                    <input
                        type="url"
                        name="companyWebsite"
                        value={formData.companyWebsite || ""}
                        onChange={onChange}
                        placeholder="https://company.com"
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

                {/* Location */}

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
                        Company Location
                    </label>

                    <input
                        type="text"
                        name="companyLocation"
                        value={formData.companyLocation || ""}
                        onChange={onChange}
                        placeholder="Bengaluru, India"
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

                {/* Description */}

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
                        Company Description
                    </label>

                    <textarea
                        rows={6}
                        name="companyDescription"
                        value={
                            formData.companyDescription || ""
                        }
                        onChange={onChange}
                        placeholder="Tell candidates about your company..."
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

            </div>

        </Card>

    );

}

export default RecruiterCompanyCard;