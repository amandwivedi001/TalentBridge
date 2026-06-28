import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import SessionHeader from "../../../components/student/interview/SessionHeader";
import QuestionProgress from "../../../components/student/interview/QuestionProgress";
import QuestionCard from "../../../components/student/interview/QuestionCard";
import AnswerEditor from "../../../components/student/interview/AnswerEditor";
import InterviewSkeleton from "../../../components/student/interview/InterviewSkeleton";
import AIFeedbackCard from "../../../components/student/interview/AIFeedbackCard";

import {
    getInterviewDetails,
    submitAnswer,
    completeInterview,
} from "../../../services/interview.service";
import { Loader2 } from "lucide-react";
import InterviewCompleted from "../../../components/student/interview/report/InterviewCompleted";

function InterviewSession() {
    // Temporary data for Phase A only
    const { sessionId } = useParams();

    const navigate = useNavigate();

    const primaryButton = `
    rounded-2xl
    bg-gradient-to-r
    from-indigo-600
    to-violet-600
    font-semibold
    text-white
    shadow-lg
    shadow-indigo-200
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl
    active:scale-95
`;

    const [session, setSession] =
        useState(null);

    const [questions, setQuestions] =
        useState([]);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answer, setAnswer] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [feedback, setFeedback] = useState(null);

    const [submitting, setSubmitting] = useState(false);

    const [completing, setCompleting] = useState(false);

    const [showSuccess, setShowSuccess] =
        useState(false);


    const isLastQuestion =
        currentQuestion === questions.length - 1;

    const question =
        questions[currentQuestion];

    const hasFeedback =
        feedback !== null;

    const resetQuestionState = () => {
        setAnswer("");
        setFeedback(null);
    };

    useEffect(() => {
        fetchSession();
    }, [sessionId]);

    const fetchSession = async () => {
        try {

            setLoading(true);

            const data =
                await getInterviewDetails(sessionId);

            setSession(data);

            setQuestions(data.questions ?? []);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to load interview."
            );

            navigate("/student/interview");

        } finally {

            setLoading(false);

        }
    };

    const handleNextQuestion = () => {

        if (isLastQuestion) return;

        setCurrentQuestion(prev => prev + 1);

        setAnswer("");

        setFeedback(null);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };

    const handleSubmit = async () => {

        if (!answer.trim()) {
            toast.error("Please write your answer.");
            return;
        }

        try {

            setSubmitting(true);

            const result = await submitAnswer(
                question.id,
                answer.trim()
            );

            setFeedback(result);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to evaluate your answer."
            );

        } finally {

            setSubmitting(false);

        }

    };

    const handleCompleteInterview = async () => {

        try {

            setCompleting(true);

            await completeInterview(sessionId);

            setShowSuccess(true);

            setTimeout(() => {

                navigate(
                    `/student/interviews/report/${sessionId}`
                );

            }, 1800);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to complete interview."
            );

        } finally {

            setCompleting(false);

        }

    };

    if (showSuccess) {

        return <InterviewCompleted />;

    }

    if (loading) {
        return (
            <InterviewSkeleton />
        );
    }

    if (!session || !question) {
        return null;
    }
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}

            <SessionHeader
                interviewType={session.interviewType}
                difficulty={session.difficulty}
            />

            {/* Main */}

            <main
                className="max-w-5xl"
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "2.5rem",
                    paddingBottom: "2.5rem",
                }}
            >
                <div className="space-y-8">
                    {/* Progress */}

                    <QuestionProgress
                        current={currentQuestion}
                        total={questions.length}
                    />

                    {/* Question */}

                    <QuestionCard
                        question={question.question}
                        questionNumber={currentQuestion}
                    />

                    {/* Answer */}

                    <AnswerEditor
                        value={answer}
                        onChange={setAnswer}
                        disabled={hasFeedback}
                    />

                    <AIFeedbackCard
                        feedback={feedback}
                    />

                    {/* Footer */}

                    <div className="flex justify-end">

                        {!hasFeedback && (

                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className={primaryButton}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2
                                            className="mr-2 h-5 w-5 animate-spin"
                                        />
                                        AI is evaluating...
                                    </>
                                ) : (
                                    "Submit Answer"
                                )}
                            </button>

                        )}

                        {hasFeedback && !isLastQuestion && (

                            <button
                                onClick={handleNextQuestion}
                                className={primaryButton}
                            >
                                Next Question →
                            </button>

                        )}

                        {hasFeedback && isLastQuestion && (

                            <button
                                onClick={handleCompleteInterview}
                                disabled={completing}
                                className={primaryButton}
                            >
                                {
                                    completing
                                        ? "⏳ Finalizing Interview..."
                                        : "Complete Interview"
                                }
                            </button>

                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}

export default InterviewSession;