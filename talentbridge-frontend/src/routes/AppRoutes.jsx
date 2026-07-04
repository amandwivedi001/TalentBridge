import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home/Home";

import Login from "../pages/auth/Login";

import RecruiterDashboard from "../pages/recruiter/Dashboard/RecruiterDashboard";

import StudentLayout from "../layouts/StudentLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import Register from "../pages/auth/register";
import StudentDashboard from "../pages/student/Dashboard/StudentDashboard";
import Jobs from "../pages/student/jobs/Jobs";
import JobDetails from "../pages/student/jobs/JobDetails";
import Resume from "../pages/student/resume/Resume";
import Interview from "../pages/student/interview/Interview";
import InterviewSession from "../pages/student/interview/InterviewSession";
import InterviewReport from "../pages/student/interview/InterviewReport";
import EditJob from "../pages/recruiter/jobs/EditJob";
import RecruiterJobDetails from "../pages/recruiter/jobs/RecruiterJobDetails";
import CreateJob from "../pages/recruiter/jobs/CreateJob";
import RecruiterJobs from "../pages/recruiter/jobs/RecruiterJobs";
import RecruiterApplications from "../pages/recruiter/application/RecruiterApplications";
import RecruiterCandidateDetails from "../pages/recruiter/candidate/RecruiterCandidateDetails";
import RecruiterNotifications from "../pages/recruiter/notification/RecruiterNotifications";
import StudentNotifications from "../pages/student/notification/StudentNotifications";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="STUDENT">
              <StudentLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="jobs"
          element={<Jobs />}
        />

        <Route
          path="jobs/:jobId"
          element={<JobDetails />}
        />

        <Route
          path="resume"
          element={<Resume />}
        />

        <Route
          path="interviews"
          element={<Interview />}
        />

        <Route
          path="interviews/session/:sessionId"
          element={<InterviewSession />}
        />

        <Route
          path="interviews/report/:sessionId"
          element={<InterviewReport />}
        />

        <Route
          path="notifications"
          element={<StudentNotifications />}
        />

      </Route>
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="RECRUITER">
              <RecruiterLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >

        <Route
          path="dashboard"
          element={<RecruiterDashboard />}
        />

        <Route
          path="jobs"
          element={<RecruiterJobs />}
        />

        <Route
          path="jobs/create"
          element={<CreateJob />}
        />

        <Route
          path="jobs/:jobId"
          element={<RecruiterJobDetails />}
        />

        <Route
          path="jobs/:jobId/edit"
          element={<EditJob />}
        />

        <Route
          path="applications"
          element={<RecruiterApplications />}
        />

        <Route
          path="candidates/:applicationId"
          element={
            <RecruiterCandidateDetails />
          }
        />

        <Route
          path="notifications"
          element={<RecruiterNotifications />}
        />

      </Route>
    </Routes>
  );
}

export default AppRoutes;