import {
    CalendarDays,
    Briefcase,
    Mail,
    Download,
    ExternalLink,
    BrainCircuit,
} from "lucide-react";

import StatusBadge from "../application/StatusBadge";
import Card from "../../common/Card";

import {
    getResumeViewUrl,
} from "../../../utils/resume";

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

function CandidateHero({

    application,

}) {

    const student =
        application.student;

    const resume = student.resume;

    const analysis =
        student.resume.analysis;

    const handleViewResume = () => {

        window.open(

            `${import.meta.env.VITE_API_URL}/api/resumes/view/${application.student.id}`,

            "_blank",

            "noopener,noreferrer"

        );

    };

    const handleDownloadResume = () => {

        window.open(

            `${import.meta.env.VITE_API_URL}/api/resumes/download/${application.student.id}`,

            "_blank",

            "noopener,noreferrer"

        );

    };

    return (

        <Card
            className="
                relative
                overflow-hidden
                border-0
                bg-gradient-to-r
                from-violet-600
                via-indigo-600
                to-blue-600
                text-white
                shadow-2xl
            "
        >

            {/* Decorations */}

            <div
                className="
                    absolute
                    -right-10
                    -top-10
                    h-44
                    w-44
                    rounded-full
                    bg-white/10
                "
            />

            <div
                className="
                    absolute
                    bottom-0
                    right-24
                    h-28
                    w-28
                    rounded-full
                    bg-white/5
                "
            />

            <div className="relative z-10">

                <div
                    className="
                        flex
                        flex-col
                        gap-8
                        lg:flex-row
                        lg:justify-between
                    "
                >

                    {/* Left */}

                    <div
                        className="
                            flex
                            gap-5
                        "
                    >

                        <div
                            className="
                                flex
                                h-20
                                w-20
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-white/20
                                text-3xl
                                font-bold
                            "
                        >

                            {student.user.name
                                ?.charAt(0)
                                ?.toUpperCase()}

                        </div>

                        <div>

                            <h1
                                className="
                                    text-4xl
                                    font-bold
                                "
                            >
                                {student.user.name}
                            </h1>

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-5
                                    text-indigo-100
                                "
                                style={{ marginTop: "1rem" }}
                            >

                                <div className="flex items-center gap-2">

                                    <Mail size={18} />

                                    {student.user.email}

                                </div>

                                <div className="flex items-center gap-2">

                                    <Briefcase size={18} />

                                    {application.job.title}

                                </div>

                                <div className="flex items-center gap-2">

                                    <CalendarDays size={18} />

                                    Applied

                                    {formatDate(
                                        application.createdAt
                                    )}

                                </div>

                            </div>

                            <div
                                style={{ marginTop: "1.5rem" }}
                            >

                                <StatusBadge
                                    status={
                                        application.status
                                    }
                                />

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-5
                            lg:items-end
                        "
                    >

                        {/* ATS */}

                        <div
                            className="
                                rounded-2xl
                                bg-white/15
                                backdrop-blur
                            "
                            style={{
                                paddingLeft: "1.5rem",
                                paddingRight: "1.5rem",
                                paddingTop: "1.25rem",
                                paddingBottom: "1.25rem",
                            }}
                        >

                            <div className="flex items-center gap-2">

                                <BrainCircuit size={18} />

                                <span
                                    className="
                                        text-sm
                                        text-indigo-100
                                    "
                                >
                                    ATS Score
                                </span>

                            </div>

                            <h2
                                className="
                                    text-4xl
                                    font-bold
                                "
                                style={{ marginTop: "0.75rem" }}
                            >
                                {analysis?.atsScore ?? "--"}
                            </h2>

                        </div>

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-3
                            "
                        >

                            <button
                                onClick={handleViewResume}
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-white
                                    font-semibold
                                    text-indigo-700
                                    transition
                                    hover:bg-slate-100
                                "
                                style={{
                                    paddingLeft: "1.25rem",
                                    paddingRight: "1.25rem",
                                    paddingTop: "0.75rem",
                                    paddingBottom: "0.75rem",
                                }}
                            >
                                <ExternalLink size={18} />
                                View Resume

                            </button>

                            <button
                                onClick={handleDownloadResume}
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-white/30
                                    bg-white/10
                                    font-semibold
                                    backdrop-blur
                                    transition
                                    hover:bg-white/20
                                "
                                style={{
                                    paddingLeft: "1.25rem",
                                    paddingRight: "1.25rem",
                                    paddingTop: "0.75rem",
                                    paddingBottom: "0.75rem",
                                }}
                            >

                                <Download
                                    size={18}
                                />

                                Download

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </Card>

    );

}

export default CandidateHero;