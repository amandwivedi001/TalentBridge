import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home/Home";

import Login from "../pages/auth/Login";

import StudentDashboard from "../pages/student/StudentDashboard";

import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";

import StudentLayout from "../layouts/StudentLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import Register from "../pages/auth/register";

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
            <RoleRoute
              allowedRole="STUDENT"
            >
              <StudentLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={
            <StudentDashboard />
          }
        />
      </Route>

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
    </Routes>
  );
}

export default AppRoutes;