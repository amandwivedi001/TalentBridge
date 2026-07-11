import Card from "../common/Card";

function StudentAcademicCard({

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
                    Academic Information
                </h2>

                <p
                    className="
                        text-slate-500
                    "
                    style={{
                        marginTop: "0.5rem",
                    }}
                >
                    Keep your academic profile updated for better recruiter visibility.
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

                {/* College */}

                <div>

                    <label
                        className="block text-sm font-medium text-slate-700"
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        College
                    </label>

                    <input
                        type="text"
                        name="college"
                        value={formData.college || ""}
                        onChange={onChange}
                        placeholder="College Name"
                        className="h-12 w-full rounded-xl border border-slate-300 outline-none focus:border-indigo-500"
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

                {/* Degree */}

                <div>

                    <label
                        className="block text-sm font-medium text-slate-700"
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        Degree
                    </label>

                    <input
                        type="text"
                        name="degree"
                        value={formData.degree || ""}
                        onChange={onChange}
                        placeholder="Bachelor of Engineering"
                        className="h-12 w-full rounded-xl border border-slate-300 outline-none focus:border-indigo-500"
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

                {/* Branch */}

                <div>

                    <label
                        className="block text-sm font-medium text-slate-700"
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        Branch
                    </label>

                    <input
                        type="text"
                        name="branch"
                        value={formData.branch || ""}
                        onChange={onChange}
                        placeholder="Information Technology"
                        className="h-12 w-full rounded-xl border border-slate-300 outline-none focus:border-indigo-500"
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

                {/* Graduation */}

                <div>

                    <label
                        className="block text-sm font-medium text-slate-700"
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        Graduation Year
                    </label>

                    <input
                        type="number"
                        name="graduationYear"
                        value={formData.graduationYear || ""}
                        onChange={onChange}
                        placeholder="2027"
                        className="h-12 w-full rounded-xl border border-slate-300 outline-none focus:border-indigo-500"
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

                {/* Skills */}

                <div
                    className="
                        md:col-span-2
                    "
                >

                    <label
                        className="block text-sm font-medium text-slate-700"
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        Skills
                    </label>

                    <input
                        type="text"
                        name="skills"
                        value={
                            Array.isArray(formData.skills)

                                ? formData.skills.join(", ")

                                : ""
                        }
                        onChange={onChange}
                        placeholder="React, Node.js, MongoDB, Express"
                        className="h-12 w-full rounded-xl border border-slate-300 outline-none focus:border-indigo-500"
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    />

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.5rem",
                        }}
                    >
                        Separate skills using commas.
                    </p>

                </div>

                {/* LinkedIn */}

                <div>

                    <label
                        className="block text-sm font-medium text-slate-700"
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        LinkedIn
                    </label>

                    <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl || ""}
                        onChange={onChange}
                        placeholder="https://linkedin.com/in/..."
                        className="h-12 w-full rounded-xl border border-slate-300 outline-none focus:border-indigo-500"
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

                {/* GitHub */}

                <div>

                    <label
                        className="block text-sm font-medium text-slate-700"
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        GitHub
                    </label>

                    <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl || ""}
                        onChange={onChange}
                        placeholder="https://github.com/..."
                        className="h-12 w-full rounded-xl border border-slate-300 outline-none focus:border-indigo-500"
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

                {/* Portfolio */}

                <div
                    className="
                        md:col-span-2
                    "
                >

                    <label
                        className="block text-sm font-medium text-slate-700"
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        Portfolio
                    </label>

                    <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl || ""}
                        onChange={onChange}
                        placeholder="https://yourportfolio.com"
                        className="h-12 w-full rounded-xl border border-slate-300 outline-none focus:border-indigo-500"
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}
                    />

                </div>

            </div>

        </Card>

    );

}

export default StudentAcademicCard;