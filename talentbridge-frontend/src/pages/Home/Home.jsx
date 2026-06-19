import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const {
    user,
    isAuthenticated,
    loading,
    authInitialized,
  } = useSelector(
    (state) => state.auth
  );

  if (!authInitialized) {
  return (
    <div>
      Loading...
    </div>
  );
}

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    user.role === "STUDENT"
  ) {
    return (
      <Navigate
        to="/student/dashboard"
        replace
      />
    );
  }

  if (
    user.role === "RECRUITER"
  ) {
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