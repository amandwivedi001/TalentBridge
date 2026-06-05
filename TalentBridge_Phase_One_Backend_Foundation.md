# TalentBridge Phase One: Backend Foundation and Auth

## Phase Goal

By the end of Phase One, you should have a working backend foundation for TalentBridge:

- Node.js + Express server
- Clean folder structure
- PostgreSQL database connection through Prisma
- User signup and login
- Student and recruiter roles
- Protected routes using JWT
- Basic API testing through Postman or Thunder Client

Time: 7 days  
Daily effort: 4-5 hours  
Main mindset: Build small, test daily, do not chase advanced features yet.

## What You Should Learn This Week

Focus only on these topics:

- How a backend server works
- REST API basics: GET, POST, PUT, DELETE
- Express routes and middleware
- PostgreSQL tables and relations
- Prisma schema and migrations
- Password hashing with bcrypt
- JWT login flow
- Role-based access control
- Environment variables

Avoid for now:

- Resume upload
- AI integration
- Frontend UI
- Deployment
- Docker
- Admin dashboard

## Recommended Free Tools

- VS Code
- Node.js LTS
- Git + GitHub
- Postman or Thunder Client
- Neon PostgreSQL free database
- Prisma Studio

## Best Phase One Folder Structure

```txt
TalentBridge/
  backend/
    prisma/
      schema.prisma
    src/
      config/
        env.js
      controllers/
        auth.controller.js
      middleware/
        auth.middleware.js
        error.middleware.js
      routes/
        auth.routes.js
        health.routes.js
      services/
        auth.service.js
      utils/
        jwt.js
        password.js
      app.js
      server.js
    .env
    .env.example
    package.json
```

## Day 1: Project Setup

Learn:
- What Node.js is
- What npm is
- What Express is
- Basic Git workflow

Build:
- Create `backend` folder
- Initialize npm project
- Install Express, dotenv, cors, morgan, nodemon
- Create basic server
- Add `/api/health` route

Done when:
- Running `npm run dev` starts the backend
- Opening `/api/health` returns a success response

Suggested response:

```json
{
  "success": true,
  "message": "TalentBridge API is running"
}
```

## Day 2: Express Structure

Learn:
- Routes
- Controllers
- Middleware
- Request and response objects

Build:
- Move Express setup into `app.js`
- Keep server startup in `server.js`
- Create separate route files
- Add global error middleware
- Add `404` handler

Done when:
- Health route still works
- Invalid routes return a clean JSON error
- Code is split into readable files

## Day 3: Database and Prisma

Learn:
- Tables
- Primary keys
- Unique fields
- Enums
- One-to-one relations
- Prisma schema

Build:
- Create free Neon PostgreSQL database
- Install Prisma
- Add `.env` with `DATABASE_URL`
- Create `User`, `StudentProfile`, and `RecruiterProfile` models
- Run first migration

Done when:
- Prisma migration succeeds
- Prisma Studio opens and shows your tables

## Day 4: Signup API

Learn:
- Password hashing
- API validation basics
- Why passwords must never be stored directly

Build:
- Install bcrypt
- Create signup route
- Accept name, email, password, role
- Hash password
- Create user in database
- Create student or recruiter profile based on role

Done when:
- Student signup works
- Recruiter signup works
- Duplicate email gives a clear error
- Password is stored as a hash

## Day 5: Login API

Learn:
- Authentication flow
- JWT basics
- Environment secrets

Build:
- Install jsonwebtoken
- Create login route
- Compare password using bcrypt
- Return JWT token and user data
- Add `JWT_SECRET` to `.env`

Done when:
- Correct email/password logs in
- Wrong password fails
- Response includes token, user id, role, name, email

## Day 6: Protected Routes and Roles

Learn:
- Middleware chaining
- Authorization vs authentication
- Role-based access control

Build:
- Create `protect` middleware
- Create `allowRoles` middleware
- Add test routes:
  - `/api/auth/me`
  - `/api/student/test`
  - `/api/recruiter/test`

Done when:
- No token means access denied
- Student can access student route
- Recruiter can access recruiter route
- Student cannot access recruiter route

## Day 7: Testing and Cleanup

Learn:
- How to test APIs properly
- How to document setup
- How to write useful commit messages

Build:
- Test all APIs in Postman or Thunder Client
- Add `.env.example`
- Add backend README
- Add clear scripts in `package.json`
- Commit Phase One work

Done when:
- Another person could read your README and run the backend
- Auth flow works from signup to protected route

## Phase One API Checklist

- `GET /api/health`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/student/test`
- `GET /api/recruiter/test`

## Phase One Database Models

Minimum schema:

```prisma
enum Role {
  STUDENT
  RECRUITER
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      Role
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  studentProfile   StudentProfile?
  recruiterProfile RecruiterProfile?
}

model StudentProfile {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model RecruiterProfile {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## What To Write In Your Notes

At the end of each day, write:

- What I learned
- What I built
- What error I faced
- How I fixed it
- What I will do tomorrow

These notes will help you later during interviews.

## Phase One Success Definition

Phase One is complete only when you can explain and demo this:

1. A user signs up as a student or recruiter.
2. The password is hashed.
3. The user logs in.
4. The backend returns a JWT.
5. The JWT allows access to protected routes.
6. Role middleware blocks the wrong role.

If you can demo this clearly, your foundation is strong enough for Phase Two.

