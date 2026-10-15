import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen w-64 bg-blue-900 text-white
          transform transition-transform duration-300
          overflow-y-auto 

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Content */}
        <div className="p-8 flex flex-col h-full">
          {/* Close Button Mobile */}
          <div className="flex justify-between items-center lg:hidden mb-10">
            <h1 className="text-3xl font-bold">AMS Admin</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={30} />
            </button>
          </div>

          {/* Desktop Logo */}
          <h1 className="hidden lg:block text-4xl font-bold mb-12 leading-tight">
            AMS
            <br />
            Admin
          </h1>

          {/* Navigation */}
          <nav className="flex flex-col gap-5 text-lg">
            {/* Home */}
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-blue-800 px-4 py-3 rounded-xl transition"
            >
              Home
            </Link>

            {/* Dashboard */}
            <Link
              to="/admin"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-blue-800 px-4 py-3 rounded-xl transition"
            >
              Dashboard
            </Link>

            {/* Alumni Directory */}
            <Link
              to="/alumni-directory"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-blue-800 px-4 py-3 rounded-xl transition"
            >
              Alumni Directory
            </Link>

            {/* Send Email */}
            <Link
              to="/send-email"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-blue-800 px-4 py-3 rounded-xl transition"
            >
              Send Email
            </Link>
          </nav>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="mt-auto bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Navbar */}
        <div className="lg:hidden bg-white shadow px-4 py-4 flex items-center">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={30} />
          </button>
          <h1 className="ml-4 text-xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Page Content */}
        <div className="w-full p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;