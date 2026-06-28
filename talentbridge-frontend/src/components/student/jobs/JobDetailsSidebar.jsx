import {
    MapPin,
    IndianRupee,
    Briefcase,
    CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { handleApply } from "../../../utils/useApplyJob";

function JobDetailsSidebar({ job, isApplied, setIsApplied}) {

    const [applying, setApplying] = useState(false);

    return (
        <div
            className="
        sticky
        top-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        h-fit
      "
            style={{
                padding: "24px",
            }}
        >
            <h3 className="text-lg font-bold text-slate-900">
                Quick Overview
            </h3>

            <div
                className="flex flex-col"
                style={{
                    marginTop: "20px",
                    gap: "18px",
                }}
            >
                <div
                    className="flex items-center"
                    style={{ gap: "10px" }}
                >
                    <IndianRupee size={18} />
                    <span className="text-slate-700">
                        {job.salary}
                    </span>
                </div>

                <div
                    className="flex items-center"
                    style={{ gap: "10px" }}
                >
                    <MapPin size={18} />
                    <span className="text-slate-700">
                        {job.location}
                    </span>
                </div>

                <div
                    className="flex items-center"
                    style={{ gap: "10px" }}
                >
                    <Briefcase size={18} />
                    <span className="text-slate-700">
                        {job.role}
                    </span>
                </div>
            </div>

            {applying ? (
                <button
                    disabled
                    className="
      w-full
      rounded-xl
      bg-gray-100
      text-gray-500
      font-semibold
      cursor-not-allowed
    "
                    style={{
                        marginTop: "24px",
                        height: "48px",
                    }}
                >
                    Applying...
                </button>
            ) : isApplied ? (
                <button
                    disabled
                    className="
      flex
      w-full
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
                        marginTop: "24px",
                        height: "48px",
                        gap: "8px",
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
      w-full
      rounded-xl
      bg-blue-600
      text-white
      font-semibold
      transition-colors
      hover:bg-blue-700
    "
                    style={{
                        marginTop: "24px",
                        height: "48px",
                    }}
                >
                    Apply Now
                </button>
            )}

            <p
                className="text-sm text-slate-500 text-center"
                style={{
                    marginTop: "12px",
                }}
            >
                Applications are reviewed directly by recruiters.
            </p>
        </div>
    );
}

export default JobDetailsSidebar;