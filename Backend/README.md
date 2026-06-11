# TalentBridge Backend

This is the backend API for my TalentBridge project. TalentBridge is an AI-powered campus recruitment platform where students can upload resumes, get feedback, apply for jobs, and recruiters can manage candidates.

## Phase 1 Day 1 Notes

### What I Learned

Today I understood the basic idea of the backend. Node.js lets me run JavaScript outside the browser, and Express helps me create API routes. I also learned that an API route is just a URL that the frontend can call, like `/api/health`.

I used `dotenv` for environment variables, `cors` so the frontend can connect to the backend later, and `morgan` to see API request logs in the terminal. I also learned that `nodemon` is useful because it restarts the server automatically when I change code.

### What I Built

I created the `Backend` project, set up the Express server, and added my first route: `/api/health`. This route is used to check if the backend is running properly.

I also used ES modules, so I am writing `import` and `export` instead of `require`.

### Test Result

- `npm run dev` starts the server successfully.
- `GET http://localhost:5000/api/health` returns:

```json
{
  "success": true,
  "message": "TalentBridge API is running"
}
```

## Phase 1 Day 2 Notes

### What I Need To Learn Today

Today I am learning how to organize an Express backend in a better way. Instead of writing all logic directly inside route files, I am separating the project into routes, controllers, and middleware.

The main idea:

- Routes decide the API path.
- Controllers contain the actual logic for the route.
- Middleware runs between the request and the response.
- Error middleware gives clean error responses when something goes wrong.

### Learning Resources

- Express routing: https://expressjs.com/en/guide/routing.html
- Express middleware: https://expressjs.com/en/guide/using-middleware.html
- Express error handling: https://expressjs.com/en/guide/error-handling.html
- MDN HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

### What I Built

I improved the backend structure by moving the health route logic into a controller. I also added separate middleware files for handling wrong routes and errors.

This makes the project cleaner because later, when I add auth, students, recruiters, jobs, resumes, and AI features, each feature can have its own route and controller instead of everything becoming messy in one file.

### What Changed In The Code

- Added `src/controllers/health.controller.js`
- Added `src/middleware/notFound.middleware.js`
- Added `src/middleware/error.middleware.js`
- Updated `src/routes/health.route.js` to use the health controller
- Updated `src/app.js` to use the new middleware

### My Understanding

The request flow now looks like this:

```txt
Request comes in
  -> app.js receives it
  -> matching route is found
  -> controller sends response
  -> if no route matches, notFound middleware runs
  -> if an error happens, errorHandler sends a clean JSON error
```

### My Testing Notes

I tested both the correct route and a wrong route today.

When I opened `/api/health`, the request first came into `app.js`, then it matched the health route, then the controller function ran and sent the success JSON response.

When I opened a wrong URL, no route matched in `app.js`, so the request went to the `notFound` middleware. That middleware created an error and passed it using `next(error)`. After that, the `errorHandler` middleware sent the final error JSON response.

Now I understand that middleware stands between the request and response. Some middleware continues the request using `next()`, some middleware passes errors using `next(error)`, and the final handler sends the response.

### Test Result

- Correct route worked: `/api/health`
- Wrong route also worked properly by returning a clean JSON error
- I understood the flow: `app.js -> route -> controller -> response`
- I also understood the error flow: `app.js -> notFound -> errorHandler -> error response`

## Current Folder Structure

```txt
Backend/
  src/
    controllers/
      health.controller.js
    middleware/
      error.middleware.js
      notFound.middleware.js
    routes/
      health.route.js
    generated/
      prisma/
    app.js
    server.js
  prisma/
    schema.prisma
    migrations/
  prisma.config.ts
  .env
  .env.example
  package.json
  README.md
```

## Phase 1 Day 3 Notes

### What I Learned

Today I learned how the backend connects with a real database.

Before this, my backend was only sending fixed JSON from routes. Now I connected the backend to a Neon PostgreSQL database using Prisma. This means later I can store real users, students, recruiters, resumes, jobs, and applications.

I understood that PostgreSQL stores data in tables, and Prisma helps my Node.js backend talk to those tables using JavaScript methods instead of writing raw SQL every time.

### What I Set Up

I created a free Neon PostgreSQL database and added the database connection string in `.env` as `DATABASE_URL`.

Then I installed Prisma:

```powershell
npm install prisma @prisma/client
```

I initialized Prisma:

```powershell
npx prisma init --datasource-provider postgresql --generator-provider prisma-client-js
```

This created:

```txt
prisma/schema.prisma
prisma.config.ts
.gitignore
```

In the newer Prisma setup, the database URL is read from `prisma.config.ts`:

```ts
datasource: {
  url: process.env["DATABASE_URL"],
}
```

### Database Models I Created

I created three main models for the first database structure:

- `User`
- `StudentProfile`
- `RecruiterProfile`

The `User` model stores common login data like name, email, password, and role.

The `StudentProfile` model is connected to a user when the user is a student.

The `RecruiterProfile` model is connected to a user when the user is a recruiter.

I also created a `Role` enum:

```prisma
enum Role {
  STUDENT
  RECRUITER
}
```

This makes sure a user can only have one of these valid roles.

### Commands I Used

I formatted the schema:

```powershell
npx prisma format
```

I created the migration and applied it to Neon:

```powershell
npx prisma migrate dev --name init
```

I opened Prisma Studio:

```powershell
npx prisma studio
```

After this, I could see the tables in both Prisma Studio and Neon.

### Prisma Client Setup

I generated Prisma Client:

```powershell
npx prisma generate
```

On my Windows terminal, `npx` was blocked by PowerShell script policy, so `npx.cmd` worked:

```powershell
npx.cmd prisma generate
```

Prisma generated the client inside:

```txt
src/generated/prisma
```

Then I created a reusable Prisma connection file:

```txt
src/config/prisma.js
```

Because this project is using Prisma 7, I learned that `new PrismaClient()` needs a PostgreSQL adapter. So I installed:

```powershell
npm.cmd install @prisma/adapter-pg pg
```

Then Prisma Client was configured with the PostgreSQL adapter.

### What I Tested

I tested the database connection by counting users, and it returned:

```txt
User count: 0
```

Then I created a temporary test user using Prisma. This also created a linked `StudentProfile`.

I saw the new row in Neon, so I understood this flow:

```txt
Node.js backend
  -> Prisma Client
  -> Neon PostgreSQL
  -> User table
  -> StudentProfile table
```

After that, I deleted the test user using Prisma. Because the relation uses `onDelete: Cascade`, the linked student profile was also deleted automatically.

### My Understanding

Now I understand these Prisma methods:

- `prisma.user.create()` creates a row.
- `prisma.user.findMany()` reads rows.
- `prisma.user.delete()` deletes a row.
- `include` returns related table data.
- `onDelete: Cascade` deletes related profile data when the user is deleted.

This is important because signup will use the same idea:

```txt
Student signup
  -> create user
  -> create student profile

Recruiter signup
  -> create user
  -> create recruiter profile
```

## Phase 1 Day 4 Notes

### What I Learned

Today I built the first real authentication APIs for the project.

I learned that signup is not just saving a user. The backend has to validate the input, check if the email already exists, hash the password, create the user, create the correct profile, and then send a safe response.

I also learned that login does not decrypt the password. Bcrypt compares the plain password entered by the user with the hashed password stored in the database.

### Utility Files I Added

Before writing auth code, I added three reusable utility files:

```txt
src/utils/asyncHandler.js
src/utils/ApiError.js
src/utils/ApiResponse.js
```

`asyncHandler` helps avoid writing try/catch in every async controller.

`ApiError` helps send consistent error responses.

`ApiResponse` helps send consistent success responses.

### Signup API

I created:

```txt
POST /api/auth/signup
```

Signup receives:

```json
{
  "name": "Aman Student",
  "email": "amanstudent@example.com",
  "password": "123456",
  "role": "STUDENT"
}
```

The signup flow is:

```txt
request comes in
  -> read req.body
  -> check required fields
  -> check role is STUDENT or RECRUITER
  -> check if email already exists
  -> hash password using bcrypt
  -> create User
  -> create StudentProfile or RecruiterProfile based on role
  -> send success response without password
```

