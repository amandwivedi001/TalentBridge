import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home/Home";

import Login from "../pages/auth/Login";

import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";

import StudentLayout from "../layouts/StudentLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import Register from "../pages/auth/register";
import StudentDashboard from "../pages/student/StudentDashboard";
import Jobs from "../pages/jobs/Jobs";
import JobDetails from "../pages/jobs/JobDetails";
import Resume from "../pages/resume/Resume";

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
        path="/recruiter"
        element={
          <ProtectedRoute>
            <RoleRoute
              allowedRole="RECRUITER"
            >
              <RecruiterLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={
            <RecruiterDashboard />
          }
        />
      </Route>

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
        </Route>
    </Routes>
  );
}

export default AppRoutes;