import {
  Outlet,
} from "react-router-dom";

function RecruiterLayout() {
  return (
    <div>
      Recruiter Navbar

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RecruiterLayout;