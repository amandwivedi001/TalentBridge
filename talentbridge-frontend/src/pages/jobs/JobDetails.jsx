import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJobById } from "../../services/job.sevice";
import { applyToJob, getMyApplications } from "../../services/application.service";

import JobHeader from "../../components/jobs/JobHeader";
import JobDescription from "../../components/jobs/JobDescription";
import JobSkills from "../../components/jobs/JobSkills";
import JobEligibility from "../../components/jobs/JobEligibiity";
import JobDetailsSidebar from "../../components/jobs/JobDetailsSidebar";
import CompanyInfo from "../../components/jobs/CompanyInfo";

function JobDetails() {
  const { jobId } = useParams();
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const [jobData, applicationsData] = await Promise.all([
          getJobById(jobId),
          getMyApplications()
        ]);

        setJob(jobData);
        const appliedIds = new Set(
          applicationsData.map((application) => application.jobId)
        );
        setAppliedJobIds(appliedIds);

        setIsApplied(
          appliedIds.has(jobId)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!job) {
    return <p>Job not found</p>;
  }

  return (
    <div
      className="
    mx-auto
    max-w-7xl
  "
      style={{
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "32px",
        paddingBottom: "32px",
      }}
    >
      <div
        className="grid lg:grid-cols-[2fr_1fr]"
        style={{
          gap: "32px",
        }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: "24px",
          }}
        >
          <JobHeader job={job} />
          <JobDescription description={job.description} />
          <JobSkills skills={job.requiredSkills} />
          <JobEligibility job={job} />
          <CompanyInfo recruiter={job.recruiter} />
        </div>

        <JobDetailsSidebar job={job} isApplied={isApplied} setIsApplied={setIsApplied} />
      </div>
    </div>
  );
}

export default JobDetails;