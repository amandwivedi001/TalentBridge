import Card from "../../../common/Card";

import {
    Bot,
} from "lucide-react";

function OverallFeedbackCard({
    feedback,
}) {

    return (

        <Card>

            <div
                className="
                    flex
                    items-start
                    gap-5
                "
            >

                <div
                    className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-indigo-100
                    "
                >

                    <Bot
                        size={28}
                        className="
                            text-indigo-600
                        "
                    />

                </div>

                <div
                    className="
                        flex-1
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Overall AI Feedback
                    </h2>

                    <p
                        className="
                            whitespace-pre-line
                            text-lg
                            leading-9
                            text-slate-600
                        "
                        style={{
                            marginTop: "24px",
                        }}
                    >

                        {feedback}

                    </p>

                </div>

            </div>

        </Card>

    );

}

export default OverallFeedbackCard;