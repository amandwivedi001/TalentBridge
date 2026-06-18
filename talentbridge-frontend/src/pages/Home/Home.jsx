import { Navigate } from "react-router-dom";

function Home() {
  // temporary

  const isAuthenticated = false;
  const user = null;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user?.role === "STUDENT") {
    return (
      <Navigate
        to="/student/dashboard"
        replace
      />
    );
  }

  if (user?.role === "RECRUITER") {
    return (
      <Navigate
        to="/recruiter/dashboard"
        replace
      />
    );
  }

  return null;
}

export default Home;