import { useEffect } from "react";
import { useLogout } from "../../hooks/useLogout";

function StudentDashboard() {

  const logout = useLogout();

  return (
    <div>
      Student Dashboard
      <button onClick={logout}>
        logout
      </button>
    </div>
  );
}

export default StudentDashboard;