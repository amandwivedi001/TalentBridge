import {
    Calendar,
    GraduationCap,
    ArrowRight,
    BrainCircuit,
    Briefcase,
    Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../../common/Card";
import StatusBadge from "./StatusBadge";

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

function ApplicationCard({
    application,
}) {

    const navigate = useNavigate();

    const student =
        application.student;

    const analysis =
        student.resume.analysis;

    return (

        <Card
            className="
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >

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

                <div
                    className="flex gap-5"
                >

                    <div
                        className="
                            flex
                            h-16
                            w-16
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-indigo-600
                            to-violet-600
                            text-xl
                            font-bold
                            text-white
                        "
                    >
                        {student.user.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </div>

                    <div>

                        <h2
                            className="
                                text-xl
                                font-bold
                                text-slate-900
                            "
                        >
                            {student.user.name}
                        </h2>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-slate-500
                            "
                            style={{ marginTop: "0.5rem" }}
                        >

                            <Mail size={16} />

                            {student.user.email}

                        </div>

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-4
                                text-sm
                                text-slate-600
                            "
                            style={{ marginTop: "1rem" }}
                        >

                            <div className="flex items-center gap-2">

                                <Briefcase
                                    size={16}
                                />

                                {application.job.title}

                            </div>

                            <div className="flex items-center gap-2">

                                <Calendar
                                    size={16}
                                />

                                {formatDate(
                                    application.createdAt
                                )}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div
                    className="
                        flex
                        flex-col
                        items-start
                        gap-4
                        lg:items-end
                    "
                >

                    <StatusBadge
                        status={
                            application.status
                        }
                    />

                    <button
                        onClick={() =>
                            navigate(
                                `/recruiter/candidates/${application.id}`
                            )
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-indigo-600
                            to-violet-600
                            font-medium
                            text-white
                            transition
                            hover:shadow-lg
                        "
                        style={{
                            paddingLeft: "1.25rem",
                            paddingRight: "1.25rem",
                            paddingTop: "0.625rem",
                            paddingBottom: "0.625rem",
                        }}
                    >

                        View Candidate

                        <ArrowRight
                            size={18}
                        />

                    </button>

                </div>

            </div>

            {/* Bottom */}

            <div
                className="
                    grid
                    gap-4
                    md:grid-cols-3
                "
                style={{ marginTop: "2rem" }}
            >

                <div
                    className="
                        rounded-2xl
                        bg-indigo-50
                    "
                    style={{ padding: "1.25rem" }}
                >

                    <div className="flex items-center gap-2">

                        <BrainCircuit
                            size={18}
                            className="
                                text-indigo-600
                            "
                        />

                        <span
                            className="
                                text-sm
                                text-slate-500
                            "
                        >
                            ATS Score
                        </span>

                    </div>

                    <h3
                        className="
                            text-3xl
                            font-bold
                            text-indigo-700
                        "
                        style={{ marginTop: "0.75rem" }}
                    >
                        {analysis?.atsScore ?? "--"}
                    </h3>

                </div>

                <div
                    className="
                        rounded-2xl
                        bg-emerald-50
                    "
                    style={{ padding: "1.25rem" }}
                >

                    <div className="flex items-center gap-2">

                        <GraduationCap
                            size={18}
                            className="
                                text-emerald-600
                            "
                        />

                        <span
                            className="
                                text-sm
                                text-slate-500
                            "
                        >
                            CGPA
                        </span>

                    </div>

                    <h3
                        className="
                            text-3xl
                            font-bold
                            text-emerald-700
                        "
                        style={{ marginTop: "0.75rem" }}
                    >
                        {analysis?.cgpa ?? "--"}
                    </h3>

                </div>

                <div
                    className="
                        rounded-2xl
                        bg-amber-50
                    "
                    style={{ padding: "1.25rem" }}
                >

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                    >
                        Top Skills
                    </p>

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-2
                        "
                        style={{ marginTop: "0.75rem" }}
                    >

                        {(analysis?.skills || [])
                            .slice(0, 3)
                            .map((skill) => (

                                <span
                                    key={skill}
                                    className="
                                        rounded-full
                                        bg-white
                                        text-xs
                                        font-medium
                                        text-slate-700
                                    "
                                    style={{
                                        paddingLeft: "0.75rem",
                                        paddingRight: "0.75rem",
                                        paddingTop: "0.25rem",
                                        paddingBottom: "0.25rem",
                                    }}
                                >
                                    {skill}
                                </span>

                            ))}

                    </div>

                </div>

            </div>

        </Card>

    );

}

export default ApplicationCard;