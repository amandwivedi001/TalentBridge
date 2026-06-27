import {
    MessageSquare,
    FileText,
    Sparkles,
} from "lucide-react";

function Section({
    icon: Icon,
    title,
    children,
}) {
    return (
        <div
            style={{
                marginTop: "24px",
            }}
        >

            <div className="flex items-center gap-2">

                <Icon
                    size={18}
                    className="text-indigo-600"
                />

                <h4 className="font-semibold text-slate-900">
                    {title}
                </h4>

            </div>

            <div
                className="
                    rounded-2xl
                    bg-slate-50
                "
                style={{
                    marginTop: "12px",
                    padding: "20px",
                }}
            >
                {children}
            </div>

        </div>
    );
}

function QuestionDetails({
    question,
}) {

    return (

        <div
            style={{
                paddingTop: "24px",
            }}
        >

            <Section
                icon={MessageSquare}
                title="Interview Question"
            >

                <p className="leading-8 text-slate-700">
                    {question.question}
                </p>

            </Section>

            <Section
                icon={FileText}
                title="Your Answer"
            >

                <p className="whitespace-pre-wrap leading-8 text-slate-700">

                    {question.answer}

                </p>

            </Section>

            <Section
                icon={Sparkles}
                title="AI Feedback"
            >

                <p className="whitespace-pre-wrap leading-8 text-slate-700">

                    {question.feedback}

                </p>

            </Section>

        </div>

    );

}

export default QuestionDetails;