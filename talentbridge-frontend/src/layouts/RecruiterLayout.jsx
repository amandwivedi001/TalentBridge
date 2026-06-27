import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function RecruiterLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div style={{ marginLeft: "288px" }} className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default RecruiterLayout;