I understood this Prisma nested create logic:

```js
studentProfile: role === "STUDENT" ? { create: {} } : undefined,
recruiterProfile: role === "RECRUITER" ? { create: {} } : undefined,
```

If the role is `STUDENT`, Prisma creates the student profile and automatically fills `userId`.

If the role is `RECRUITER`, Prisma creates the recruiter profile and automatically fills `userId`.

### Login API

I created:

```txt
POST /api/auth/login
```

Login receives:

```json
{
  "email": "amanstudent@example.com",
  "password": "123456"
}
```

The login flow is:

```txt
request comes in
  -> read req.body
  -> check email and password are provided
  -> find user by email
  -> compare entered password with hashed password
  -> remove password from response
  -> send safe user data
```

### What I Tested

I tested signup and login in Postman.

Successful cases:

- Student signup worked.
- Recruiter signup worked.
- Login worked with correct email and password.
- User and profile rows were created in Neon.
- Password was stored as a hash, not plain text.

Error cases:

- Duplicate email returned an error.
- Missing fields returned an error.
- Wrong role returned an error.
- Wrong password returned an error.
- Unknown email returned an error.

### My Understanding

Now I understand that authentication needs careful validation and safe responses.

The backend should never send the password back to the user, even if it is hashed.

I also understood that the same `User` table can support both students and recruiters by using a `role` field and separate profile tables.

This is the base for the next step, where login will return a JWT token and protected routes will use that token to identify the logged-in user.

## Phase 1 Day 5 Notes

### What I Learned

Today I learned how JWT authentication works.

Before this, login only returned user data. The backend could verify email and password, but it did not give the user a token for accessing protected routes.

Now login returns a JWT token. This token proves that the user is logged in.

### What JWT Means

JWT means JSON Web Token.

In this project, the token stores small user information like:

```js
{
  id: "user_id",
  role: "STUDENT"
}
```

The token is signed using `JWT_SECRET` from `.env`.

This means the backend can verify if the token is valid or fake.

### Environment Variables I Added

I added these values in `.env`:

```env
JWT_SECRET=talentbridge_jwt_secret_for_learning_only
JWT_EXPIRES_IN=7d
```

I also added example values in `.env.example`:

```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### Files I Added

I added:

```txt
src/utils/jwt.js
src/middleware/auth.middleware.js
```

`jwt.js` creates and verifies JWT tokens.

`auth.middleware.js` contains:

- `protect`
- `allowRoles`

### Login With Token

I updated login so it now returns:

```txt
user data
JWT token
```

The login flow now is:

```txt
user sends email and password
  -> backend checks user
  -> backend compares password
  -> backend creates token
  -> backend returns user and token
```

### Protected Routes

I added protected routes:

```txt
GET /api/auth/me
GET /api/auth/student-test
GET /api/auth/recruiter-test
```

For protected routes, the request must send the token in the header:

```txt
Authorization: Bearer token_here
```

The `protect` middleware checks:

```txt
is token present?
is token valid?
does the user still exist in the database?
```

If everything is valid, it adds the logged-in user to:

```js
req.user
```

Then the next controller or middleware can use `req.user`.

### Role-Based Access

I also learned role-based access using `allowRoles`.

Example:

```js
allowRoles("STUDENT")
```

This means only a student can access that route.

If a recruiter tries to access a student route, the backend returns a 403 permission error.

### What I Tested

I tested these routes successfully:

- Login returns a token.
- `/api/auth/me` works with a valid token.
- `/api/auth/me` fails without a token.
- Student token works on student test route.
- Student token fails on recruiter test route.
- Recruiter token works on recruiter test route.
- Recruiter token fails on student test route.

### My Understanding

Now I understand this flow:

```txt
login
  -> token generated
  -> client sends token in Authorization header
  -> protect middleware verifies token
  -> req.user gets logged-in user data
  -> allowRoles checks user role
  -> route sends response
```

I also asked about cookies for storing tokens.

I understood that JWT is the token itself. The token can be sent in different ways:

- Authorization header
- HTTP-only cookie

For now, I am using the Authorization header because it makes the JWT flow clear while learning. Later, when I build the React frontend, I can also support HTTP-only cookies so the browser sends the token automatically.

## Phase 1 Day 6 Notes

### What I Learned

Today I learned how to organize backend routes in a cleaner way.

Before this, the student and recruiter test routes were inside `auth.route.js`. That was okay while learning JWT, but it is not the best structure for a real project.

Now I understand that each feature should have its own route file and controller file.

### Why I Changed The Route Structure

Auth routes should only handle authentication:

```txt
signup
login
current logged-in user
```

Student routes should handle student features.

Recruiter routes should handle recruiter features.

This makes the project easier to grow because TalentBridge will later have many modules like resumes, jobs, applications, interviews, and AI reports.

### Files I Added

I added:

```txt
src/controllers/student.controller.js
src/controllers/recruiter.controller.js
src/routes/student.route.js
src/routes/recruiter.route.js
```

I also updated:

```txt
src/routes/auth.route.js
src/app.js
```

### Final Route Structure

Auth routes:

```txt
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
```

Student routes:

```txt
GET /api/students/profile
```

Recruiter routes:

```txt
GET /api/recruiters/profile
```

### Request Flow

Student profile flow:

```txt
GET /api/students/profile
  -> app.js
  -> student.route.js
  -> protect middleware
  -> allowRoles("STUDENT")
  -> getStudentProfile controller
  -> response
```

Recruiter profile flow:

```txt
GET /api/recruiters/profile
  -> app.js
  -> recruiter.route.js
  -> protect middleware
  -> allowRoles("RECRUITER")
  -> getRecruiterProfile controller
  -> response
```

### What I Tested

I tested the new routes in Postman.

Successful cases:

- Student token worked on `/api/students/profile`.
- Recruiter token worked on `/api/recruiters/profile`.

Blocked cases:

- Student token was blocked from `/api/recruiters/profile`.
- Recruiter token was blocked from `/api/students/profile`.

This means role-based access is working correctly.

### My Understanding

Now I understand that `protect` checks if the user is logged in, and `allowRoles` checks if the logged-in user has permission for that route.

I also understand why feature-based route files are better. Later, when I add student profile editing, resume upload, recruiter job posting, and applicant management, each feature will have its own clean place in the backend.

## Phase 1 Day 7 Notes

### What I Learned

Today I learned that development is not only about adding new features. It is also important to test, clean, document, and push the work to GitHub.

This day helped me review the full Phase 1 backend foundation before moving to the next phase.

### GitHub Setup

I created a GitHub repository:

```txt
https://github.com/amandwivedi001/TalentBridge
```

Then I connected my local project to GitHub and pushed the first commit.

The first commit message was:

```txt
Initialize TalentBridge backend foundation
```

I also added a root `.gitignore` so important files are not pushed:

```txt
.env
node_modules/
Backend/src/generated/prisma/
```

### Final Testing

I tested all Phase 1 APIs again in Postman.

Routes tested:

```txt
GET /api/health
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
GET /api/students/profile
GET /api/recruiters/profile
GET /api/wrong
```

Error cases tested:

```txt
duplicate email
missing fields
wrong role
wrong password
unknown email
missing token
wrong role access
wrong route
```

### What Is Working Now

The backend foundation is working with:

```txt
Express server
clean routes
controllers
middleware
global error handling
Prisma
Neon PostgreSQL
signup
login
JWT authentication
protected routes
role-based access
GitHub repository
```

### My Understanding

Now I understand the full Phase 1 request flow.

For signup:

```txt
request
  -> auth route
  -> signup controller
  -> validation
  -> password hashing
  -> Prisma creates user and profile
  -> response
```

For login:

```txt
request
  -> auth route
  -> login controller
  -> bcrypt compares password
  -> JWT token generated
  -> response
```

For protected routes:

```txt
request with token
  -> protect middleware
  -> token verified
  -> user fetched from database
  -> role checked
  -> controller sends response
