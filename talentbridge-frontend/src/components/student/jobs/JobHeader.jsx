import {
  MapPin,
  IndianRupee,
  Briefcase,
  Calendar,
  Link,
} from "lucide-react";

import SectionCard from "./SectionCard";

function JobHeader({ job }) {

    const postedDate = new Date(job.createdAt).toLocaleDateString(
  "en-US",
  {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
);
  return (
    <SectionCard>
        <div
  className="flex items-center text-sm text-slate-500"
  style={{
    marginBottom: "16px",
    gap: "8px",
  }}
>
  <Link
    to="/student/jobs"
    className="hover:text-blue-600"
  >
    Jobs
  </Link>

  <span>/</span>

  <span className="text-slate-900">
    {job.title}
  </span>
</div>
      <div
        className="flex items-start"
        style={{
          gap: "16px",
        }}
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-slate-800
            to-slate-900
            text-xl
            font-bold
            text-white
          "
        >
          {job.recruiter.companyName?.charAt(0)}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">
            {job.title}
          </h1>

          <p
            className="text-base font-medium text-slate-500"
            style={{
              marginTop: "6px",
            }}
          >
            {job.recruiter.companyName}
          </p>

          <div
            className="flex flex-wrap text-sm font-medium text-slate-600"
            style={{
              marginTop: "20px",
              gap: "16px",
            }}
          >
            <div
              className="flex items-center"
              style={{ gap: "6px" }}
            >
              <MapPin size={16} />
              {job.location}
            </div>

            <div
              className="flex items-center"
              style={{ gap: "6px" }}
            >
              <IndianRupee size={16} />
              {job.salary}
            </div>

            <div
              className="flex items-center"
              style={{ gap: "6px" }}
            >
              <Briefcase size={16} />
              {job.role}
            </div>

            <div
              className="flex items-center"
              style={{ gap: "6px" }}
            >
              <Calendar size={16} />
              {postedDate}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default JobHeader;