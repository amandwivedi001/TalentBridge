export const checkEligibility = (
  analysis,
  job
) => {
  if (
    job.minCgpa &&
    (
      analysis.cgpa === null ||
      analysis.cgpa < job.minCgpa
    )
  ) {
    return {
      eligible: false,
      reason:
        "Minimum CGPA criteria not met",
    };
  }

  if (
    job.minTenthPercentage &&
    (
      analysis.tenthPercentage === null ||
      analysis.tenthPercentage <
        job.minTenthPercentage
    )
  ) {
    return {
      eligible: false,
      reason:
        "Minimum 10th percentage criteria not met",
    };
  }

  if (
    job.minTwelfthPercentage &&
    (
      analysis.twelfthPercentage === null ||
      analysis.twelfthPercentage <
        job.minTwelfthPercentage
    )
  ) {
    return {
      eligible: false,
      reason:
        "Minimum 12th percentage criteria not met",
    };
  }

  return {
    eligible: true,
    reason: "Eligible",
  };
};