```

### Phase 1 Completion

Phase 1 is complete.

The project is now ready for Phase 2, where I will start building real student profile features and prepare the backend for resume upload later.

## Phase 2 Day 1 Notes

### What I Learned

Today I started Phase 2.

Phase 2 is about building real profile features and preparing the backend for resume upload later. Day 1 of Phase 2 focused only on student and recruiter profile foundation.

I learned how to update existing Prisma models, run new migrations, regenerate Prisma Client, and then use the new fields in backend APIs.

### Student Profile Schema Update

I updated the `StudentProfile` model and added these fields:

```txt
phone
college
degree
branch
graduationYear
skills
linkedinUrl
githubUrl
portfolioUrl
bio
```

Most fields are optional because a student may not complete the whole profile immediately.

For skills, I used:

```prisma
skills String[] @default([])
```

This lets the backend store skills as an array like:

```json
["JavaScript", "React", "Node.js", "PostgreSQL"]
```

### Student Profile APIs

I improved the student profile route.

Student routes now include:

```txt
GET /api/students/profile
PUT /api/students/profile
```

`GET /api/students/profile` fetches the logged-in student's full profile.

`PUT /api/students/profile` updates the logged-in student's profile.

Both routes are protected with:

```txt
protect
allowRoles("STUDENT")
```

### Prisma Client Lesson

After changing the schema and running migration, I got an error like:

```txt
Unknown argument `phone`
```

I learned that this happens when Prisma Client is still using the old generated model.

The fix was:

```powershell
npx.cmd prisma generate
```

Then I restarted the backend server and the update worked.

### Recruiter Profile Schema Update

I updated the `RecruiterProfile` model and added these fields:

```txt
companyName
companyWebsite
companyLocation
companyDescription
designation
```

These fields will be useful later when recruiters create jobs and students view company details.

### Recruiter Profile APIs

Recruiter routes now include:

```txt
GET /api/recruiters/profile
PUT /api/recruiters/profile
```

`GET /api/recruiters/profile` fetches the logged-in recruiter's full profile.

`PUT /api/recruiters/profile` updates the logged-in recruiter's company/profile details.

Both routes are protected with:

```txt
protect
allowRoles("RECRUITER")
```

### Neon Connection Lesson

While running Prisma commands, I got a database connection error:

```txt
P1001: Can't reach database server
```

I learned that Prisma CLI commands can sometimes work better with the direct Neon connection string, while the app can use the pooled connection string.

For now, I know this rule:

```txt
Direct connection: useful for Prisma migrations
Pooled connection: useful for normal app runtime
```

### What I Tested

Student tests:

```txt
student can fetch profile
student can update profile
recruiter cannot update student profile
request without token is blocked
student profile data is saved in Neon
```

Recruiter tests:

```txt
recruiter can fetch profile
recruiter can update profile
student cannot update recruiter profile
request without token is blocked
recruiter profile data is saved in Neon
```

### What Is Completed In Phase 2 Day 1

Completed today:

```txt
StudentProfile schema updated
student profile migration completed
student profile GET/PUT APIs completed
student profile tests completed
RecruiterProfile schema updated
recruiter profile migration completed
recruiter profile GET/PUT APIs completed
recruiter profile tests completed
```


## Phase 2 Day 2 Notes

### What I Learned

Today I learned how request validation works in a production backend.

Before today, the profile update APIs accepted any data sent by the client. This meant invalid values such as incorrect phone numbers, malformed URLs, invalid graduation years, or unexpected fields could reach the controller and database.

I learned that validation should happen before business logic. A request should first be authenticated, then authorized, then validated, and only after that should the controller update the database.

I also learned how schema-based validation makes APIs safer, easier to maintain, and more predictable.

### Why Validation Is Important

Without validation, a client could send data like:

```json
{
  "phone": "123",
  "graduationYear": "hello",
  "githubUrl": "not-a-url"
}
```

and the backend would have to deal with invalid values later.

With validation, the request is rejected immediately with a clear error message before reaching the controller.

The request flow now looks like:

```txt
Request
  -> protect middleware
  -> allowRoles middleware
  -> validation middleware
  -> controller
  -> database
```

### Zod Introduction

Today I learned Zod, a schema validation library for JavaScript and TypeScript.

Zod allows me to define the expected shape of request data and automatically validate incoming requests.

I used:

```js
schema.safeParse(req.body)
```

instead of manually checking every field.

I also learned:

```js
z.coerce.number()
```

which automatically converts values like:

```txt
"2027"
```

into:

```txt
2027
```

before validation.

### Validation Middleware

I created:

```txt
src/middleware/validate.middleware.js
```

This middleware receives a Zod schema and validates the request body.

If validation fails:

```txt
400 Bad Request
```

is returned with detailed field errors.

If validation succeeds:

```txt
req.validatedData
```

contains the cleaned and validated data.

This means controllers can trust the incoming data instead of validating again.

### Student Profile Validator

I created:

```txt
src/validators/student.validator.js
```

The student profile validator checks:

```txt
phone
college
degree
branch
graduationYear
skills
linkedinUrl
githubUrl
portfolioUrl
bio
```

Validation rules include:

* Valid Indian phone number format
* Graduation year range
* Valid URLs
* Maximum bio length
* Skills must be an array of non-empty strings
* Unknown fields are rejected

I also used:

```js
.strict()
```

to prevent unexpected properties from being accepted.

### Recruiter Profile Validator

I created:

```txt
src/validators/recruiter.validator.js
```

The recruiter profile validator checks:

```txt
companyName
companyWebsite
companyLocation
companyDescription
designation
```

Validation rules include:

* Valid company website URL
* Minimum and maximum lengths
* Trimming whitespace
* Rejecting unexpected fields

### Controller Improvement

I updated the controllers to use:

```js
req.validatedData
```

instead of:

```js
req.body
```

This ensures only validated data reaches the database.

I learned that validation middleware should be the single source of truth for request validation.

### Route Updates

I updated:

```txt
src/routes/student.route.js
src/routes/recruiter.route.js
```

The update routes now use validation middleware.

Student flow:

```txt
PUT /api/students/profile
  -> protect
  -> allowRoles("STUDENT")
  -> validate(studentProfileSchema)
  -> updateStudentProfile
```

Recruiter flow:

```txt
PUT /api/recruiters/profile
  -> protect
  -> allowRoles("RECRUITER")
  -> validate(recruiterProfileSchema)
  -> updateRecruiterProfile
```

### What I Tested

Student validation tests:

```txt
Valid profile update works
Invalid phone number is rejected
Invalid GitHub URL is rejected
Invalid LinkedIn URL is rejected
Invalid graduation year is rejected
Unknown fields are rejected
Missing token is rejected
Recruiter cannot access student routes
```

Recruiter validation tests:

```txt
Valid profile update works
Invalid company website is rejected
Invalid company name length is rejected
Unknown fields are rejected
Missing token is rejected
Student cannot access recruiter routes
```

### My Understanding

Today I understood that validation is different from business logic.

Validation answers:

```txt
Is the request data valid?
```

Controllers answer:

```txt
What should the application do with valid data?
```

By separating these responsibilities, the backend becomes easier to maintain, easier to test, and closer to production-level architecture.

### What Is Completed In Phase 2 Day 2

Completed today:

```txt
Zod installed
Validation middleware created
Student profile validator created
Recruiter profile validator created
Student profile route validation added
Recruiter profile route validation added
Controllers updated to use validated data
Validation tests completed
```

### What Comes Next

Next phase:

```txt
Resume Upload Foundation
Cloudinary integration
File upload validation
Resume model design
Resume upload API
```

This will prepare the platform for resume parsing and AI analysis in later phases.

## Phase 2 Day 3 Notes

### What I Learned

Today I started the Resume module foundation for TalentBridge.

Before implementing file uploads, I learned the importance of designing the database schema, API structure, and module architecture first. Instead of directly integrating file uploads, I focused on preparing the backend for future resume management features.

I learned that good backend development starts with designing relationships and responsibilities before writing feature-specific code.

---

### Resume Module Planning

The TalentBridge platform requires students to upload resumes that will later be used for:

```txt
Resume Upload
↓
Resume Parsing
↓
AI Resume Analysis
↓
Job Matching
↓
Recruiter Shortlisting
```

Because many future features depend on resumes, I first designed the Resume model and its relationship with StudentProfile.

---

### Resume Model Design

I created a new Prisma model:

```prisma
model Resume {
  id String @id @default(cuid())

  studentId String @unique

  fileName String

  fileUrl String

  publicId String

  uploadedAt DateTime @default(now())

  student StudentProfile @relation(
    fields: [studentId],
    references: [id],
    onDelete: Cascade
  )
}
```

### Why These Fields Exist

#### studentId

```txt
Links a resume to a specific student profile.
```

I used:

```prisma
@unique
```

because the MVP allows only one active resume per student.

---

#### fileName

Stores the original resume file name.

Example:

```txt
Aman_Dwivedi_Resume.pdf
```

---

#### fileUrl

Stores the cloud URL of the uploaded resume.

This will later be used to:

```txt
View Resume
Download Resume
Resume Analysis
```

---

#### publicId

Stores Cloudinary's unique file identifier.

This will allow future features such as:

```txt
Resume Replacement
Resume Deletion
```

without leaving unused files in cloud storage.

---

#### uploadedAt

Stores the exact upload timestamp.

This will help display:

```txt
Last Resume Update
```

inside the student dashboard.

---

### StudentProfile Relationship Update

I added:

```prisma
resume Resume?
```

inside the StudentProfile model.

This creates a one-to-one relationship:

```txt
StudentProfile
      ↕
     Resume
