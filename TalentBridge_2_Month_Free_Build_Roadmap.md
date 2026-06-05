# TalentBridge 2-Month Free Build Roadmap

## Goal

Build a complete MVP of TalentBridge: an AI-powered campus recruitment platform where students upload resumes, get AI feedback, apply to jobs, and recruiters create jobs, view applicants, and receive AI-assisted candidate rankings.

Daily time: 4-5 hours  
Duration: 8 weeks / 56 days  
Budget: 0 money spent

## Free Stack

- Frontend: React + Vite + Tailwind CSS
- Server state: TanStack Query
- Backend: Node.js + Express
- Database: PostgreSQL on Neon free tier
- ORM: Prisma
- AI: Gemini API free tier
- File storage: Cloudinary free plan
- Deployment: Vercel free tier for frontend, Render free tier for backend
- Design: Figma free, Excalidraw free, Google Fonts, Lucide icons
- Testing: Postman/Insomnia free, Vitest, React Testing Library

## MVP Scope

Build first:
- Student signup/login
- Recruiter signup/login
- Role-based dashboard
- Student profile
- Resume upload
- Resume parsing and AI report
- Job creation by recruiter
- Job listing for students
- Job applications
- Recruiter applicant list
- AI candidate matching score
- Mock interview text flow
- Deployment and demo data

Skip until after MVP:
- Voice interviews
- Redis
- Real-time notifications
- Analytics dashboard
- Advanced semantic search
- Admin panel

## UI Direction

TalentBridge should feel like a serious hiring workspace, not a flashy landing page.

Use:
- Clean dashboards with left sidebar navigation
- White/light gray background
- One strong accent color, such as blue or teal
- Compact cards for jobs, resumes, scores, and applications
- Progress bars for ATS score and match score
- Tables for recruiter applicant management
- Empty states that tell users what action to take next
- Clear status labels: Applied, Shortlisted, Rejected, Interview

Main screens:
- Login/signup with role selection
- Student dashboard: resume score, applications, suggested jobs, mock interview entry
- Resume report page: ATS score, strengths, weaknesses, missing skills, improvement suggestions
- Jobs page: filters, job cards, apply button
- Recruiter dashboard: active jobs, applicants, top matches
- Job detail page: requirements, eligibility, applicant ranking
- Mock interview page: question, answer box, AI feedback, final report

## Daily Routine

Spend each day like this:
- 45 minutes learning
- 2.5-3 hours building
- 30 minutes testing/debugging
- 20 minutes writing notes or README updates
- 10 minutes committing progress to Git

## Week 1: Foundation, Git, Backend, Auth

Day 1: Set up GitHub repo, install Node.js, VS Code extensions, create frontend and backend folders.

Day 2: Learn HTTP, REST APIs, Express basics. Build `/health` route and basic Express server.

Day 3: Learn PostgreSQL basics: tables, rows, relations, primary keys, foreign keys. Create Neon database.

Day 4: Learn Prisma basics. Add Prisma schema for User, Student, Recruiter.

Day 5: Learn password hashing and JWT. Build signup/login APIs.

Day 6: Add role-based auth middleware for Student and Recruiter.

Day 7: Test all auth APIs with Postman. Write README setup instructions.

## Week 2: Frontend Foundation and Student Profile

Day 8: Learn React components, props, state, forms. Set up Vite React app.

Day 9: Install Tailwind CSS. Create layout, theme colors, typography, buttons, inputs.

Day 10: Build login/signup pages with role selection.

Day 11: Connect auth APIs from frontend. Store token safely enough for MVP.

Day 12: Build student dashboard shell with sidebar and top bar.

Day 13: Build student profile form and API integration.

Day 14: Polish loading states, error states, and mobile layout.

## Week 3: Recruiter, Company Profile, Jobs

Day 15: Add Recruiter and Company profile tables/fields in Prisma.

Day 16: Build recruiter dashboard shell.

Day 17: Learn database relations. Add Job model with recruiter relationship.

Day 18: Build create job API: title, role, location, salary optional, skills, eligibility, description.

Day 19: Build recruiter job creation UI.

Day 20: Build student jobs listing page with search/filter.

Day 21: Build job detail page and test recruiter/student role boundaries.

## Week 4: Resume Upload and AI Resume Analysis

Day 22: Learn file upload flow: multer, Cloudinary, file size/type validation.

Day 23: Build resume upload API and store resume metadata.

Day 24: Add Cloudinary upload integration.

