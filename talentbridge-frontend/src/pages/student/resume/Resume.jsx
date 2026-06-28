import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    generateResumeAnalysis,
    getResume,
    getResumeAnalysis,
    uploadResume,
} from "../../../services/resume.service";

import ResumeHero from "../../../components/student/resume/ResumeHero";
import ResumeUploadCard from "../../../components/student/resume/ResumeUploadCard";
import ATSScoreCard from "../../../components/student/resume/ATSScoreCard";
import ProfessionalSummary from "../../../components/student/resume/ProfessionalSummary";
import EducationSnapshot from "../../../components/student/resume/EducationSnapshot";
import RecommendationsCard from "../../../components/student/resume/RecommendationsCard";
import MissingSkillsCard from "../../../components/student/resume/MissingSkillsCard";
import ImprovementAreas from "../../../components/student/resume/ImprovementAreas";
import StrengthsCard from "../../../components/student/resume/StrengthsCard";
import SkillsInventory from "../../../components/student/resume/SkillsInventory";

function Resume() {
    const [resume, setResume] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchResumeData();
    }, []);

    const fetchResumeData = async () => {
        try {
            setLoading(true);

            const [resumeRes, analysisRes] = await Promise.all([
                getResume(),
                getResumeAnalysis(),
            ]);

            setResume(resumeRes.data.data);
            setAnalysis(analysisRes.data.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load resume data");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file) => {
        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("resume", file);

            await uploadResume(formData);

            toast.success("Resume uploaded and analyzed successfully");

            await fetchResumeData();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to upload resume"
            );
        } finally {
            setUploading(false);
        }
    };




    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            </div>
        );
    }

    if (!resume) {
        return (
            <div
                className="max-w-5xl mx-auto"
                style={{
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "2rem",
                    paddingBottom: "2rem",
                }}
            >
                <div className="mb-8">
                    <ResumeHero score={0} />
                </div>

                <ResumeUploadCard
                    resume={null}
                    uploading={uploading}
                    onUpload={handleUpload}
                />

                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                        📄
                    </div>

                    <h2 className="mt-6 text-3xl font-bold text-slate-900">
                        Upload Your Resume
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                        Get an ATS score, discover missing skills, identify
                        improvement areas, and receive AI-powered recommendations
                        to increase your chances of getting shortlisted.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl bg-slate-50 p-5">
                            <div className="text-2xl">🎯</div>
                            <h3 className="mt-3 font-semibold">
                                ATS Score
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Measure how recruiter-friendly your resume is.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-5">
                            <div className="text-2xl">🛠️</div>
                            <h3 className="mt-3 font-semibold">
                                Skill Analysis
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Extract and categorize your technical skills.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-5">
                            <div className="text-2xl">📈</div>
                            <h3 className="mt-3 font-semibold">
                                Improvements
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Find weaknesses and areas to strengthen.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-5">
                            <div className="text-2xl">💡</div>
                            <h3 className="mt-3 font-semibold">
                                AI Suggestions
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Receive personalized recommendations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="max-w-7xl space-y-6"
            style={{
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "1rem",
                paddingBottom: "2rem",
            }}
        >
            <ResumeHero score={analysis?.atsScore || 0} />

            <div className="grid gap-6 lg:grid-cols-2 items-stretch">
                <ResumeUploadCard
                    resume={resume}
                    uploading={uploading}
                    onUpload={handleUpload}
                />

                <ATSScoreCard
                    score={analysis?.atsScore || 0}
                    lastAnalyzedAt={analysis?.lastAnalyzedAt}
                />
            </div>

            <ProfessionalSummary summary={analysis?.summary} />

            <EducationSnapshot
                cgpa={analysis?.cgpa}
                tenth={analysis?.tenthPercentage}
                twelfth={analysis?.twelfthPercentage}
            />

            <SkillsInventory skills={analysis?.skills || []} />

            <div className="grid gap-6 lg:grid-cols-3">
                <StrengthsCard strengths={analysis?.strengths || []} />
                <ImprovementAreas areas={analysis?.weaknesses || []} />
                <MissingSkillsCard skills={analysis?.missingSkills || []} />
            </div>

            <RecommendationsCard suggestions={analysis?.suggestions || []} />
        </div>
    );
}

export default Resume;