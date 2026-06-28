import Card from "../../common/Card";

function ApplicationPipeline({
  applied,
  shortlisted,
  interview,
  hired,
}) {
  const stages = [
    { label: "Applied", value: applied },
    { label: "Shortlisted", value: shortlisted },
    { label: "Interview", value: interview },
    { label: "Hired", value: hired },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold">
        Application Pipeline
      </h3>

      <p className="mt-1 text-slate-500">
        Track your hiring journey
      </p>

      <div className="relative mt-6">
        {/* Background Line */}
        <div
          className="
            absolute
            left-[12.5%]
            right-[12.5%]
            top-3
            h-1
            rounded-full
            bg-slate-200
          "
        />

        {/* Stages */}
        <div className="grid grid-cols-4">
          {stages.map((stage) => (
            <div
              key={stage.label}
              className="
                flex
                flex-col
                items-center
                text-center
              "
            >
              {/* Circle */}
              <div
                className={`
                  relative
                  z-10
                  h-6
                  w-6
                  rounded-full
                  border-4
                  border-white
                  ${
                    stage.value > 0
                      ? "bg-violet-600"
                      : "bg-slate-300"
                  }
                `}
              />

              {/* Label */}
              <p
                className="
                  mt-4
                  text-sm
                  font-medium
                  text-slate-600
                "
              >
                {stage.label}
              </p>

              {/* Value */}
              <p
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-slate-900
                "
              >
                {stage.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default ApplicationPipeline;