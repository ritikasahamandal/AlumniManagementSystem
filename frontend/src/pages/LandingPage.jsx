import { Link } from "react-router-dom";
import { useState } from "react";

function LandingPage() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.reload();
  };

  return (

    <div className="bg-white overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <h1 className="text-2xl sm:text-3xl font-bold text-red-800">

              AlumniMS

            </h1>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">

              <div className="flex items-center gap-6 text-gray-700 font-medium">

                <a href="#home" className="hover:text-blue-600">
                  Home
                </a>

                <a href="#features" className="hover:text-blue-600">
                  Features
                </a>

                <a href="#roles" className="hover:text-blue-600">
                  Roles
                </a>

                <a href="#contact" className="hover:text-blue-600">
                  Contact
                </a>

                {token && (

                  <Link
                    to="/alumni-directory"
                    className="hover:text-blue-600 font-semibold"
                  >
                    Alumni Directory
                  </Link>

                )}

              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-4">

                {!token ? (

                  <>
                    <Link
                      to="/login"
                      className="border border-blue-600 text-blue-600 px-5 py-2 rounded-xl hover:bg-blue-50 transition"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register/student"
                      className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                      Register
                    </Link>
                  </>

                ) : (

                  <>
                    <Link
                      to={
                        role === "admin"
                          ? "/admin"
                          : role === "student"
                            ? "/student"
                            : "/alumni"
                      }
                      className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                      My Profile
                    </Link>

                    {/* <button
                      onClick={logout}
                      className="border border-red-500 text-red-500 px-5 py-2 rounded-xl hover:bg-red-50 transition"
                    >
                      Logout
                    </button> */}
                  </>

                )}

              </div>

            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="lg:hidden text-3xl"
            >
              ☰
            </button>

          </div>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (

          <div className="lg:hidden bg-white border-t shadow-md">

            <div className="flex flex-col px-6 py-6 gap-5">

              <a href="#home">Home</a>
              <a href="#features">Features</a>
              <a href="#roles">Roles</a>
              <a href="#contact">Contact</a>

              {token && (

                <Link
                  to={
                    role === "admin"
                      ? "/admin"
                      : role === "student"
                        ? "/student"
                        : "/alumni"
                  }
                >
                  Alumni Directory
                </Link>

              )}

              {!token ? (

                <>
                  <Link
                    to="/login"
                    className="border border-blue-600 text-blue-600 px-5 py-3 rounded-xl text-center"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register/student"
                    className="bg-blue-600 text-white px-5 py-3 rounded-xl text-center"
                  >
                    Register
                  </Link>
                </>

              ) : (

                <>
                  <Link
                    to={
                      role === "admin"
                        ? "/admin"
                        : role === "student"
                          ? "/student"
                          : "/alumni"
                    }
                    className="bg-blue-600 text-white px-5 py-3 rounded-xl text-center"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="border border-red-500 text-red-500 px-5 py-3 rounded-xl"
                  >
                    Logout
                  </button>
                </>

              )}

            </div>

          </div>

        )}

      </nav>

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/tezu-home.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-24 py-32">

          <div className="max-w-4xl">

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight text-gray-950">

              Alumni

              <br />

              <span className="text-red-800">
                Management System
              </span>

            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-2xl text-gray-700 leading-relaxed max-w-2xl">

              A platform to manage Alumni data. Connects Alumni, 
              Administrator and Students through one platform.

            </p>

          </div>

        </div>

      </section>

      {/*  FEATURES  */}
      <section
        id="features"
        className="px-4 sm:px-8 lg:px-10 py-16 md:py-20 bg-white"
      >

        <div className="text-center mb-14">

          <p className="text-blue-600 font-semibold uppercase tracking-wide">
            Features
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">

            Everything you need in one place

          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">

            Powerful features to help students,
            alumni and administrators connect
            and manage effortlessly.

          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {[
            {
              icon: "👥",
              title: "Alumni Directory",
              text: "Explore and connect with alumni from different batches and industries.",
            },
            {
              icon: "🔐",
              title: "Secure Authentication",
              text: "Role-based secure login for students, alumni and administrators.",
            },
            {
              icon: "📧",
              title: "Email Communication",
              text: "Built-in email system for notifications and announcements.",
            },
            {
              icon: "🔍",
              title: "Search & Filter",
              text: "Quickly search alumni by company, department and more.",
            },
          ].map((card, index) => (

            <div
              key={index}
              className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition"
            >

              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-2xl">

                {card.icon}

              </div>

              <h3 className="text-xl font-bold mb-3">
                {card.title}
              </h3>

              <p className="text-gray-600">
                {card.text}
              </p>

            </div>

          ))}

        </div>

      </section>
      {/* ================= ROLES SECTION ================= */}
      <section
        id="roles"
        className="px-4 sm:px-8 lg:px-10 py-16 md:py-20 bg-gray-50"
      >

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="text-blue-600 font-semibold uppercase tracking-wide">
            For Everyone
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">

            Designed for all roles

          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">

            A platform tailored to meet the needs
            of students, alumni and administrators.

          </p>

        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Admin */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl md:text-5xl mb-6">

              👨‍💼

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Admin
            </h3>

            <p className="text-gray-600 mb-6">

              Manage users, alumni profiles,
              emails and the overall system
              efficiently.

            </p>

            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Admin Login →
            </Link>

          </div>

          {/* Student */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100 flex items-center justify-center text-4xl md:text-5xl mb-6">

              🎓

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Student
            </h3>

            <p className="text-gray-600 mb-6">

              Search alumni, explore profiles
              and build valuable professional
              connections.

            </p>

            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Student Login →
            </Link>

          </div>

          {/* Alumni */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition">

            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-100 flex items-center justify-center text-4xl md:text-5xl mb-6">

              🧑‍🎓

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Alumni
            </h3>

            <p className="text-gray-600 mb-6">

              Connect with students,
              explore alumni network
              and grow together.

            </p>

            <Link
              to="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Alumni Login →
            </Link>

          </div>

        </div>

      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="bg-blue-700 text-white px-4 sm:px-8 lg:px-10 py-14 md:py-16">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

          {/* Stat 1 */}
          <div>

            <div className="text-4xl md:text-5xl mb-4">
              👥
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              1000+
            </h2>

            <p className="text-blue-100 text-sm md:text-base">
              Alumni Connected
              (demo data for now)
            </p>

          </div>

          {/* Stat 2 */}
          <div>

            <div className="text-4xl md:text-5xl mb-4">
              🏛️
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Only for CSE department
            </h2>

            <p className="text-blue-100 text-sm md:text-base">
              Department
            </p>

          </div>

          {/* Stat 3 */}
          <div>

            <div className="text-4xl md:text-5xl mb-4">
              🎓
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              50+
            </h2>

            <p className="text-blue-100 text-sm md:text-base">
              Batches
              (demo data for now)
            </p>

          </div>

          {/* Stat 4 */}
          <div>

            <div className="text-4xl md:text-5xl mb-4">
              🌍
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              100+
            </h2>

            <p className="text-blue-100 text-sm md:text-base">
              Companies Represented
              (demo data for now)
            </p>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer
        id="contact"
        className="bg-gray-900 text-white px-4 sm:px-8 lg:px-10 py-14 md:py-16"
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">

          {/* Brand */}
          <div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-800">

              AlumniMS

            </h2>

            <p className="text-gray-400 leading-7 text-sm md:text-base">

              A modern alumni management system
              connecting students, alumni and
              administrators through one platform.

            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm md:text-base">

              <li>
                <a href="#home" className="hover:text-white">
                  Home
                </a>
              </li>

              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <a href="#roles" className="hover:text-white">
                  Roles
                </a>
              </li>

            </ul>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-xl font-semibold mb-4">
              Services
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm md:text-base">

              <li>Alumni Directory</li>

              <li>Email Communication</li>

              <li>Search & Filter</li>

              <li>Role Management</li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm md:text-base break-words">

              <li>
                📧 alumni.system2026@gmail.com
              </li>

              <li>
                📍 Tezpur University, Assam
              </li>
              <li>
                Napaam, Tezpur, Sonitpur, Assam (India)
              </li>

              <li>
                ☎ +91-3712-273332
              </li>
              <li>
                Web: http://www.tezu.ernet.in
              </li>

            </ul>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm md:text-base">

          © 2026 Alumni Management System.
          All rights reserved.

        </div>

      </footer>

    </div>
  );
}

export default LandingPage;