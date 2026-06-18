import { Navigate } from "react-router-dom";

function RoleRoute({
  allowedRole,
  children,
}) {
  const user = null;

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