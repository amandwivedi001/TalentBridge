import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import CandidateHero from "../../../components/recruiter/candidate/CandidateHero";
import ResumePreviewCard from "../../../components/recruiter/candidate/ResumePreviewCard";
import AcademicSnapshot from "../../../components/recruiter/candidate/AcademicSnapshot";
import ApplicationTimeline from "../../../components/recruiter/candidate/ApplicationTimeline";
import CandidateActionsCard from "../../../components/recruiter/candidate/CandidateActionsCard";
import CandidateDetailsSkeleton from "../../../components/recruiter/candidate/CandidateDetailsSkeleton";

import ATSScoreCard from "../../../components/student/resume/ATSScoreCard";
import ProfessionalSummary from "../../../components/student/resume/ProfessionalSummary";
import SkillsInventory from "../../../components/student/resume/SkillsInventory";
import StrengthsCard from "../../../components/student/resume/StrengthsCard";
import MissingSkillsCard from "../../../components/student/resume/MissingSkillsCard";
import RecommendationsCard from "../../../components/student/resume/RecommendationsCard";

import CandidateMatchCard from "../../../components/recruiter/ai/CandidateMatchCard";
import {
    getApplicationDetails,
} from "../../../services/application.service";

import { viewResume } from "../../../services/resume.service"

function RecruiterCandidateDetails() {

    const { applicationId } =
        useParams();

    const navigate =
        useNavigate();

    const [application, setApplication] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

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

    useEffect(() => {

        fetchCandidate();

    }, [applicationId]);

    const fetchCandidate =
        async () => {

            try {

                setLoading(true);

                const data =
                    await getApplicationDetails(
                        applicationId
                    );

                setApplication(data);

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to load candidate."

                );

                navigate(
                    "/recruiter/applications"
                );

            }

            finally {

                setLoading(false);

            }

        };

    const handleStatusUpdated =
        (updatedApplication) => {

            setApplication((prev) => ({

                ...prev,

                status:
                    updatedApplication.status,

            }));

        };

    if (loading) {

        return (
            <CandidateDetailsSkeleton />
        );

    }

    if (!application) {

        return null;

    }

    const analysis =
        application.student.resume.analysis;

    const resume = application.student.resume;

    return (

        <div
            className="
                max-w-7xl
                space-y-8
            "
            style={{
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >

            <CandidateHero
                application={application}
            />

            <CandidateMatchCard
                candidateMatch={application.candidateMatch}
            />

            <div
                className="
                    grid
                    gap-8
                    lg:grid-cols-2
                "
            >

                <ResumePreviewCard
                    fileName={
                        resume?.fileName
                    }
                    onViewResume={handleViewResume}

                    onDownloadResume={handleDownloadResume}
                />

                <AcademicSnapshot
                    cgpa={
                        analysis.cgpa
                    }
                    tenth={
                        analysis.tenthPercentage
                    }
                    twelfth={
                        analysis.twelfthPercentage
                    }
                />

            </div>

            <ATSScoreCard
                score={
                    analysis.atsScore
                }
            />

            <ProfessionalSummary
                summary={
                    analysis.summary
                }
            />

            <SkillsInventory
                skills={
                    analysis.skills
                }
            />

            <div
                className="
                    grid
                    gap-8
                    lg:grid-cols-2
                "
            >

                <StrengthsCard
                    strengths={
                        analysis.strengths
                    }
                />

                <MissingSkillsCard
                    missingSkills={
                        analysis.missingSkills
                    }
                />

            </div>

            <RecommendationsCard
                recommendations={
                    analysis.recommendations
                }
            />

            <ApplicationTimeline
                status={
                    application.status
                }
            />

            <CandidateActionsCard
                applicationId={
                    application.id
                }
                currentStatus={
                    application.status
                }
                onStatusUpdated={
                    handleStatusUpdated
                }
            />

        </div>

    );

}

export default RecruiterCandidateDetails;