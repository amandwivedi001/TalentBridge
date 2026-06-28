import Card from "../../../common/Card";

import {
    Target,
    ArrowUpCircle,
} from "lucide-react";

function ImprovementCard({
    improvements = [],
}) {

    return (

        <Card className="h-full">

            <div className="flex h-full flex-col">

                <div className="flex items-center gap-4">

                    <div
                        className="
                            rounded-2xl
                            bg-amber-100
                        "
                        style={{
                            padding: "12px",
                        }}
                    >
                        <Target
                            className="text-amber-600"
                            size={24}
                        />
                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-slate-900">
                            Improvement Areas
                        </h2>

                        <p
                            className="text-slate-500"
                            style={{
                                marginTop: "4px",
                            }}
                        >
                            Focus on these topics in your next interview.
                        </p>

                    </div>

                </div>

                <div
                    className="flex-1 space-y-4"
                    style={{
                        marginTop: "32px",
                    }}
                >

                    {improvements.map((item, index) => (

                        <div
                            key={index}
                            className="
                                flex
                                items-start
                                gap-3
                                rounded-2xl
                                bg-amber-50
                            "
                            style={{
                                padding: "16px",
                            }}
                        >

                            <ArrowUpCircle
                                size={20}
                                className="
                                    shrink-0
                                    text-amber-600
                                "
                                style={{
                                    marginTop: "2px",
                                }}
                            />

                            <p
                                className="
                                    leading-7
                                    text-slate-700
                                "
                            >
                                {item}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </Card>

    );

}

export default ImprovementCard;