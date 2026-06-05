export const checkHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "TalentBridge API is running",
  });
};
