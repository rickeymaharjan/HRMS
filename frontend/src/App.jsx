import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Payments from "./pages/Payments";
import LeaveRequest from "./pages/LeaveRequest";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound"

import { useAuthContext } from "./hooks/useAuthContext"

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
  const { user } = useAuthContext();

  // Define an array of all defined routes
  const definedRoutes = ["/", "/dashboard", "/users", "/payments", "/leave-request", "/login", "/signup"];

  // Check if the current route is defined or not
  const hideSidebar = !definedRoutes.includes(location.pathname) || ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideSidebar && <Sidebar />}
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate to="/login" />}
          />
          <Route
            path="/payments"
            element={user ? <Payments /> : <Navigate to="/login" />}
          />
          <Route
            path="/leave-request"
            element={user ? <LeaveRequest /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/dashboard" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}



export default App;
