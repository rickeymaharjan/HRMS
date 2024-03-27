import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Payments from "./pages/Payments";
import LeaveRequest from "./pages/LeaveRequest";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  return (
    <div className="App flex">
      <BrowserRouter>
        <Content/>
      </BrowserRouter>
    </div>
  );
}

function Content() {
  const location = useLocation();
  const hideSidebarOnAuthPages = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideSidebarOnAuthPages && <Sidebar />}
      <div className="pages">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/leave-request" element={<LeaveRequest />} />
        </Routes>
      </div>
    </>
  );
}


export default App;
