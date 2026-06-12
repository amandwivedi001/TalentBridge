-- CreateTable
CREATE TABLE "CandidateMatch" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "matchScore" INTEGER NOT NULL,
    "matchedSkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "missingSkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reasoning" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateMatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateMatch_applicationId_key" ON "CandidateMatch"("applicationId");

-- AddForeignKey
ALTER TABLE "CandidateMatch" ADD CONSTRAINT "CandidateMatch_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
