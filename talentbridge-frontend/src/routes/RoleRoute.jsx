import { Navigate } from "react-router-dom";

const RoleRoute = ({
  children,
  role,
}) => {

  const userRole =
    "STUDENT";

  if (
    role !== userRole
  ) {
    return (
      <Navigate to="/" />
    );
  }

  return children;
};

export default RoleRoute;