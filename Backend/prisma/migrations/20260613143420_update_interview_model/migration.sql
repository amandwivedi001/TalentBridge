/*
  Warnings:

  - You are about to drop the column `role` on the `InterviewSession` table. All the data in the column will be lost.
  - The `status` column on the `InterviewSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `interviewType` to the `InterviewSession` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `difficulty` on the `InterviewSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('RESUME_BASED', 'DSA', 'SKILL_BASED', 'HR');

-- AlterTable
ALTER TABLE "InterviewSession" DROP COLUMN "role",
ADD COLUMN     "interviewType" "InterviewType" NOT NULL,
ADD COLUMN     "skill" TEXT,
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "InterviewDifficulty" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "InterviewStatus" NOT NULL DEFAULT 'IN_PROGRESS';
