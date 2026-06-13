/*
  Warnings:

  - You are about to drop the column `feedback` on the `InterviewSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InterviewSession" DROP COLUMN "feedback",
ADD COLUMN     "improvementAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "overallFeedback" TEXT,
ADD COLUMN     "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "weaknesses" TEXT[] DEFAULT ARRAY[]::TEXT[];
