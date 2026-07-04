import {
    FileText,
    ExternalLink,
    Download,
} from "lucide-react";

import Card from "../../common/Card";
import { getResumeViewUrl } from "../../../utils/resume";

function ResumePreviewCard({

    fileName = "Resume.pdf",

    onViewResume,

    onDownloadResume

}) {

    return (

        <Card>

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-6
                "
            >

                <div
                    className="
                        flex
                        gap-4
                    "
                >

                    <div
                        className="
                            flex
                            h-16
                            w-16
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-red-100
                        "
                    >

                        <FileText
                            size={32}
                            className="text-red-600"
                        />

                    </div>

                    <div>

                        <h2
                            className="
                                text-2xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Resume
                        </h2>

                        <p
                            className="
                                text-slate-500
                            "
                            style={{ marginTop: "0.5rem" }}
                        >
                            View the candidate's uploaded
                            resume or download it for
                            offline review.
                        </p>

                        <div
                            className="
                                rounded-xl
                                bg-slate-100
                            "
                            style={{
                                marginTop: "1.25rem",
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                                paddingTop: "0.75rem",
                                paddingBottom: "0.75rem",
                            }}
                        >

                            <p
                                className="
                                    truncate
                                    text-sm
                                    font-medium
                                    text-slate-700
                                "
                            >
                                {fileName}
                            </p>

                        </div>

                    </div>

                </div>

                <div
                    className="
                        flex
                        flex-col
                        gap-3
                    "
                >

                    <button
                        type="button"
                        onClick={onViewResume}
                        className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-indigo-600
        font-semibold
        text-white
        transition
        hover:bg-indigo-700
    "
                        style={{
                            paddingLeft: "1.25rem",
                            paddingRight: "1.25rem",
                            paddingTop: "0.75rem",
                            paddingBottom: "0.75rem",
                            cursor: "pointer",
                        }}
                    >
                        <ExternalLink size={18} />
                        View Resume
                    </button>

                    <button
                        onClick={onDownloadResume}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            font-semibold
                            text-slate-700
                            transition
                            hover:bg-slate-50
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

        </Card>

    );

}

export default ResumePreviewCard;