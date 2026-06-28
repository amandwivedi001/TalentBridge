import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getInterviewDetails,
} from "../../../services/interview.service";

import ReportSkeleton from "../../../components/student/interview/report/ReportSkeleton";
import ReportHero from "../../../components/student/interview/report/ReportHero";
import OverallScoreCard from "../../../components/student/interview/report/OverallScoreCard";
import InterviewSummaryCard from "../../../components/student/interview/report/InterviewSummaryCard";
import OverallFeedbackCard from "../../../components/student/interview/report/OverallFeedbackCard";
import StrengthsCard from "../../../components/student/interview/report/StrengthsCard";
import ImprovementCard from "../../../components/student/interview/report/ImprovementCard";
import QuestionBreakdown from "../../../components/student/interview/report/QuestionBreakdown";
import ReportActions from "../../../components/student/interview/report/ReportActions";

function InterviewReport() {

    const { sessionId } = useParams();

    const navigate = useNavigate();

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReport();
    }, [sessionId]);

    const fetchReport = async () => {

        try {

            setLoading(true);

            const data =
                await getInterviewDetails(sessionId);

            setReport(data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to load interview report."
            );

            navigate("/student/interview");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <ReportSkeleton />;
    }

    if (!report) {
        return null;
    }

    return (

        <div className="min-h-screen bg-slate-50">

            <main
                className="
                    max-w-7xl
                    space-y-8
                "
                style={{
                    margin: "0 auto",
                    padding: "40px 24px",
                }}
            >

                <ReportHero
                    report={report}
                />

                <section
                    className="
                        grid
                        gap-6
                        lg:grid-cols-3
                    "
                >

                    <div className="lg:col-span-2">

                        <OverallScoreCard
                            score={report.overallScore}
                        />

                    </div>

                    <InterviewSummaryCard
                        report={report}
                    />

                </section>

                <OverallFeedbackCard
                    feedback={
                        report.overallFeedback
                    }
                />

                <section
                    className="
                        grid
                        gap-6
                        lg:grid-cols-2
                    "
                >

                    <StrengthsCard
                        strengths={
                            report.strengths
                        }
                    />

                    <ImprovementCard
                        improvements={
                            report.improvementAreas
                        }
                    />

                </section>

                <QuestionBreakdown
                    questions={report.questions}
                />

                <ReportActions />

            </main>

        </div>

    );

}

export default InterviewReport;