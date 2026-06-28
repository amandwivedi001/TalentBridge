import { useEffect, useState } from "react";
import { History, Brain } from "lucide-react";
import { getInterviewHistory } from "../../../services/interview.service";

import HistoryCard from "./HistoryCard";
import HistorySkeleton from "./HistorySekeleton";

function HistorySection() {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const data =
                await getInterviewHistory();

            setHistory(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <HistorySkeleton />;

    }

    return (

        <section>

            <div
                className="flex items-center justify-between"
                style={{
                    marginBottom: "32px",
                }}
            >

                <div className="flex items-center gap-4">

                    <div
                        className="
                            rounded-2xl
                            bg-indigo-100
                        "
                        style={{
                            padding: "12px",
                        }}
                    >

                        <History
                            className="text-indigo-600"
                            size={24}
                        />

                    </div>

                    <div>

                        <h2
                            className="
                                text-3xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Recent Interviews
                        </h2>

                        <p
                            className="
                                text-slate-500
                            "
                            style={{
                                marginTop: "8px",
                            }}
                        >
                            Review your previous AI mock interviews and track your progress.
                        </p>

                    </div>

                </div>

                <div
                    className="
                        rounded-full
                        bg-indigo-50
                        text-sm
                        font-semibold
                        text-indigo-700
                    "
                    style={{
                        padding: "8px 16px",
                    }}
                >
                    {history.length} Interviews
                </div>

            </div>

            {history.length === 0 ? (

                <div
                    className="
                        rounded-3xl
                        border
                        border-dashed
                        border-slate-300
                        bg-white
                        text-center
                    "
                    style={{
                        padding: "56px",
                    }}
                >

                    <Brain
                        size={60}
                        className="
                            text-indigo-500
                        "
                        style={{
                            margin: "0 auto",
                        }}
                    />

                    <h3
                        className="
                            text-2xl
                            font-bold
                            text-slate-900
                        "
                        style={{
                            marginTop: "24px",
                        }}
                    >
                        No Interviews Yet
                    </h3>

                    <p
                        className="
                            max-w-xl
                            text-slate-500
                        "
                        style={{
                            margin: "12px auto 0",
                        }}
                    >
                        Complete your first AI interview to
                        receive a detailed report and track
                        your progress over time.
                    </p>

                </div>

            ) : (

                <div
                    className="
                        grid
                        gap-6
                        lg:grid-cols-2
                    "
                >

                    {history.map((interview) => (

                        <HistoryCard
                            key={interview.id}
                            interview={interview}
                        />

                    ))}

                </div>

            )}

        </section>

    );

}

export default HistorySection;