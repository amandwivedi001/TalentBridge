-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "branch" TEXT,
ADD COLUMN     "college" TEXT,
ADD COLUMN     "degree" TEXT,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "graduationYear" INTEGER,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "portfolioUrl" TEXT,
ADD COLUMN     "skills" TEXT[] DEFAULT ARRAY[]::TEXT[];
