import { useEffect, useState } from "react";
import { Loader2, BriefcaseBusiness, FileText, GraduationCap } from "lucide-react";

import Card from "../../common/Card";
import SkillsInput from "./SkillsInput";

const initialForm = {
    title: "",
    role: "",
    description: "",
    requiredSkills: [],
    location: "",
    salary: "",
    minCgpa: "",
    minTenthPercentage: "",
    minTwelfthPercentage: "",
    isActive: true,
};

function JobForm({
    initialValues,
    onSubmit,
    loading = false,
    submitLabel = "Create Job",
    cancelLabel = "Cancel",
    onCancel,
}) {

    const [form, setForm] =
        useState(initialForm);

    useEffect(() => {

        if (!initialValues) return;

        setForm({

            title:
                initialValues.title || "",

            role:
                initialValues.role || "",

            description:
                initialValues.description || "",

            requiredSkills:
                initialValues.requiredSkills || [],

            location:
                initialValues.location || "",

            salary:
                initialValues.salary || "",

            minCgpa:
                initialValues.minCgpa ?? "",

            minTenthPercentage:
                initialValues.minTenthPercentage ?? "",

            minTwelfthPercentage:
                initialValues.minTwelfthPercentage ?? "",

            isActive:
                initialValues.isActive ?? true,

        });

    }, [initialValues]);

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const payload = {

            ...form,

            minCgpa:
                form.minCgpa === ""
                    ? undefined
                    : Number(form.minCgpa),

            minTenthPercentage:
                form.minTenthPercentage === ""
                    ? undefined
                    : Number(
                        form.minTenthPercentage
                    ),

            minTwelfthPercentage:
                form.minTwelfthPercentage === ""
                    ? undefined
                    : Number(
                        form.minTwelfthPercentage
                    ),

        };

        onSubmit(payload);

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            {/* ---------------- Basic Information ---------------- */}

            <Card>

                <div className="flex items-center gap-3">

                    <div
                        className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-indigo-100
                "
                    >

                        <BriefcaseBusiness
                            className="text-indigo-600"
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
                            Basic Information
                        </h2>

                        <p
                            style={{
                                marginTop: "0.25rem",
                            }}
                            className="
                        text-sm
                        text-slate-500
                    "
                        >
                            Provide the primary details about
                            the job opening.
                        </p>

                    </div>

                </div>

                <div
                    style={{
                        marginTop: "2rem",
                    }}
                    className="
                grid
                gap-6
                md:grid-cols-2
            "
                >

                    <div>

                        <label
                            style={{
                                marginBottom: "0.5rem",
                            }}
                            className="
                        block
                        text-sm
                        font-medium
                        text-slate-700
                    "
                        >
                            Job Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Backend Developer Intern"
                            style={{
                                padding: "0 1rem",
                            }}
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
                            required
                        />

                    </div>

                    <div>

                        <label
                            style={{
                                marginBottom: "0.5rem",
                            }}
                            className="
                        block
                        text-sm
                        font-medium
                        text-slate-700
                    "
                        >
                            Role
                        </label>

                        <input
                            type="text"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            placeholder="Software Engineer"
                            style={{
                                padding: "0 1rem",
                            }}
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
                            required
                        />

                    </div>

                    <div>

                        <label
                            style={{
                                marginBottom: "0.5rem",
                            }}
                            className="
                        block
                        text-sm
                        font-medium
                        text-slate-700
                    "
                        >
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Indore"
                            style={{
                                padding: "0 1rem",
                            }}
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
                        />

                    </div>

                    <div>

                        <label
                            style={{
                                marginBottom: "0.5rem",
                            }}
                            className="
                        block
                        text-sm
                        font-medium
                        text-slate-700
                    "
                        >
                            Salary / Stipend
                        </label>

                        <input
                            type="text"
                            name="salary"
                            value={form.salary}
                            onChange={handleChange}
                            placeholder="₹8 LPA / ₹30,000 per month"
                            style={{
                                padding: "0 1rem",
                            }}
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
                        />

                    </div>

                </div>

            </Card>

            {/* ---------------- Job Description ---------------- */}

            <Card>

                <div
                    className="flex items-center gap-3"
                    style={{ margin: 0, padding: 0 }}
                >

                    <div
                        className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-indigo-100
            "
                        style={{ margin: 0, padding: 0 }}
                    >

                        <FileText
                            size={24}
                            className="text-indigo-600"
                        />

                    </div>

                    <div style={{ margin: 0, padding: 0 }}>

                        <h2
                            className="
                    text-xl
                    font-bold
                    text-slate-900
                "
                            style={{ margin: 0, padding: 0 }}
                        >
                            Job Description
                        </h2>

                        <p
                            className="
                    text-sm
                    text-slate-500
                "
                            style={{ marginTop: "0.25rem", padding: 0 }}
                        >
                            Explain the responsibilities,
                            expectations and requirements
                            of this role.
                        </p>

                    </div>

                </div>

                <div
                    style={{ marginTop: "2rem", padding: 0 }}
                >

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the job responsibilities, expectations and candidate requirements..."
                        rows={8}
                        className="
                min-h-[220px]
                w-full
                rounded-2xl
                border
                border-slate-300
                leading-7
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
            "
                        style={{ padding: "1rem", margin: 0 }}
                        required
                    />

                </div>

            </Card>

            {/* ---------------- Required Skills ---------------- */}

            <Card>

                <SkillsInput

                    skills={form.requiredSkills}

                    onChange={(skills) =>
                        setForm((prev) => ({
                            ...prev,
                            requiredSkills: skills,
                        }))
                    }

                />

            </Card>

            {/* ---------------- Eligibility ---------------- */}

            <Card>

                <div
                    className="flex items-center gap-3"
                    style={{ margin: 0, padding: 0 }}
                >

                    <div
                        className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-indigo-100
            "
                        style={{ margin: 0, padding: 0 }}
                    >

                        <GraduationCap
                            size={24}
                            className="text-indigo-600"
                        />

                    </div>

                    <div style={{ margin: 0, padding: 0 }}>

                        <h2
                            className="
                    text-xl
                    font-bold
                    text-slate-900
                "
                            style={{ margin: 0, padding: 0 }}
                        >
                            Eligibility Criteria
                        </h2>

                        <p
                            className="
                    text-sm
                    text-slate-500
                "
                            style={{ marginTop: "0.25rem", padding: 0 }}
                        >
                            Specify the minimum academic
                            requirements for applicants.
                        </p>

                    </div>

                </div>

                <div
                    className="
            grid
            gap-6
            md:grid-cols-3
        "
                    style={{ marginTop: "2rem", padding: 0 }}
                >

                    <div style={{ margin: 0, padding: 0 }}>

                        <label
                            className="
                    block
                    text-sm
                    font-medium
                    text-slate-700
                "
                            style={{ marginBottom: "0.5rem", padding: 0 }}
                        >
                            Minimum CGPA
                        </label>

                        <input
                            type="number"
                            name="minCgpa"
                            value={form.minCgpa}
                            onChange={handleChange}
                            step="0.1"
                            min="0"
                            max="10"
                            placeholder="7.5"
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
                            style={{ padding: "0 1rem", margin: 0 }}
                        />

                    </div>

                    <div style={{ margin: 0, padding: 0 }}>

                        <label
                            className="
                    block
                    text-sm
                    font-medium
                    text-slate-700
                "
                            style={{ marginBottom: "0.5rem", padding: 0 }}
                        >
                            Minimum 10th %
                        </label>

                        <input
                            type="number"
                            name="minTenthPercentage"
                            value={form.minTenthPercentage}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            placeholder="70"
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
                            style={{ padding: "0 1rem", margin: 0 }}
                        />

                    </div>

                    <div style={{ margin: 0, padding: 0 }}>

                        <label
                            className="
                    block
                    text-sm
                    font-medium
                    text-slate-700
                "
                            style={{ marginBottom: "0.5rem", padding: 0 }}
                        >
                            Minimum 12th %
                        </label>

                        <input
                            type="number"
                            name="minTwelfthPercentage"
                            value={form.minTwelfthPercentage}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            placeholder="75"
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
                            style={{ padding: "0 1rem", margin: 0 }}
                        />

                    </div>

                </div>

            </Card>



            {/* ---------------- Hiring Status ---------------- */}

            <Card>

                <h2
                    className="
            text-xl
            font-bold
            text-slate-900
        "
                    style={{ margin: 0, padding: 0 }}
                >
                    Hiring Status
                </h2>

                <p
                    className="
            text-sm
            text-slate-500
        "
                    style={{ marginTop: "0.25rem", padding: 0 }}
                >
                    Control whether students can apply
                    for this position.
                </p>

                <label
                    className="
            flex
            cursor-pointer
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
        "
                    style={{ marginTop: "2rem", padding: "1.25rem" }}
                >

                    <div style={{ margin: 0, padding: 0 }}>

                        <h3
                            className="
                    font-semibold
                    text-slate-900
                "
                            style={{ margin: 0, padding: 0 }}
                        >
                            Open for Applications
                        </h3>

                        <p
                            className="
                    text-sm
                    text-slate-500
                "
                            style={{ marginTop: "0.25rem", padding: 0 }}
                        >
                            Students will be able to
                            discover and apply for this
                            job.
                        </p>

                    </div>

                    <input
                        type="checkbox"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleChange}
                        className="
                h-5
                w-5
                accent-indigo-600
            "
                        style={{ margin: 0, padding: 0 }}
                    />

                </label>

            </Card>

            {/* ---------------- Footer ---------------- */}

            <div
                className="
        flex
        flex-col-reverse
        gap-4
        sm:flex-row
        sm:justify-end
    "
                style={{ margin: 0, padding: 0 }}
            >

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="
            h-12
            rounded-xl
            border
            border-slate-300
            font-semibold
            text-slate-700
            transition
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-60
        "
                    style={{ padding: "0 1.5rem", margin: 0 }}
                >
                    {cancelLabel}
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="
            flex
            h-12
            min-w-[180px]
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            font-semibold
            text-white
            shadow-lg
            shadow-indigo-200
            transition-all
            hover:-translate-y-0.5
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-70
        "
                    style={{ padding: "0 1.5rem", margin: 0 }}
                >

                    {loading ? (

                        <>

                            <Loader2
                                size={18}
                                className="
                        animate-spin
                    "
                                style={{ marginRight: "0.5rem", padding: 0 }}
                            />

                            Saving...

                        </>

                    ) : (

                        submitLabel

                    )}

                </button>

            </div>

        </form>

    );

}

export default JobForm;
