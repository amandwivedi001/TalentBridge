import { useState } from "react";
import { Plus, X } from "lucide-react";

function SkillsInput({
    skills = [],
    onChange,
}) {

    const [value, setValue] =
        useState("");

    const addSkill = () => {

        const skill =
            value.trim();

        if (!skill) return;

        if (
            skills.some(
                (item) =>
                    item.toLowerCase() ===
                    skill.toLowerCase()
            )
        ) {

            setValue("");

            return;

        }

        if (skills.length >= 15) return;

        onChange([
            ...skills,
            skill,
        ]);

        setValue("");

    };

    const removeSkill = (
        skill
    ) => {

        onChange(
            skills.filter(
                (item) =>
                    item !== skill
            )
        );

    };

    const handleKeyDown = (
        e
    ) => {

        if (
            e.key === "Enter" ||
            e.key === ","
        ) {

            e.preventDefault();

            addSkill();

        }

    };

    return (

        <div>

            <label
                style={{
                    marginBottom: "0.5rem",
                }}
                className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                "
            >
                Required Skills
            </label>

            <div
                style={{
                    padding: "0.75rem",
                }}
                className="
                    rounded-2xl
                    border
                    border-slate-300
                    bg-white
                    transition
                    focus-within:border-indigo-500
                    focus-within:ring-4
                    focus-within:ring-indigo-100
                "
            >

                <div
                    style={{
                        marginBottom: "0.75rem",
                    }}
                    className="
                        flex
                        flex-wrap
                        gap-2
                    "
                >

                    {skills.map(
                        (skill) => (

                            <span
                                key={skill}
                                style={{
                                    padding: "0.375rem 0.75rem",
                                }}
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-indigo-100
                                    text-sm
                                    font-medium
                                    text-indigo-700
                                "
                            >

                                {skill}

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeSkill(
                                            skill
                                        )
                                    }
                                >

                                    <X
                                        size={14}
                                    />

                                </button>

                            </span>

                        )
                    )}

                </div>

                <div className="flex gap-3">

                    <input
                        value={value}
                        onChange={(e) =>
                            setValue(
                                e.target
                                    .value
                            )
                        }
                        onKeyDown={
                            handleKeyDown
                        }
                        placeholder="Type a skill and press Enter"
                        className="
                            flex-1
                            border-none
                            outline-none
                            placeholder:text-slate-400
                        "
                    />

                    <button
                        type="button"
                        onClick={addSkill}
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-indigo-600
                            text-white
                            transition
                            hover:bg-indigo-700
                        "
                    >

                        <Plus
                            size={18}
                        />

                    </button>

                </div>

            </div>

            <p
                style={{
                    marginTop: "0.5rem",
                }}
                className="
                    text-xs
                    text-slate-500
                "
            >
                Press Enter or comma to add a skill.
            </p>

        </div>

    );

}

export default SkillsInput;