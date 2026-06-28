import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../common/Card";
import { startInterview } from "../../../services/interview.service";

function InterviewTypeCard({ title, description, type }) {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState("MEDIUM");
    const [skill, setSkill] = useState("");
    const [starting, setStarting] = useState(false);

    const skillMissing =
        type === "SKILL_BASED" &&
        !skill.trim();

    const handleStart = async () => {
        if (skillMissing) {
            toast.error(
                "Enter a skill to start this interview"
            );
            return;
        }

        try {
            setStarting(true);

            const payload = {
                interviewType: type,
                difficulty,
            };

            if (type === "SKILL_BASED") {
                payload.skill = skill.trim();
            }

            const session =
                await startInterview(payload);

            navigate(
                `/student/interviews/session/${session.id}`
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Could not start interview"
            );
        } finally {
            setStarting(false);
        }
    };

    return (
        <Card className="h-full border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex h-full flex-col">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                        {title}
                    </h3>

                    <p
                        className="
              text-sm
              leading-relaxed
              text-slate-500
            "
                        style={{
                            marginTop: "0.75rem",
                        }}
                    >
                        {description}
                    </p>
                </div>

                <div
                    style={{
                        marginTop: "1.5rem",
                    }}
                >
                    <label
                        className="
              block
              text-sm
              font-medium
            "
                        style={{
                            marginBottom: "0.5rem",
                        }}
                    >
                        Difficulty
                    </label>

                    <select
                        value={difficulty}
                        onChange={(e) =>
                            setDifficulty(
                                e.target.value
                            )
                        }
                        disabled={starting}
                        className="
              w-full
              rounded-xl
              border
              outline-none
              focus:border-indigo-500
              disabled:opacity-60
            "
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                            paddingTop: "0.75rem",
                            paddingBottom: "0.75rem",
                        }}
                    >
                        <option value="EASY">
                            Easy
                        </option>

                        <option value="MEDIUM">
                            Medium
                        </option>

                        <option value="HARD">
                            Hard
                        </option>
                    </select>
                </div>

                {type === "SKILL_BASED" && (
                    <div
                        style={{
                            marginTop: "1rem",
                        }}
                    >
                        <label
                            className="
                block
                text-sm
                font-medium
              "
                            style={{
                                marginBottom: "0.5rem",
                            }}
                        >
                            Enter Skill
                        </label>

                        <input
                            type="text"
                            value={skill}
                            onChange={(e) =>
                                setSkill(
                                    e.target.value
                                )
                            }
                            disabled={starting}
                            placeholder="React, Node.js, Java..."
                            className="
                w-full
                rounded-xl
                border
                outline-none
                focus:border-indigo-500
                disabled:opacity-60
              "
                            style={{
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                                paddingTop: "0.75rem",
                                paddingBottom: "0.75rem",
                            }}
                        />
                    </div>
                )}

                <div
                    style={{
                        marginTop: "auto",
                        paddingTop: "1.5rem",
                    }}
                >
                    <button
                        type="button"
                        onClick={handleStart}
                        disabled={
                            starting || skillMissing
                        }
                        className="
    group
    relative
    w-full
    overflow-hidden
    rounded-xl
    bg-gradient-to-r
    from-indigo-600
    via-violet-600
    to-purple-600
    font-semibold
    text-white

    transition-all
    duration-300

    hover:-translate-y-1
    hover:scale-[1.02]
    hover:shadow-[0_15px_40px_rgba(99,102,241,0.45)]

    active:translate-y-0
    active:scale-[0.98]

    disabled:cursor-not-allowed
    disabled:opacity-50
    disabled:hover:translate-y-0
    disabled:hover:scale-100
  "
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                            paddingTop: "0.75rem",
                            paddingBottom: "0.75rem",
                        }}
                    >
                        {/* Shine Effect */}
                        <span
                            className="
      absolute
      inset-0
      -translate-x-full
      bg-gradient-to-r
      from-transparent
      via-white/20
      to-transparent
      transition-transform
      duration-700
      group-hover:translate-x-full
    "
                        />

                        <span className="relative z-10">
                            {starting
                                ? "Starting..."
                                : "Start Interview"}
                        </span>
                    </button>
                </div>
            </div>
        </Card>
    );
}

export default InterviewTypeCard;