```

This means every student can have one active resume.

---

### Why I Chose One Resume Per Student

I considered storing multiple resume versions but decided against it for the MVP.

Reason:

```txt
TalentBridge is a recruitment platform,
not a resume management platform.
```

Recruiters only need the student's latest resume.

Keeping one active resume makes:

```txt
Database simpler
APIs simpler
UI simpler
Testing easier
```

while still supporting all required features.

---

### Prisma Migration

After updating the schema, I ran Prisma validation and migration commands.

I learned that Prisma schema errors are often caused by:

```txt
Incorrect relation syntax
Missing colons
Missing parentheses
Unsaved schema changes
```

I fixed relation syntax issues and successfully validated the schema.

The Resume table was successfully created in the Neon PostgreSQL database.

---

### Resume Module Structure

I created the Resume module foundation.

New files:

```txt
src/controllers/resume.controller.js
src/routes/resume.route.js
```

This follows the same modular architecture used across the project.

---

### Resume APIs

I created the initial routes:

```txt
GET /api/resumes/me
POST /api/resumes/upload
```

At this stage, the APIs return placeholder responses because the upload infrastructure has not been implemented yet.

---

### Route Protection

Both routes are protected using:

```txt
protect
allowRoles("STUDENT")
```

This ensures:

```txt
Only authenticated students can access resume endpoints.
Recruiters cannot upload resumes.
Unauthenticated users are blocked.
```

---

### What I Tested

Resume route tests:

```txt
Student can access GET /api/resumes/me
Student can access POST /api/resumes/upload
Recruiter is blocked from resume routes
Requests without token are rejected
Resume routes are registered correctly
```

---

### My Understanding

Today I learned that backend development should be done in layers.

Instead of immediately implementing file uploads, I first completed:

```txt
Database Design
↓
Module Design
↓
API Design
↓
Route Protection
↓
Testing
```

This approach makes future features easier to build and maintain.

---

### What Is Completed In Phase 2 Day 3

Completed today:

```txt
Resume Prisma model created
StudentProfile ↔ Resume relationship added
Resume database migration completed
Resume table created in Neon
Resume controller created
Resume routes created
Resume route protection added
Resume module registered
Resume endpoint testing completed
```

---

### What Comes Next

Next phase:

```txt
Phase 2 Day 4

Multer setup
Multipart form-data understanding
File upload validation
PDF-only upload restriction
Resume upload infrastructure
```

This will prepare the backend for Cloudinary integration and resume storage in later phases.

## Phase 2 Day 4 Notes

### What I Learned

Today I learned how file uploads work in a Node.js backend.

Until now, all APIs in TalentBridge accepted JSON data using:

```js
express.json()
```

Examples:

```json
{
  "name": "Aman",
  "email": "aman@gmail.com"
}
```

However, resume uploads are different because files cannot be sent as normal JSON requests.

I learned that file uploads use:

```txt
multipart/form-data
```

instead of:

```txt
application/json
```

This is why a dedicated file upload middleware is required.

---

### Introduction to Multer

Today I learned Multer, a middleware used for handling file uploads in Express applications.

Multer processes incoming files and makes them available inside:

```js
req.file
```

for single file uploads.

This allows the backend to access information such as:

```txt
File name
File size
File type
File buffer
```

before saving the file anywhere.

---

### Memory Storage vs Disk Storage

Multer provides multiple storage options.

I learned about:

```js
multer.memoryStorage()
```

and

```js
multer.diskStorage()
```

For TalentBridge, I chose:

```js
multer.memoryStorage()
```

because the uploaded resume will later be sent directly to Cloudinary.

Flow:

```txt
Student Uploads PDF
        ↓
Multer Memory Storage
        ↓
req.file.buffer
        ↓
Cloudinary
```

This avoids unnecessary disk writes and is a common approach in modern cloud-based applications.

---

### Upload Middleware

I created:

```txt
src/middleware/upload.middleware.js
```

This middleware handles:

```txt
Storage configuration
File type validation
File size validation
```

The middleware is reusable and can be used by future upload features.

---

### PDF Validation

TalentBridge only accepts resumes in PDF format.

I implemented file filtering using:

```js
file.mimetype
```

Allowed:

```txt
application/pdf
```

Rejected:

```txt
image/jpeg
image/png
application/msword
application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

This prevents unsupported files from reaching the application.

---

### File Size Validation

I added a maximum file size limit of:

```txt
5 MB
```

using:

```js
limits: {
  fileSize: 5 * 1024 * 1024
}
```

This helps:

```txt
Reduce abuse
Improve performance
Avoid unnecessary storage usage
```

while still supporting normal resume PDFs.

---

### Resume Upload Route Update

I updated:

```txt
POST /api/resumes/upload
```

and added Multer middleware.

Current request flow:

```txt
Request
↓
JWT Authentication
↓
Role Authorization
↓
Multer Upload Middleware
↓
Controller
↓
Response
```

Only authenticated students can upload resumes.

---

### Upload Controller Improvement

Inside the upload controller, I learned how to access:

```js
req.file
```

and extract useful metadata.

Current response includes:

```txt
File name
File size
MIME type
```

This confirms that the upload pipeline is working correctly before integrating cloud storage.

---

### Why Upload Infrastructure Was Built First

Instead of immediately uploading files to Cloudinary, I first completed the upload infrastructure.

This approach follows the principle of building systems in layers:

```txt
Database Design
↓
Module Design
↓
Upload Infrastructure
↓
Cloud Storage
↓
Resume Parsing
↓
AI Analysis
```

This makes debugging easier and reduces complexity.

---

### What I Tested

Upload tests:

```txt
Valid PDF upload succeeds
Invalid JPG upload is rejected
Invalid PNG upload is rejected
Invalid DOCX upload is rejected
Missing file upload is rejected
File size limit is enforced
req.file metadata is available
Student can access upload route
Recruiter is blocked from upload route
Unauthenticated requests are blocked
```

All tests passed successfully.

---

### My Understanding

Today I understood that file uploads are fundamentally different from normal API requests.

Key concepts learned:

```txt
multipart/form-data
Multer
memoryStorage
req.file
File validation
File size limits
Upload middleware
```

I also learned why upload infrastructure should be completed before integrating external storage services such as Cloudinary.

---

### What Is Completed In Phase 2 Day 4

Completed today:

```txt
Multer installed
Upload middleware created
Memory storage configured
PDF-only uploads implemented
File size validation implemented
Resume upload route updated
Resume upload controller updated
req.file handling implemented
Upload infrastructure testing completed
```

---

### What Comes Next

Next phase:

```txt
Phase 2 Day 5

Cloudinary account setup
Cloudinary SDK integration
Upload PDF to Cloudinary
Store Cloudinary URL
Store Resume record in PostgreSQL
Return uploaded resume details
```

