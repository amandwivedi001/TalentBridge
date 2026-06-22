import { applyToJob } from "../services/application.service";
import toast from "react-hot-toast";

 export const handleApply = async ({
  jobId,
  setIsApplied,
  setApplying,
}) => {
  try {
    setApplying(true);

    await applyToJob(jobId);

    setIsApplied(true);

    toast.success("Applied successfully");
  } catch (error) {
    if (error.response?.status === 409) {
      setIsApplied(true);
      return;
    }

    toast.error(
      error.response?.data?.message ||
      "Failed to apply"
    );
  } finally {
    setApplying(false);
  }
};