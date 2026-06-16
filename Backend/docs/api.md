# API Documentation

## Overview

The API powers the AI Placement Preparation Platform, enabling students to manage resumes, apply for jobs, practice interviews, and receive AI-driven insights, while recruiters can manage job postings, evaluate candidates, and monitor hiring pipelines.

**Base URL**

```http
/api
```

**Authentication**

Protected endpoints require a JWT access token.

```http
Authorization: Bearer <token>
```

---

# Response Format

## Success Response

All successful requests return an `ApiResponse` object.

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Success",
  "success": true
}
```

### Example

```json
{
  "statusCode": 200,
  "data": {
    "user": {},
    "token": "jwt_token"
  },
  "message": "Login successful",
  "success": true
}
```

---

## Error Response

All failed requests return an `ApiError` object.

```json
{
  "statusCode": 400,
  "data": null,
  "message": "Something went wrong",
  "success": false,
  "errors": []
}
```

### Example

```json
{
  "statusCode": 401,
  "data": null,
  "message": "Invalid email or password",
  "success": false,
  "errors": []
}
```

---

# Roles

| Role      | Description                        |
| --------- | ---------------------------------- |
| STUDENT   | Job seeker using the platform      |
| RECRUITER | Employer posting and managing jobs |

---

# Health Check

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| GET    | `/api/health` | Check API health status |

---

# Authentication

Base Path: `/api/auth`

### Public Endpoints

| Method | Endpoint           | Description                             |
| ------ | ------------------ | --------------------------------------- |
| POST   | `/api/auth/signup` | Register a new user                     |
| POST   | `/api/auth/login`  | Authenticate user and receive JWT token |

### Protected Endpoints

| Method | Endpoint       | Description                    |
| ------ | -------------- | ------------------------------ |
| GET    | `/api/auth/me` | Get authenticated user details |

---

# Student Profile

Base Path: `/api/student`

> Requires `STUDENT` role.

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | `/api/student/profile` | Get student profile    |
| PUT    | `/api/student/profile` | Update student profile |

---

# Recruiter Profile

Base Path: `/api/recruiter`

> Requires `RECRUITER` role.

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| GET    | `/api/recruiter/profile` | Get recruiter profile    |
| PUT    | `/api/recruiter/profile` | Update recruiter profile |

---

# Resume Management

Base Path: `/api/resumes`

> Requires `STUDENT` role.

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/resumes/me`      | Get uploaded resume |
| POST   | `/api/resumes/upload`  | Upload resume file  |
| GET    | `/api/resumes/extract` | Extract resume text |

### Resume Upload

```http
POST /api/resumes/upload
Content-Type: multipart/form-data
```

Form Field:

```text
resume
```

---

# Resume Analysis

Base Path: `/api/analysis`

> Requires `STUDENT` role.

| Method | Endpoint                 | Description                         |
| ------ | ------------------------ | ----------------------------------- |
| POST   | `/api/analysis/generate` | Generate AI-powered resume analysis |
| GET    | `/api/analysis/me`       | Get current user's analysis         |

---

# Job Management

Base Path: `/api/jobs`

## Recruiter Endpoints

> Requires `RECRUITER` role.

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| POST   | `/api/jobs`         | Create a job posting         |
| GET    | `/api/jobs/my-jobs` | Get recruiter's job postings |
| PATCH  | `/api/jobs/:jobId`  | Update job posting           |
| DELETE | `/api/jobs/:jobId`  | Delete job posting           |

## Shared Endpoints

> Accessible to authenticated users.

| Method | Endpoint        | Description     |
| ------ | --------------- | --------------- |
| GET    | `/api/jobs`     | Get all jobs    |
| GET    | `/api/jobs/:id` | Get job details |

---

# Applications

Base Path: `/api/applications`

## Student Endpoints

> Requires `STUDENT` role.

| Method | Endpoint                            | Description                |
| ------ | ----------------------------------- | -------------------------- |
| POST   | `/api/applications/:jobId`          | Apply to a job             |
| GET    | `/api/applications/my-applications` | Get student's applications |
| PATCH  | `/api/applications/:jobId/withdraw` | Withdraw application       |
| GET    | `/api/applications/stats`           | Get application statistics |

## Recruiter Endpoints

> Requires `RECRUITER` role.

| Method | Endpoint                                  | Description               |
| ------ | ----------------------------------------- | ------------------------- |
| GET    | `/api/applications/job/:jobId`            | Get applicants for a job  |
| GET    | `/api/applications/job/:jobId/pipeline`   | Get application pipeline  |
| PATCH  | `/api/applications/:applicationId/status` | Update application status |

---

# Candidate Matching

Base Path: `/api/matches`

> Requires `RECRUITER` role.

| Method | Endpoint                               | Description             |
| ------ | -------------------------------------- | ----------------------- |
| POST   | `/api/matches/generate/:applicationId` | Generate AI match score |
| GET    | `/api/matches/job/:jobId`              | Get ranked candidates   |

---

# Interview System

Base Path: `/api/interviews`

> Requires `STUDENT` role.

| Method | Endpoint                                       | Description              |
| ------ | ---------------------------------------------- | ------------------------ |
| POST   | `/api/interviews/start`                        | Start interview session  |
| POST   | `/api/interviews/questions/:questionId/answer` | Submit answer            |
| POST   | `/api/interviews/:sessionId/complete`          | Complete interview       |
| GET    | `/api/interviews/history`                      | Get interview history    |
| GET    | `/api/interviews/stats`                        | Get interview statistics |
| GET    | `/api/interviews/:sessionId`                   | Get interview details    |

---

# Dashboard

Base Path: `/api/dashboard`

## Student Dashboard

> Requires `STUDENT` role.

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| GET    | `/api/dashboard/student` | Get student dashboard data |

## Recruiter Dashboard

> Requires `RECRUITER` role.

| Method | Endpoint                   | Description                  |
| ------ | -------------------------- | ---------------------------- |
| GET    | `/api/dashboard/recruiter` | Get recruiter dashboard data |

---

# Notifications

Base Path: `/api/notifications`

| Method | Endpoint                      | Description                    |
| ------ | ----------------------------- | ------------------------------ |
| GET    | `/api/notifications`          | Get notifications              |
| PATCH  | `/api/notifications/read-all` | Mark all notifications as read |
| PATCH  | `/api/notifications/:id/read` | Mark notification as read      |

---

# Authorization Matrix

| Feature            | Student | Recruiter |
| ------------------ | ------- | --------- |
| View Profile       | ✅       | ✅         |
| Update Profile     | ✅       | ✅         |
| Upload Resume      | ✅       | ❌         |
| Resume Analysis    | ✅       | ❌         |
| Apply to Jobs      | ✅       | ❌         |
| Manage Jobs        | ❌       | ✅         |
| View Applicants    | ❌       | ✅         |
| Candidate Matching | ❌       | ✅         |
| Mock Interviews    | ✅       | ❌         |
| Dashboard Access   | ✅       | ✅         |
| Notifications      | ✅       | ✅         |

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Resource Not Found    |
| 409  | Conflict              |
| 422  | Validation Error      |
| 500  | Internal Server Error |

---

# Validation

Request validation is performed using schema validators. Invalid requests return a standardized `ApiError` response with validation details in the `errors` field.

---

# Notes

* All protected routes require a valid JWT token.
* Role-based authorization is enforced using middleware.
* Resume uploads use multipart/form-data.
* Notifications are user-specific.
* Recruiters can only manage their own jobs and hiring pipelines.
* Students can only access their own resumes, applications, interviews, and analytics.