This will complete the first version of the resume storage system and prepare the platform for resume parsing and AI analysis.

## Phase 2 Day 5 Notes

### What I Learned

Today I completed the first fully functional resume storage system in TalentBridge.

Before today, the backend could receive PDF files using Multer, but uploaded files were not stored permanently. If the server restarted, the uploaded file would be lost.

Today I learned how cloud storage works and how to integrate Cloudinary into a Node.js backend.

The complete resume upload flow now looks like:

```txt
Student Uploads Resume
        ↓
Multer
        ↓
Memory Buffer
        ↓
Cloudinary
        ↓
Resume URL Generated
        ↓
PostgreSQL Resume Record
        ↓
Success Response
```

This is the first complete end-to-end feature in the project.

---

### Why Cloudinary Is Needed

Multer only processes uploaded files.

Using:

```js
multer.memoryStorage()
```

stores files temporarily in memory.

This means:

```txt
Server Restart
      ↓
File Lost
```

To make resume uploads permanent, I integrated Cloudinary.

Cloudinary provides:

```txt
Cloud Storage
Public File URLs
File Management
File Deletion
```

which makes uploaded resumes accessible even after server restarts.

---

### Cloudinary Configuration

I created:

```txt
src/config/cloudinary.js
```

This file is responsible only for Cloudinary configuration.

Environment variables used:

```env
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

This keeps sensitive credentials outside the source code.

---

### Service Layer Introduction

Today I learned an important backend design principle:

```txt
Controllers should not directly communicate with third-party services.
```

Instead, I created:

```txt
src/services/cloudinary.service.js
```

This service layer handles:

```txt
Resume Upload
Resume Deletion
```

while controllers remain focused on business logic.

---

### Buffer to Cloudinary Upload

Because Multer uses:

```js
memoryStorage()
```

uploaded files are available as:

```js
req.file.buffer
```

Cloudinary upload APIs expect a file stream.

To solve this, I used:

```js
streamifier
```

Flow:

```txt
Buffer
  ↓
Stream
  ↓
Cloudinary Upload Stream
```

This allowed PDF files to be uploaded directly from memory without creating temporary files on disk.

---

### Cloudinary Upload Service

I created:

```txt
uploadResumeToCloudinary()
```

This function:

```txt
Receives file buffer
Uploads PDF to Cloudinary
Returns secure URL
Returns public ID
```

Important fields returned:

```txt
secure_url
public_id
```

These values are later stored in PostgreSQL.

---

### Cloudinary Delete Service

I also created:

```txt
deleteResumeFromCloudinary()
```

This function removes previously uploaded resumes from Cloudinary.

Reason:

```txt
Student uploads Resume V1
Student uploads Resume V2
```

Without deletion:

```txt
Resume V1 remains stored forever
```

which wastes storage.

Now the system automatically deletes the old resume before saving the new one.

---

### Resume Upload Logic

I completed the upload controller.

Current workflow:

```txt
Check uploaded file
      ↓
Get student profile
      ↓
Check existing resume
      ↓
Delete old Cloudinary file
      ↓
Upload new resume
      ↓
Create or update Resume record
      ↓
Return response
```

This ensures that each student always has one active resume.

---

### Prisma Upsert

Today I learned how to use:

```js
prisma.resume.upsert()
```

Instead of writing:

```txt
Find Resume
↓
If Exists → Update
Else → Create
```

I used:

```txt
Upsert
```

which automatically:

```txt
Creates record if it doesn't exist
Updates record if it already exists
```

This makes the code cleaner and easier to maintain.

---

### Foreign Key Debugging Lesson

Today I encountered an important database bug.

Error:

```txt
Foreign key constraint failed
```

At first, the Resume upload was failing even though the Cloudinary upload worked correctly.

After debugging, I learned the difference between:

```txt
User.id
```

and

```txt
StudentProfile.id
```

Example:

```txt
User.id
cmq0dfjmc0000ygyzj02500s6

StudentProfile.id
cmq0dfjs00001ygyzmqsxdamf
```

The Resume model references:

```txt
StudentProfile.id
```

not:

```txt
User.id
```

I was accidentally using the wrong identifier.

After switching to:

```js
req.user.studentProfile.id
```

the foreign key error was resolved.

This was an important lesson about database relationships and foreign keys.

---

### Resume Retrieval

I completed:

```txt
GET /api/resumes/me
```

This endpoint:

```txt
Finds the student's uploaded resume
Returns resume metadata
Returns Cloudinary URL
```

and throws an error if no resume exists.

---

### What I Tested

Resume upload tests:

```txt
First resume upload succeeds
Resume stored in Cloudinary
Resume record stored in PostgreSQL
Resume retrieval succeeds
Second upload updates existing record
Old Cloudinary file is deleted
Resume URL updates correctly
Recruiter cannot access resume routes
Requests without token are rejected
```

All tests passed successfully.

---

### My Understanding

Today I learned several important backend concepts:

```txt
Cloud Storage
Cloudinary Configuration
Service Layer Architecture
Buffer Uploads
Streamifier
Cloudinary Upload Streams
File Replacement
Prisma Upsert
Foreign Keys
Database Relationships
```

I also learned how to debug relationship errors by tracing foreign key references and understanding how different database IDs relate to each other.

---

### What Is Completed In Phase 2 Day 5

Completed today:

```txt
Cloudinary configured
Cloudinary service layer created
Resume upload to Cloudinary implemented
Resume deletion from Cloudinary implemented
Buffer-to-stream upload flow implemented
Resume persistence in PostgreSQL implemented
Resume upsert logic implemented
Resume retrieval endpoint completed
Foreign key issue debugged and fixed
Resume upload testing completed
```

---

### What Comes Next

Next phase:

```txt
Phase 2 Day 6

PDF Text Extraction
Resume Parsing
Extract Resume Content
Prepare Data For AI Analysis
```

This will allow TalentBridge to read resume content and prepare it for ATS scoring, skill analysis, and AI-powered candidate matching.

## Phase 2 Day 6 Notes

### What I Learned

Today I completed the resume text extraction pipeline for TalentBridge.

Until now, the platform could:

```txt
Student Upload Resume
        ↓
Cloudinary
        ↓
PostgreSQL
```

The resume file was stored successfully, but the system could not understand the content inside the PDF.

Today I learned how to extract raw text from PDF resumes so that the content can later be analyzed by AI.

The new flow is:

```txt
Resume PDF
      ↓
Cloudinary URL
      ↓
Download PDF
      ↓
Convert to Buffer
      ↓
PDF Parser
      ↓
Extract Text
```

This is the foundation for ATS scoring, skill analysis, candidate matching, and mock interview generation.

---

### Why PDF Text Extraction Is Required

AI models cannot directly understand a stored PDF file.

Before sending resume data to Gemini, the PDF must be converted into plain text.

Example:

```txt
resume.pdf
```

becomes:

```txt
AMAN DWIVEDI

Education
B.E Information Technology

Skills
React
Node.js
PostgreSQL

Projects
TalentBridge
Chat Application
```

This extracted text is what will later be analyzed by AI.

---

### PDF Parsing Library

I installed:

```bash
npm install pdf-parse
```

and learned how PDF parsing libraries convert binary PDF data into readable text.

The library reads:

```txt
PDF Buffer
```

and returns:

```txt
Extracted Resume Text
```

which can be processed further.

---

### PDF Service Layer

I created:

```txt
src/services/pdf.service.js
```

This service follows the single responsibility principle.

Its only responsibility is:

```txt
Buffer
 ↓
Text
```

It does not know anything about:

```txt
Cloudinary
Database
Authentication
Routes
```

This keeps the architecture modular and maintainable.

---

### PDF Parsing Logic

I implemented:

```js
extractTextFromPdf(buffer)
```

Workflow:

```txt
PDF Buffer
      ↓
PDF Parser
      ↓
Extract Text
      ↓
Return Text
```

The service validates that a buffer exists before processing the PDF.

---

### Understanding Buffers

Today I learned that uploaded files are represented as:

```txt
Buffer
```

inside Node.js.

A buffer is binary data stored in memory.

Flow:

```txt
Cloudinary PDF
      ↓
