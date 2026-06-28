import Card from "../../common/Card";
import { BrainCircuit } from "lucide-react";

function InterviewHero() {
  return (
    <Card
      className="
        relative
        overflow-hidden
        border-0
        bg-gradient-to-r
        from-violet-600
        via-indigo-600
        to-blue-600
        text-white
        shadow-2xl
      "
    >
      <div
        className="
          absolute
          h-40
          w-40
          rounded-full
          bg-white/10
        "
        style={{
          right: "-2.5rem",
          top: "-2.5rem",
        }}
      />

      <div
        className="
          absolute
          h-24
          w-24
          rounded-full
          bg-white/5
        "
        style={{
          right: "5rem",
          bottom: 0,
        }}
      />

      <div className="relative z-10">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-white/20
            backdrop-blur
          "
          style={{
            marginBottom: "1rem",
          }}
        >
          <BrainCircuit size={28} />
        </div>

        <h1
          className="
            text-4xl
            font-bold
            md:text-5xl
          "
        >
          AI Mock Interview Lab
        </h1>

        <p
          className="
            max-w-2xl
            text-lg
            text-indigo-100
          "
          style={{
            marginTop: "1rem",
          }}
        >
          Practice AI-generated interviews,
          receive real-time feedback,
          improve confidence and track
          your performance over time.
        </p>
      </div>
    </Card>
  );
}

export default InterviewHero;