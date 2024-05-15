import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, CircleUserRound, HandCoins, Mail, Calendar } from "lucide-react";
import { useLogout } from '../hooks/useLogout';


const SidebarItem = ({ icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li 
      className={`relative flex items-center py-2.5 px-3.5 my-1 font-medium rounded-md cursor-pointer transition-colors ${
        isActive
          ? "bg-gradient-to-tr from-green-100 to-green-100 text-green-800" 
          : "hover:bg-gray-200 hover:text-gray-900"
      }`}
    >
      <Link to={to} className="flex items-center">
        {icon}
        <span className="w-52 ml-3">{text}</span>
      </Link>
    </li>
  )
}

const Sidebar = () => {
  const { logout } = useLogout()
  const handleLogOut = () => {
    console.log("Button Clicked")
    logout()
  }

  return (
    <aside className="h-screen w-72">
      <nav className="sidebar h-full flex flex-col  border-r shadow-sm">
        <div className="p-8 mb-4 mt-4 flex items-center">
          <img src="https://ing.com.np/images/ing_logo-new.svg" className="w-20 mr-2" alt="Logo" />
          <span className="font-semibold">Innovate Nepal</span>
        </div>

        {/* Sidebar items */}
        <ul className="flex-1 px-4">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Dashboard" 
            to="/dashboard" 
          />
          <SidebarItem 
            icon={<Calendar size={20} />} 
            text="Attendance" 
            to="/attendance" 
          />
          <SidebarItem 
            icon={<CircleUserRound size={20} />} 
            text="Users" 
            to="/users" 
          />
          <SidebarItem 
            icon={<HandCoins size={20} />} 
            text="Payments" 
            to="/payments" 
          />
          <SidebarItem 
            icon={<Mail size={20} />} 
            text="Leave Request" 
            to="/leave-request" 
          />
        </ul>

        {/* Logout item */}
        <div className="border-t flex p-3" onClick={handleLogOut}>
          <SidebarItem icon={<LogOut size={20} />} text="Logout" />
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar;
