import Card from "../common/Card";

function AnswerEditor({
    value,
    onChange,
    disabled,
}) {
    return (
        <Card className="rounded-3xl">
            <div className="space-y-5">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                        Your Answer
                    </h3>

                    <p
                        className="text-sm text-slate-500"
                        style={{ marginTop: "0.25rem" }}
                    >
                        Explain your reasoning clearly and include examples wherever possible.
                    </p>
                </div>

                <textarea
                    rows={10}
                    value={value}
                    disabled={disabled}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    placeholder={`Type your answer here...

Explain your approach clearly.

Include examples wherever possible.`}
                    className="
                        w-full
                        resize-none
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        text-base
                        leading-8
                        text-slate-700
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-indigo-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-indigo-100
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                    "
                    style={{
                        padding: "1.25rem",
                    }}
                />
            </div>
        </Card>
    );
}

export default AnswerEditor;