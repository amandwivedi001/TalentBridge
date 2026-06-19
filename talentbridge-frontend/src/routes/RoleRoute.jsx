import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleRoute({
  allowedRole,
  children,
}) {
  const { user } = useSelector(
    (state) => state.auth
  );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    user.role !== allowedRole
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

export default RoleRoute;