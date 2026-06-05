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

## Run Locally

Install dependencies:

```powershell
npm install
```

Start development server:

```powershell
npm run dev
```

Health check:

```txt
http://localhost:5000/api/health
```

## Next Step

Phase 1 Day 6:

Phase 1 Day 7:

- Test all Phase 1 APIs again.
- Clean temporary files.
- Check README and environment examples.
- Prepare for Phase 2 student profile work.