Fetch File
      ↓
ArrayBuffer
      ↓
Node Buffer
      ↓
PDF Parser
```

This allowed the resume file to be processed without saving it locally.

---

### Resume Extraction Endpoint

I created a temporary endpoint:

```txt
GET /api/resumes/extract
```

This endpoint performs the following steps:

```txt
Find Resume Record
      ↓
Get Cloudinary URL
      ↓
Download Resume PDF
      ↓
Convert PDF To Buffer
      ↓
Extract Text
      ↓
Return Extracted Text
```

This endpoint is used only for testing and validating the extraction pipeline.

---

### Fetch API in Node.js

I learned that Node.js v22 includes a built-in:

```js
fetch()
```

API.

This allowed me to download the PDF directly from Cloudinary without installing additional HTTP libraries.

Flow:

```txt
Cloudinary URL
      ↓
fetch()
      ↓
ArrayBuffer
      ↓
Buffer
```

This simplified the implementation.

---

### Service Architecture Lesson

By the end of today, the resume processing pipeline became:

```txt
Upload Middleware
      ↓
Cloudinary Service
      ↓
PDF Service
      ↓
Controller
```

Each layer has one responsibility:

```txt
Upload Middleware → File Handling
Cloudinary Service → Storage
PDF Service → Text Extraction
Controller → Business Logic
```

This separation makes the backend easier to maintain and extend.

---

### What I Tested

Resume extraction tests:

```txt
Resume record found successfully
PDF downloaded successfully from Cloudinary
ArrayBuffer conversion works
Buffer conversion works
PDF parser extracts text correctly
Extracted text returned successfully
Protected route works
Recruiter access blocked
Unauthenticated requests blocked
```

All tests passed successfully.

---

### My Understanding

Today I learned several important backend concepts:

```txt
PDF Parsing
Text Extraction
ArrayBuffer
Node Buffer
Fetch API
Service Layer Design
Resume Processing Pipeline
Binary File Processing
```

I also learned that before any AI integration can happen, data must first be transformed into a format that the AI can understand.

For resumes, that format is plain text.

---

### What Is Completed In Phase 2 Day 6

Completed today:

```txt
pdf-parse installed
PDF service created
Resume text extraction implemented
Cloudinary PDF download implemented
Buffer conversion implemented
Resume extraction endpoint created
Resume extraction testing completed
Resume text successfully returned
AI pipeline foundation completed
```

---

### Current Resume Processing Flow

Current architecture:

```txt
Student Upload Resume
        ↓
Multer
        ↓
Cloudinary
        ↓
PostgreSQL
        ↓
Resume Retrieval
        ↓
PDF Download
        ↓
Text Extraction
```

The platform can now understand the contents of uploaded resumes.

---

### What Comes Next

Next phase:

```txt
Phase 2 Day 7

Gemini Integration
Resume Analysis
ATS Score Generation
Skills Detection
Missing Skills Analysis
Strengths & Weaknesses Detection
Improvement Suggestions
```

This will be the first AI-powered feature of TalentBridge and the beginning of the complete resume analysis system.

## Phase 2 Day 7 Notes

### What I Learned

Today I started designing the AI analysis layer of TalentBridge.

Until now, the platform could:

```txt
Student Upload Resume
        ↓
Cloudinary
        ↓
PostgreSQL
        ↓
PDF Download
        ↓
Text Extraction
```

The resume content could be extracted successfully, but there was no system to store AI-generated insights.

Today I focused on designing the database architecture that will support ATS scoring, skill analysis, candidate matching, and resume improvement suggestions.

I learned that before integrating AI, it is important to design where the AI output will be stored.

---

### Why Resume Analysis Storage Is Needed

Without storing analysis results, every request would require:

```txt
Resume
 ↓
Text Extraction
 ↓
Gemini
 ↓
Analysis
```

This would:

```txt
Increase API latency
Consume Gemini quota
Generate repeated results
```

A better approach is:

```txt
Resume Upload
 ↓
Analysis Generated Once
 ↓
Store Analysis
 ↓
Read From Database
```

This is faster, cheaper, and more scalable.

---

### Resume Analysis Database Design

I created a new Prisma model:

```prisma
model ResumeAnalysis {
  id String @id @default(cuid())

  resumeId String @unique

  atsScore Int?
  summary String?

  skills String[] @default([])
  missingSkills String[] @default([])
  strengths String[] @default([])
  weaknesses String[] @default([])
  suggestions String[] @default([])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  resume Resume @relation(
    fields: [resumeId],
    references: [id],
    onDelete: Cascade
  )
}
```

---

### Relationship Design

I learned how to create a one-to-one relationship between:

```txt
Resume
    ↓
ResumeAnalysis
```

Structure:

```txt
One Resume
      ↓
One Analysis
```

This design was chosen because:

```txt
Student uploads new resume
       ↓
Old analysis becomes invalid
```

Therefore, storing multiple analysis versions would add unnecessary complexity to the MVP.

---

### Reverse Relation

I also updated the Resume model to include:

```prisma
analysis ResumeAnalysis?
```

This allows:

```txt
Resume
   ↔
ResumeAnalysis
```

and enables Prisma queries such as:

```js
include: {
  analysis: true
}
```

which will be useful later when building dashboards.

---

### Array Fields Design

I chose PostgreSQL string arrays for:

```txt
skills
missingSkills
strengths
weaknesses
suggestions
```

instead of storing comma-separated strings.

Example:

```json
[
  "React",
  "Node.js",
  "PostgreSQL"
]
```

This approach is:

```txt
Cleaner
More structured
Easier to query
Easier to render in frontend
```

I also added:

```prisma
@default([])
```

to avoid null array issues.

---

### ATS Score Design

I added:

```prisma
atsScore Int?
```

to store the AI-generated ATS score.

Expected values:

```txt
0 - 100
```

Examples:

```txt
72
85
93
```

This score will later be displayed in the student dashboard.

---

### Resume Summary Design

I added:

```prisma
summary String?
```

This will store a short AI-generated overview of the resume.

Example:

```txt
Strong frontend developer with React and Node.js experience,
good project portfolio, but lacks internship experience.
```

This summary will help recruiters and students quickly understand resume quality.

---

### Migration

Today I completed:

```txt
ResumeAnalysis schema design
Resume model update
Database relationship setup
Migration preparation
```

The database is now ready to store AI-generated resume insights.

---

### AI Architecture Planning

Before integrating Gemini, I planned the expected output structure.

Target analysis format:

```json
{
  "atsScore": 82,
  "summary": "Strong frontend profile with good projects",
  "skills": [
    "React",
    "Node.js",
    "JavaScript"
  ],
  "missingSkills": [
    "Docker",
    "Redis"
  ],
  "strengths": [
    "Good project portfolio"
  ],
  "weaknesses": [
    "No internship experience"
  ],
  "suggestions": [
    "Add DevOps project",
    "Learn Docker"
  ]
}
```

This structure will later be generated by Gemini and stored directly in PostgreSQL.

---

### Analysis Module Setup

To prepare for Gemini integration, I created the basic module structure:

```txt
src/controllers/analysis.controller.js
src/routes/analysis.route.js
src/services/gemini.service.js
```

At this stage, these files contain placeholder implementations and serve as the foundation for upcoming AI features.

---

### Architecture Lesson

Today I learned an important backend design principle:

```txt
Database Design First
Business Logic Second
AI Integration Third
```

Instead of directly calling Gemini, I first designed where the AI output will live.

This prevents major refactoring later and makes the system easier to scale.

---

### What Is Completed In Phase 2 Day 7

Completed today:

```txt
ResumeAnalysis model created
Resume ↔ ResumeAnalysis relationship designed
Array-based analysis fields added
ATS score storage designed
Resume summary storage designed
ResumeAnalysis migration prepared
Analysis module structure created
Analysis controller created
Analysis routes created
Gemini service file created
AI response schema designed
```

---

### Current TalentBridge Flow

Current backend architecture:

```txt
Student Login
      ↓
Profile Completion
      ↓
Resume Upload
      ↓
Cloudinary Storage
      ↓
