import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Payments from "./pages/Payments";
import LeaveRequest from "./pages/LeaveRequest";

function App() {

  return (
    <div className="App flex">
      <BrowserRouter>
        <Sidebar />
        <div className="pages">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/leave-request" element={<LeaveRequest />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
