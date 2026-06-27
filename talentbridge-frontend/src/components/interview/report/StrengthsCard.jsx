import Card from "../../common/Card";

import {
    CheckCircle2,
    TrendingUp,
} from "lucide-react";

function StrengthsCard({
    strengths = [],
}) {

    return (

        <Card className="h-full">

            <div className="flex h-full flex-col">

                <div className="flex items-center gap-4">

                    <div
                        className="
                            rounded-2xl
                            bg-emerald-100
                        "
                        style={{
                            padding: "12px",
                        }}
                    >
                        <TrendingUp
                            className="text-emerald-600"
                            size={24}
                        />
                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-slate-900">
                            Strengths
                        </h2>

                        <p
                            className="text-slate-500"
                            style={{
                                marginTop: "4px",
                            }}
                        >
                            Areas where you performed well.
                        </p>

                    </div>

                </div>

                <div
                    className="flex-1 space-y-4"
                    style={{
                        marginTop: "32px",
                    }}
                >

                    {strengths.map((item, index) => (

                        <div
                            key={index}
                            className="
                                flex
                                items-start
                                gap-3
                                rounded-2xl
                                bg-emerald-50
                            "
                            style={{
                                padding: "16px",
                            }}
                        >

                            <CheckCircle2
                                size={20}
                                className="
                                    shrink-0
                                    text-emerald-600
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

export default StrengthsCard;