Resume Retrieval
      ↓
PDF Download
      ↓
Text Extraction
      ↓
ResumeAnalysis Database Ready
```

The platform is now fully prepared for AI-powered resume analysis.

---

### What Comes Next

Next phase:

```txt
Phase 2 Day 8

Gemini API Integration
Prompt Engineering
Structured JSON Responses
Resume Analysis Generation
ResumeAnalysis Database Storage
```

This will be the first true AI-powered feature of TalentBridge and will generate ATS scores, skill analysis, strengths, weaknesses, and improvement suggestions automatically.

## Phase 2 Day 8 Notes

### What I Learned

Today I completed the first AI-powered feature of TalentBridge.

Until now, the platform could:

```txt
Resume Upload
      ↓
Cloudinary
      ↓
PDF Download
      ↓
Text Extraction
```

The system could understand resume content, but it could not analyze it.

Today I integrated Google's Gemini API and built a complete AI analysis pipeline that converts a resume into structured insights.

The new flow is:

```txt
Resume PDF
      ↓
Text Extraction
      ↓
Gemini AI
      ↓
Structured JSON Analysis
```

This is the first feature that transforms TalentBridge from a standard recruitment platform into an AI-powered recruitment platform.

---

### Gemini API Integration

I integrated Google's Gemini API using:

```bash
npm install @google/genai
```

and configured the application using:

```env
GEMINI_API_KEY
```

The Gemini API is responsible for understanding resume content and generating structured analysis results.

---

### Gemini Service Layer

I created:

```txt
src/services/gemini.service.js
```

This service is responsible for:

```txt
Resume Analysis
ATS Scoring
Skill Detection
Strength Analysis
Weakness Detection
Improvement Suggestions
```

The service follows the same architecture used throughout the project:

```txt
Controller
      ↓
Service Layer
      ↓
External Provider
```

This keeps business logic separate from third-party integrations.

---

### Prompt Engineering

Today I learned the importance of prompt engineering.

Instead of asking Gemini:

```txt
Analyze this resume
```

I created a structured prompt that clearly defines:

```txt
Expected Output
Field Types
Response Rules
Validation Constraints
```

This significantly improves response consistency.

---

### Structured JSON Responses

The biggest lesson today was learning how to force AI responses into a predictable structure.

Expected schema:

```json
{
  "atsScore": 82,
  "summary": "Strong frontend profile",
  "skills": ["React", "Node.js"],
  "missingSkills": ["Docker"],
  "strengths": ["Strong projects"],
  "weaknesses": ["No internship experience"],
  "suggestions": ["Learn Docker"]
}
```

This makes AI output directly usable by the backend and frontend.

---

### JSON Parsing and Validation

I implemented logic to:

```txt
Remove Markdown Wrappers
Clean Response Text
Parse JSON
Normalize Missing Fields
```

Gemini occasionally returns:

````txt
```json
{
  ...
}
````

````

before the JSON response.

I learned how to clean these wrappers before parsing.

This prevents runtime parsing errors.

---

### Response Normalization

After parsing Gemini output, I normalized the response.

Examples:

```txt
Missing Array
      ↓
Empty Array

Missing String
      ↓
Empty String

Invalid Score
      ↓
Default Value
````

This ensures that frontend components always receive predictable data.

---

### Retry Mechanism

While testing Gemini integration, I encountered:

```txt
429 Too Many Requests
503 Service Unavailable
```

These errors occurred because the Gemini free tier occasionally experiences high demand.

To improve reliability, I implemented automatic retry logic.

Workflow:

```txt
Request
   ↓
Failure
   ↓
Retry
   ↓
Failure
   ↓
Retry
   ↓
Success
```

---

### Exponential Backoff

I implemented exponential backoff using:

```js
Math.pow(2, attempt) * 1000
```

Retry delays:

```txt
Attempt 1 → 2 seconds
Attempt 2 → 4 seconds
Attempt 3 → 8 seconds
```

This prevents sending repeated requests too quickly and improves success rates.

---

### Retryable Error Handling

I learned that not every error should be retried.

Retryable errors:

```txt
429
500
502
503
504
```

Non-retryable errors:

```txt
400
401
403
```

This makes the retry mechanism smarter and more efficient.

---

### Analysis Controller

I created the analysis controller workflow:

```txt
Find Resume
      ↓
Download PDF
      ↓
Convert To Buffer
      ↓
Extract Resume Text
      ↓
Gemini Analysis
      ↓
Return Structured JSON
```

This endpoint now acts as the complete AI analysis pipeline.

---

### Analysis Test Endpoint

I implemented:

```txt
GET /api/analysis/test
```

Purpose:

```txt
Validate Gemini Integration
Validate Resume Analysis
Validate Structured JSON Output
```

This endpoint is currently used for development and testing.

---

### Successful End-to-End AI Flow

Today I achieved:

```txt
Student Resume
      ↓
Cloudinary
      ↓
PDF Extraction
      ↓
Gemini Analysis
      ↓
Structured JSON
      ↓
API Response
```

This is the first complete AI workflow in TalentBridge.

---

### What I Tested

Gemini integration tests:

```txt
Resume downloaded successfully
Resume text extracted successfully
Gemini API called successfully
JSON response returned successfully
JSON parsing completed successfully
Retry mechanism tested
Analysis endpoint tested
ATS score returned
Skills extracted correctly
Suggestions generated correctly
```

All tests passed successfully.

---

### My Understanding

Today I learned several important AI engineering concepts:

```txt
Prompt Engineering
Structured Outputs
JSON Response Design
Response Normalization
Retry Logic
Exponential Backoff
AI Service Architecture
LLM Integration
Error Recovery
```

I also learned that integrating AI into production systems requires much more than simply calling an API. Reliability, response formatting, validation, and error handling are equally important.

---

### What Is Completed In Phase 2 Day 8

Completed today:

```txt
Gemini SDK installed
Gemini service created
Resume analysis prompt created
Structured JSON output implemented
JSON parsing implemented
Response normalization implemented
Retry mechanism implemented
Exponential backoff implemented
Analysis controller implemented
Analysis test endpoint created
Resume analysis pipeline completed
End-to-end AI testing completed
```

---

### Current TalentBridge Architecture

Current workflow:

```txt
Student Login
      ↓
Resume Upload
      ↓
Cloudinary Storage
      ↓
PDF Download
      ↓
Text Extraction
      ↓
Gemini Analysis
      ↓
Structured JSON Response
```

The platform can now automatically analyze resumes using AI.

---

### What Comes Next

Next phase:

```txt
Phase 2 Day 9

Store Analysis In PostgreSQL
ResumeAnalysis Upsert
Analysis Persistence
GET Analysis Endpoint
Resume Analysis Backend Completion
```

This will allow AI-generated resume insights to be permanently stored and displayed without re-calling Gemini every time.

## Phase 2 Day 9 Notes

### What I Learned

Today I completed the persistence layer for AI-generated resume analysis.

Until yesterday, TalentBridge could:

```txt
Resume Upload
      ↓
Cloudinary
      ↓
PDF Extraction
      ↓
Gemini Analysis
      ↓
JSON Response
```

The analysis was generated successfully, but it was temporary.

Every time the endpoint was called:

```txt
Gemini
      ↓
Generate Analysis Again
```

This approach is expensive, slower, and not scalable.

Today I solved this problem by storing analysis results permanently in PostgreSQL.

The new architecture is:

```txt
Resume Upload
      ↓
Cloudinary
      ↓
PDF Extraction
      ↓
Gemini Analysis
      ↓
ResumeAnalysis Table
      ↓
Stored Permanently
```

---

### Why Analysis Persistence Is Important

Without persistence:

```txt
User Refreshes Page
      ↓
Gemini Called Again
```

Problems:

```txt
Higher API Usage
Slower Response Time
Repeated Analysis Cost
Poor Scalability
```

With persistence:

```txt
Generate Once
      ↓
Store In Database
      ↓
