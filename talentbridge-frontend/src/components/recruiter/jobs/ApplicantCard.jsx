import {
    ArrowRight,
    BrainCircuit,
    CalendarDays,
    GraduationCap,
    Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../../common/Card";
import StatusBadge from "../application/StatusBadge";

function formatDate(date) {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

}

function ApplicantCard({
    application,
}) {

    const navigate =
        useNavigate();

    const analysis =
        application.student.resumeAnalysis;

    return (

        <Card
            className="
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-6
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                <div className="flex gap-4">

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-indigo-600
                            to-violet-600
                            text-lg
                            font-bold
                            text-white
                        "
                    >

                        {application.student.user.name
                            ?.charAt(0)
                            ?.toUpperCase()}

                    </div>

                    <div>

                        <h3
                            className="
                                text-lg
                                font-bold
                                text-slate-900
                            "
                        >
                            {application.student.user.name}
                        </h3>

                        <div
                            className="flex items-center gap-2 text-slate-500"
                            style={{ marginTop: "0.5rem" }}
                        >

                            <Mail size={15} />

                            {application.student.user.email}

                        </div>

                        <div
                            className="flex flex-wrap gap-4 text-sm text-slate-600"
                            style={{ marginTop: "0.75rem" }}
                        >

                            <div className="flex items-center gap-2">

                                <BrainCircuit size={15} />

                                ATS {analysis?.atsScore ?? "--"}

                            </div>

                            <div className="flex items-center gap-2">

                                <GraduationCap size={15} />

                                CGPA {analysis?.cgpa ?? "--"}

                            </div>

                            <div className="flex items-center gap-2">

                                <CalendarDays size={15} />

                                {formatDate(application.createdAt)}

                            </div>

                        </div>

                    </div>

                </div>

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
                        status={application.status}
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
                            bg-indigo-600
                            font-medium
                            text-white
                            transition
                            hover:bg-indigo-700
                        "
                        style={{
                            paddingLeft: "1.25rem",
                            paddingRight: "1.25rem",
                            paddingTop: "0.625rem",
                            paddingBottom: "0.625rem",
                        }}
                    >

                        View Candidate

                        <ArrowRight size={18} />

                    </button>

                </div>

            </div>

        </Card>

    );

}

export default ApplicantCard;