import {
  Briefcase,
  IndianRupee,
  MapPin,
  CheckCircle,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { handleApply } from "../../utils/useApplyJob";
import { useState } from "react";

export default function JobCard({ job, isApplied, setIsApplied }) {
  const [applying, setApplying] = useState(false);
  return (
    <div
      className="
        group
        relative
        flex
        flex-col
        justify-between
        rounded-2xl
        border
        border-slate-200/60
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]
      "
      style={{ padding: "24px" }}
    >
      <div>
        {/* Company & Title Header */}
        <div
          className="flex items-start"
          style={{ gap: "16px" }}
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-slate-800
              to-slate-900
              text-lg
              font-bold
              text-white
              shadow-sm
            "
          >
            {job.recruiter.companyName?.charAt(0)?.toUpperCase()}
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="line-clamp-1 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-slate-500">
              {job.recruiter.companyName}
            </p>
          </div>
        </div>

        {/* Job Meta Info */}
        <div
          className="flex flex-wrap text-sm font-medium text-slate-600"
          style={{
            marginTop: "20px",
            columnGap: "16px",
            rowGap: "8px",
          }}
        >
          <div
            className="flex items-center"
            style={{ gap: "6px" }}
          >
            <MapPin size={15} className="text-slate-400" />
            {job.location}
          </div>

          <div
            className="flex items-center"
            style={{ gap: "6px" }}
          >
            <IndianRupee size={15} className="text-slate-400" />
            {job.salary}
          </div>

          <div
            className="flex items-center"
            style={{ gap: "6px" }}
          >
            <Briefcase size={15} className="text-slate-400" />
            {job.role}
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginTop: "24px" }}>
          <div
            className="flex flex-wrap"
            style={{ gap: "8px" }}
          >
            {job.requiredSkills?.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="
                  rounded-lg
                  bg-slate-50
                  border
                  border-slate-100
                  text-xs
                  font-semibold
                  text-slate-600
                "
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                {skill}
              </span>
            ))}

            {job.requiredSkills?.length > 4 && (
              <span
                className="
                  rounded-lg
                  bg-slate-50
                  border
                  border-slate-100
                  text-xs
                  font-semibold
                  text-slate-500
                "
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                +{job.requiredSkills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Eligibility */}
        <div
          className="border-t border-slate-100"
          style={{
            marginTop: "24px",
            paddingTop: "20px",
          }}
        >
          <div
            className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-400"
            style={{
              marginBottom: "12px",
              gap: "8px",
            }}
          >
            <GraduationCap size={14} />
            Eligibility Criteria
          </div>

          <div
            className="grid grid-cols-3"
            style={{ gap: "8px" }}
          >
            <div
              className="rounded-lg bg-slate-50 text-center"
              style={{ padding: "8px" }}
            >
              <p className="text-[10px] font-semibold uppercase text-slate-500">
                CGPA
              </p>
              <p
                className="text-sm font-bold text-slate-900"
                style={{ marginTop: "2px" }}
              >
                ≥ {job.minCgpa}
              </p>
            </div>

            <div
              className="rounded-lg bg-slate-50 text-center"
              style={{ padding: "8px" }}
            >
              <p className="text-[10px] font-semibold uppercase text-slate-500">
                10th
              </p>
              <p
                className="text-sm font-bold text-slate-900"
                style={{ marginTop: "2px" }}
              >
                ≥ {job.minTenthPercentage}%
              </p>
            </div>

            <div
              className="rounded-lg bg-slate-50 text-center"
              style={{ padding: "8px" }}
            >
              <p className="text-[10px] font-semibold uppercase text-slate-500">
                12th
              </p>
              <p
                className="text-sm font-bold text-slate-900"
                style={{ marginTop: "2px" }}
              >
                ≥ {job.minTwelfthPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div
        className="flex"
        style={{
          marginTop: "24px",
          gap: "12px",
        }}
      >
        <Link
          to={`/student/jobs/${job.id}`}
          className="
            flex
            flex-1
            items-center
            justify-center
            rounded-xl
            bg-white
            border
            border-slate-200
            text-sm
            font-semibold
            text-slate-700
            transition-colors
            hover:bg-slate-50
            hover:text-slate-900
          "
          style={{
            gap: "4px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          Details
        </Link>

        {applying ? (
          <button
            disabled
            className="
      flex
      flex-1
      items-center
      justify-center
      rounded-xl
      bg-gray-100
      text-sm
      font-bold
      text-gray-500
      cursor-not-allowed
    "
            style={{
              gap: "4px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Applying...
          </button>
        ) : isApplied ? (
          <button
            disabled
            className="
      flex
      flex-1
      items-center
      justify-center
      rounded-xl
      bg-emerald-50
      text-sm
      font-bold
      text-emerald-600
      border
      border-emerald-100
      cursor-not-allowed
    "
            style={{
              gap: "8px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <CheckCircle size={16} />
            Applied
          </button>
        ) : (
          <button
            onClick={() =>
              handleApply({
                jobId: job.id,
                setIsApplied,
                setApplying,
              })
            }
            className="
      flex
      flex-1
      items-center
      justify-center
      rounded-xl
      bg-blue-600
      text-sm
      font-bold
      text-white
      transition-all
      hover:bg-blue-700
      hover:shadow-md
      hover:shadow-blue-600/20
    "
            style={{
              gap: "4px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Apply Now
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}