Day 25: Learn PDF text extraction. Extract text from uploaded resume.

Day 26: Learn Gemini prompt basics. Create resume analysis prompt.

Day 27: Build AI resume report: ATS score, skills, gaps, projects, summary.

Day 28: Build resume report UI with score cards, sections, and suggestions.

## Week 5: Applications and Candidate Matching

Day 29: Add Application model: student, job, status, timestamps.

Day 30: Build apply-to-job API and prevent duplicate applications.

Day 31: Build student application tracking UI.

Day 32: Build recruiter applicant list for each job.

Day 33: Create matching prompt comparing job requirements with resume analysis.

Day 34: Store match score and explanation on application.

Day 35: Build recruiter ranking UI with score bars and explanation drawer/modal.

## Week 6: Mock Interview

Day 36: Add Interview and MockResult models.

Day 37: Build interview setup UI: role, difficulty, topic.

Day 38: Generate AI interview questions using Gemini.

Day 39: Build answer submission flow.

Day 40: Build AI answer evaluation: correctness, clarity, confidence, improvement.

Day 41: Build final interview report page.

Day 42: Add history page for past mock interviews.

## Week 7: Quality, Security, Deployment

Day 43: Add backend validation with Zod or express-validator.

Day 44: Improve error handling and API response format.

Day 45: Add pagination/search for jobs and applicants.

Day 46: Add seed data for demo students, recruiters, jobs.

Day 47: Deploy frontend to Vercel.

Day 48: Deploy backend to Render.

Day 49: Connect deployed frontend, backend, Neon, Cloudinary, and Gemini environment variables.

## Week 8: Polish, Portfolio, Interview Preparation

Day 50: UI polish: spacing, responsive design, empty states, status badges.

Day 51: Add landing/demo page or public home page with clear login paths.

Day 52: Add basic tests for auth, jobs, applications, and AI service wrappers.

Day 53: Improve README with architecture, setup, screenshots, and demo credentials.

Day 54: Record a 2-3 minute demo video.

Day 55: Prepare interview explanations: architecture, schema, AI flow, matching algorithm, security.

Day 56: Final bug bash, deploy check, GitHub cleanup, portfolio write-up.

## Learning Resources

Use official docs first:
- React: https://react.dev/learn
- Tailwind with Vite: https://tailwindcss.com/docs/installation/using-vite
- Express: https://expressjs.com
- Prisma: https://docs.prisma.io/docs/getting-started
- TanStack Query: https://tanstack.com/query/latest/docs/react/overview
- Gemini API: https://ai.google.dev/gemini-api/docs
- Cloudinary: https://cloudinary.com/documentation
- Neon: https://neon.com/docs
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs

Free practice:
- JavaScript: https://javascript.info
- SQL: https://sqlbolt.com
- Git: https://learngitbranching.js.org
- UI inspiration: https://mobbin.com, https://dribbble.com, https://www.figma.com/community

## AI Prompt Strategy

Create separate prompts for:
- Resume structure extraction
- ATS scoring
- Skill gap analysis
- Project quality feedback
- Job requirement extraction
- Candidate match scoring
- Interview question generation
- Interview answer evaluation

Always ask Gemini for JSON output so the UI can render clean sections.

## Database Tables

Recommended MVP tables:
- User
- StudentProfile
- RecruiterProfile
- Resume
- ResumeAnalysis
- Job
- Application
- CandidateMatch
- Interview
- MockResult

## Important Free-Tier Notes

- Render free backend can sleep after inactivity, so first request may be slow.
- Render free filesystem is temporary; store uploaded files in Cloudinary, not locally.
- Neon free limits are enough for an MVP, but monitor storage and compute.
- Gemini free tier is useful for development, but add rate-limit handling and avoid sending private real resumes during demos.
- Cloudinary free plan is fine for resume PDFs during development, but validate file size.

## Weekly Deliverables

Week 1: Auth backend works  
Week 2: Student login/profile UI works  
Week 3: Recruiter can create jobs, student can view jobs  
Week 4: Resume upload and AI report works  
Week 5: Applications and candidate ranking works  
Week 6: Mock interview works  
Week 7: App deployed  
Week 8: App polished and portfolio-ready

## Best Final Demo Flow

1. Student signs up and completes profile.
2. Student uploads resume.
3. AI generates ATS score and improvement report.
4. Recruiter creates a job.
5. Student applies.
6. Recruiter opens applicants and sees ranked candidates with explanations.
7. Student completes mock interview and views feedback.

