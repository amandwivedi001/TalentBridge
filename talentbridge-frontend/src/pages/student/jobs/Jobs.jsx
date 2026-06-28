import {
  BriefcaseBusiness,
  Building2,
  Search,
  Sparkles,
} from "lucide-react";

import { useEffect, useState } from "react";
import { SearchX, SlidersHorizontal, MapPin, Code, IndianRupee } from "lucide-react";

import JobCard from "../../../components/student/jobs/JobCard";
import JobSearchBar from "../../../components/student/jobs/JobSearchBar";

import { getJobs } from "../../../services/job.sevice";
import { getMyApplications } from "../../../services/application.service";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const [jobsData, applicationsData] = await Promise.all([
        getJobs(),
        getMyApplications(),
      ]);

      setJobs(jobsData);
      const appliedIds = new Set(
        applicationsData.map((application) => application.jobId)
      );
      setAppliedJobIds(appliedIds);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const query = search.toLowerCase();

    return (
      job.title.toLowerCase().includes(query) ||
      job.role.toLowerCase().includes(query) ||
      job.recruiter.companyName.toLowerCase().includes(query) ||
      job.requiredSkills?.some((skill) =>
        skill.toLowerCase().includes(query)
      )
    );
  });

  const uniqueCompanies = new Set(jobs.map((job) => job.recruiter.companyName)).size;

  if (loading) {
    return (
      <div
        className="mx-auto max-w-7xl sm:px-6 lg:px-8"
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "32px",
          paddingBottom: "32px",
        }}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        <p className="text-sm font-medium text-slate-500">Loading opportunities...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-blue-50" />

        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="absolute bottom-0 right-48 h-40 w-40 rounded-full bg-blue-100/50 blur-2xl" />

        <div
          className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
          style={{ padding: "2.5rem" }}
        >

          {/* Left */}

          <div className="max-w-3xl">

            <div
              className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-indigo-100
                    bg-indigo-50
                    text-sm
                    font-medium
                    text-indigo-700
                "
              style={{ padding: "0.5rem 1rem" }}
            >
              <Sparkles size={16} />

              AI Career Portal
            </div>

            <h1
              className="
                    text-5xl
                    font-bold
                    tracking-tight
                    text-slate-900
                "
              style={{ marginTop: "1.5rem" }}
            >
              Find Your Next
              <span className="text-indigo-600">
                {" "}Opportunity
              </span>
            </h1>

            <p
              className="
                    max-w-2xl
                    text-lg
                    leading-8
                    text-slate-600
                "
              style={{ marginTop: "1.25rem" }}
            >
              Explore internships and full-time opportunities from
              verified recruiters. Find roles that match your skills,
              experience, and career aspirations.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{ marginTop: "2rem" }}
            >

              <button
                className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-2xl
                        bg-indigo-600
                        font-semibold
                        text-white
                        transition
                        hover:bg-indigo-700
                    "
                style={{ padding: "0.75rem 1.5rem" }}
              >
                <Search size={18} />

                Browse Jobs
              </button>

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div
              className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white/90
                    text-center
                    shadow-sm
                    backdrop-blur
                "
              style={{ padding: "1.5rem" }}
            >

              <BriefcaseBusiness
                className="mx-auto text-indigo-600"
                size={24}
              />

              <p
                className="text-4xl font-bold text-slate-900"
                style={{ marginTop: "0.75rem" }}
              >
                {jobs.length}
              </p>

              <p
                className="text-sm text-slate-500"
                style={{ marginTop: "0.25rem" }}
              >
                Open Jobs
              </p>

            </div>

            <div
              className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white/90
                    text-center
                    shadow-sm
                    backdrop-blur
                "
              style={{ padding: "1.5rem" }}
            >

              <Building2
                className="mx-auto text-indigo-600"
                size={24}
              />

              <p
                className="text-4xl font-bold text-slate-900"
                style={{ marginTop: "0.75rem" }}
              >
                {uniqueCompanies}
              </p>

              <p
                className="text-sm text-slate-500"
                style={{ marginTop: "0.25rem" }}
              >
                Companies
              </p>

            </div>

            <div
              className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white/90
                    text-center
                    shadow-sm
                    backdrop-blur
                "
              style={{ padding: "1.5rem" }}
            >

              <Sparkles
                className="mx-auto text-indigo-600"
                size={24}
              />

              <p
                className="text-4xl font-bold text-slate-900"
                style={{ marginTop: "0.75rem" }}
              >
                AI
              </p>

              <p
                className="text-sm text-slate-500"
                style={{ marginTop: "0.25rem" }}
              >
                Smart Matching
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* 2. Unified Search & Filter Command Bar */}
      <div
        className="flex flex-wrap items-center"
        style={{
          gap: "8px",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
      >
        <div className="flex-1 w-full">
          <JobSearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 px-2">
          <div
            className="hidden h-8 w-px bg-slate-200 md:block"
            style={{ marginRight: "8px" }}
          />

          <button
            className="flex items-center rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            style={{
              gap: "8px",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
          >
            <MapPin size={16} className="text-slate-400" /> Location
          </button>
          <button
            className="flex items-center rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            style={{
              gap: "8px",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
          >  <Code size={16} className="text-slate-400" /> Skills
          </button>
          <button
            className="flex items-center rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            style={{
              gap: "8px",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
          >  <IndianRupee size={16} className="text-slate-400" /> Salary
          </button>

          <button
            className="flex items-center rounded-lg bg-slate-800 text-sm font-medium text-white transition-colors hover:bg-slate-900"
            style={{
              gap: "8px",
              marginLeft: "auto",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
          > <SlidersHorizontal size={16} /> Filters
          </button>
        </div>
      </div>

      {/* 3. Results Header */}
      <div
        className="flex items-center justify-between"
        style={{ paddingTop: "8px" }}
      > <h2 className="text-lg font-bold text-slate-900">
          Available Jobs <span
            className="text-slate-400 font-medium text-sm"
            style={{ marginLeft: "8px" }}
          >({filteredJobs.length} results)</span>
        </h2>
      </div>

      {/* 4. Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          style={{ gap: "24px" }}
        > {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isApplied={appliedJobIds.has(job.id)}
            setIsApplied={() => {
              setAppliedJobIds((prev) => {
                const updated = new Set(prev);
                updated.add(job.id);
                return updated;
              });
            }}
          />
        ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center"
          style={{
            paddingTop: "96px",
            paddingBottom: "96px",
          }}
        > <div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm"
          style={{ marginBottom: "16px" }}
        >         <SearchX size={32} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No matching jobs found</h3>
          <p
            className="text-sm text-slate-500 max-w-sm"
            style={{ marginTop: "8px" }}
          >  We couldn't find any opportunities matching "{search}". Try adjusting your search or filters.
          </p>
          <button
            onClick={() => setSearch("")}
            className="rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            style={{
              marginTop: "24px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

export default Jobs;