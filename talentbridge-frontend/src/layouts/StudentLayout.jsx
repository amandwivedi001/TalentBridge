import {
  Outlet,
} from "react-router-dom";

function StudentLayout() {
  return (
    <div>
      Student Navbar

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;