Reuse Multiple Times
```

Benefits:

```txt
Faster
Cheaper
More Scalable
Production Ready
```

---

### ResumeAnalysis Database Usage

Today I connected the existing ResumeAnalysis table with the AI analysis workflow.

The table stores:

```txt
ATS Score
Summary
Skills
Missing Skills
Strengths
Weaknesses
Suggestions
```

Each uploaded resume now has a corresponding AI analysis record.

---

### Upsert Operation

I learned how to use Prisma's:

```js
upsert()
```

operation.

Workflow:

```txt
Analysis Exists
      ↓
Update Record

Analysis Does Not Exist
      ↓
Create Record
```

This removes the need for separate:

```txt
find
create
update
```

queries.

It also guarantees:

```txt
One Resume
      ↓
One Analysis
```

which matches the project architecture.

---

### Generate Analysis Endpoint

I replaced the temporary testing endpoint with a production-oriented endpoint:

```txt
POST /api/analysis/generate
```

Workflow:

```txt
Find Resume
      ↓
Download Resume PDF
      ↓
Extract Resume Text
      ↓
Gemini Analysis
      ↓
Save Analysis
      ↓
Return Result
```

This endpoint is responsible for generating and storing AI analysis.

---

### Stored Analysis Endpoint

I implemented:

```txt
GET /api/analysis/me
```

Purpose:

```txt
Fetch Existing Analysis
```

Workflow:

```txt
Student
      ↓
Resume
      ↓
ResumeAnalysis Table
      ↓
Return Stored Data
```

Unlike the generate endpoint:

```txt
No Gemini Call
```

This makes the endpoint extremely fast.

---

### Separation Of Responsibilities

I learned an important architecture principle:

```txt
Generate Endpoint
      ↓
Creates Analysis

Fetch Endpoint
      ↓
Reads Analysis
```

Instead of mixing both responsibilities into a single API.

This keeps the backend easier to maintain.

---

### Database Relations

Today I worked with the relationship:

```txt
Resume
      ↓
ResumeAnalysis
```

Using:

```txt
resumeId
```

as the unique link between both tables.

This allows each resume to have exactly one analysis record.

---

### Performance Improvement

Before today's implementation:

```txt
Every Request
      ↓
Gemini Call
```

After today's implementation:

```txt
Generate Once
      ↓
Database Reads
```

Database reads are significantly faster than calling an external AI service.

This is closer to how real production systems operate.

---

### API Design Lesson

I learned that APIs should be designed around actions:

```txt
Generate Analysis
Fetch Analysis
```

instead of exposing internal implementation details.

This makes the API easier for frontend developers to consume.

---

### What I Tested

Generate endpoint tests:

```txt
Resume found successfully
PDF downloaded successfully
Text extracted successfully
Gemini analysis generated
Analysis saved successfully
Database record created
Response returned successfully
```

Fetch endpoint tests:

```txt
Analysis fetched successfully
No Gemini call required
Stored data returned correctly
Protected route works
Role-based access works
```

Database tests:

```txt
ResumeAnalysis row created
ATS score stored
Summary stored
Skills stored
Missing skills stored
Strengths stored
Weaknesses stored
Suggestions stored
```

All tests passed successfully.

---

### My Understanding

Today I learned several important backend concepts:

```txt
Prisma Upsert
Data Persistence
Database-First Architecture
AI Result Caching
One-to-One Relationships
Performance Optimization
API Responsibility Separation
Production-Oriented Design
```

I also learned that AI should generate data, but databases should store data.

Calling AI repeatedly for the same information is inefficient.

---

### What Is Completed In Phase 2 Day 9

Completed today:

```txt
ResumeAnalysis integration completed
Analysis persistence implemented
Prisma upsert implemented
POST /analysis/generate created
GET /analysis/me created
ResumeAnalysis table connected
Database storage tested
Analysis retrieval tested
Performance optimization completed
Resume analysis backend finalized
```

---

### Current TalentBridge Architecture

Current workflow:

```txt
Student Login
      ↓
Resume Upload
      ↓
Cloudinary Storage
      ↓
PDF Download
      ↓
Text Extraction
      ↓
Gemini Analysis
      ↓
ResumeAnalysis Table
      ↓
Stored Permanently
      ↓
Fetch Analysis Anytime
```

The complete backend pipeline for AI resume analysis is now operational.

---

### What Comes Next

Next phase:

```txt
Phase 2 Day 10

Resume Analysis Frontend
ATS Dashboard
Analysis Report UI
Skills Display
Strengths & Weaknesses Sections
Suggestions Display
```

This will transform the backend AI analysis into a visible feature that students can interact with directly.

## Phase 3 Day 1 Notes

### What I Learned

Today I started the Job Management module of TalentBridge.

Until now, the platform focused on student profiles, resume uploads, and AI-powered resume analysis. Recruiters could create profiles but had no way to publish job opportunities.

Today I built the foundation that allows recruiters to create and manage jobs on the platform.

This is an important milestone because job postings are the core of the recruitment workflow and will later be used for applications, AI candidate matching, and hiring decisions.

### Job Model Design

I created a new Prisma model:

```txt
Job
```

The Job model stores:

```txt
title
role
description
requiredSkills
location
salary
minCgpa
minTenthPercentage
minTwelfthPercentage
isActive
```

These fields represent the requirements and eligibility criteria that recruiters can define while creating job opportunities.

### Recruiter and Job Relationship

I added a one-to-many relationship between recruiters and jobs.

A recruiter can create multiple jobs.

Relationship:

```txt
Recruiter
    ↓
Multiple Jobs
```

I added:

```prisma
jobs Job[]
```

inside the RecruiterProfile model and connected it with the Job model using Prisma relations.

### Database Migration

After updating the Prisma schema, I generated a migration and updated the database.

Commands used:

```bash
npx prisma migrate dev --name add_job_model
npx prisma generate
```

The Job table was successfully created in Neon PostgreSQL.

### Job Validation

I created:

```txt
src/validators/job.validator.js
```

and added Zod validation for all important fields.

Validated fields:

```txt
title
role
description
requiredSkills
location
salary
minCgpa
minTenthPercentage
minTwelfthPercentage
```

This ensures that invalid job data is blocked before reaching the database.

### Create Job API

Implemented:

```http
POST /api/jobs
```

Purpose:

```txt
Create a new job posting
```

Only recruiters are allowed to access this endpoint.

Protection used:

```txt
protect
allowRoles("RECRUITER")
```

### Get Recruiter Jobs API

Implemented:

```http
GET /api/jobs/my-jobs
```

Purpose:

```txt
Fetch all jobs created by the logged-in recruiter
```

Jobs are returned in descending order of creation time so the latest jobs appear first.

### Get Job By ID API

Implemented:

```http
GET /api/jobs/:id
```

Purpose:

```txt
Fetch complete details of a specific job
```

The endpoint also returns recruiter information such as:

```txt
companyName
designation
companyLocation
```

This information will later be displayed to students while viewing jobs.

### What I Tested

Create Job API:

```txt
Recruiter can create job
Job data saved successfully
Validation works correctly
Student access blocked successfully
```

Get My Jobs API:

```txt
Recruiter can view all created jobs
Jobs returned correctly
Latest jobs appear first
```

Get Job By ID API:

```txt
Specific job fetched successfully
Recruiter details included
Invalid job handled correctly
```

Database Testing:

```txt
Job records created successfully
Recruiter relationship verified
Data visible in Neon PostgreSQL
```

### What Is Completed In Phase 3 Day 1

Completed today:

```txt
Job model created
Recruiter-Job relationship added
Database migration completed
Job table created in Neon
Job validation implemented
Create Job API completed
Get My Jobs API completed
Get Job By ID API completed
Role-based protection implemented
API testing completed
Database testing completed
```

### Current TalentBridge Workflow

Current platform flow:

```txt
Student
    ↓
Profile Completion
    ↓
Resume Upload
    ↓
AI Resume Analysis

Recruiter
    ↓
Profile Completion
    ↓
Create Job
    ↓
Manage Jobs
```

The recruiter side of the hiring workflow is now functional.

### Next Goal

Next step:

```txt
Student Job Discovery
```

Upcoming APIs:

```txt
GET /api/jobs
GET /api/jobs/:id
```

Students will be able to browse available job opportunities created by recruiters and view complete job details before applying.
