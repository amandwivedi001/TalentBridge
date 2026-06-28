import Card from "../../common/Card";
import { Upload, FileText, Eye, RefreshCw } from "lucide-react";

function formatDate(dateString) {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function formatFileSize(bytes) {
    if (!bytes) return null;
    const kb = bytes / 1024;
    if (kb < 1024) return `${Math.round(kb)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
}

function ResumeUploadCard({ resume, uploading, onUpload }) {
    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onUpload(file);
    };

    const handleView = () => {
        window.open(
            `${import.meta.env.VITE_API_URL}/api/resumes/view`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    const fileSize = formatFileSize(resume?.fileSize);

    return (
        <Card className="h-full">
            <div className="flex h-full flex-col">
                <h3 className="text-xl font-semibold text-slate-900">Resume</h3>

                {resume ? (
                    <div className="mt-8 flex flex-1 flex-col">
                        <div className="flex items-start gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-100">
                                <FileText className="h-7 w-7 text-indigo-600" />
                            </div>

                            <div className="min-w-0">
                                <p className="font-semibold text-slate-900 text-lg">
                                    Resume Uploaded ✓
                                </p>

                                <p className="truncate text-slate-500">
                                    {resume.fileName}
                                </p>

                                <div className="mt-5 grid grid-cols-[90px_1fr] gap-y-2 text-sm">
                                    <span className="text-slate-500">Uploaded</span>
                                    <span className="font-medium">
                                        {formatDate(resume.uploadedAt)}
                                    </span>

                                    <span className="text-slate-500">Format</span>
                                    <span className="font-medium">PDF</span>

                                    {fileSize && (
                                        <>
                                            <span className="text-slate-500">Size</span>
                                            <span className="font-medium">{fileSize}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1" />

                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <button
                                type="button"
                                onClick={handleView}
                                disabled={!resume.fileUrl}
                                className="h-14 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
                            >
                                <Eye size={18} />
                                View Resume
                            </button>

                            <label
                                className={`h-14 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2 cursor-pointer ${uploading ? "pointer-events-none opacity-60" : ""
                                    }`}
                            >
                                <RefreshCw size={18} />
                                {uploading ? "Analyzing..." : "Replace Resume"}

                                <input
                                    hidden
                                    type="file"
                                    accept=".pdf"
                                    disabled={uploading}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                ) : (
                    <label
                        className={`flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 transition hover:border-indigo-400 hover:bg-indigo-50 ${uploading ? "pointer-events-none opacity-60" : ""
                            }`}
                        style={{
                            marginTop: "1.5rem",
                            paddingLeft: "1.5rem",
                            paddingRight: "1.5rem",
                            paddingTop: "3rem",
                            paddingBottom: "3rem",
                        }}
                    >
                        <Upload size={36} className="text-indigo-600" />

                        <p className="mt-4 font-semibold">
                            {uploading ? "Analyzing Resume..." : "Upload Resume"}
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            PDF only
                        </p>

                        <input
                            type="file"
                            hidden
                            accept=".pdf"
                            disabled={uploading}
                            onChange={handleChange}
                        />
                    </label>)}
            </div>
        </Card>
    );
}

export default ResumeUploadCard;