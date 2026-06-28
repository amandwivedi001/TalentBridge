import InterviewHero from "../../../components/student/interview/InterviewHero";
import InterviewStats from "../../../components/student/interview/InterviewStats";
import InterviewTypeCard from "../../../components/student/interview/InterviewTypeCard";
import HistorySection from "../../../components/student/interview/HistorySection";

function Interview() {
  const interviewTypes = [
    {
      title: "Resume Based",
      type: "RESUME_BASED",
      description: "Questions generated from your uploaded resume.",
    },
    {
      title: "DSA",
      type: "DSA",
      description: "Practice data structures and algorithms.",
    },
    {
      title: "Skill Based",
      type: "SKILL_BASED",
      description: "Interview focused on a specific technology.",
    },
    {
      title: "HR",
      type: "HR",
      description: "Behavioral and HR interview questions.",
    },
  ];

  return (
    <div
      className="
        max-w-7xl
        space-y-8
      "
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <InterviewHero />

      <InterviewStats />

      <div
        className="
          grid
          md:grid-cols-2
        "
        style={{
          gap: "1.5rem",
        }}
      >
        {interviewTypes.map((interview) => (
          <InterviewTypeCard
            key={interview.type}
            {...interview}
          />
        ))}
      </div>

      <HistorySection/>
    </div>
  );
}

export default Interview;