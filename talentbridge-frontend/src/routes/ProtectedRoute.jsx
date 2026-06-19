import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({
  children,
}) {
  const {
    isAuthenticated,
    authInitialized,
  } = useSelector(
    (state) => state.auth
  );

  if (!authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  return children;
}

export default ProtectedRoute;