import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      toast.success("Login successful");

      // Role based navigation
      if (res.data.user.role === "admin") {
        window.location.href = "/admin";
      }

      else if (res.data.user.role === "student") {
        window.location.href = "/student";
      }

      else if (res.data.user.role === "alumni") {
        window.location.href = "/alumni";
      }

    } catch (error) {

      console.error(error);

      const message =
        error.response?.data?.message;

      toast.error(
        message || "Login failed"
      );

      // Redirect only if account doesn't exist
      if (message === "User not found") {

        if (form.role === "student") {

          setTimeout(() => {
            window.location.href =
              "/register/student";
          }, 1500);

        }

        else if (form.role === "alumni") {

          setTimeout(() => {
            window.location.href =
              "/register/alumni";
          }, 1500);

        }
      }
    }
  };

  // Register button navigation
  const handleRegister = () => {

    if (form.role === "student") {
      window.location.href =
        "/register/student";
    }

    else if (form.role === "alumni") {
      window.location.href =
        "/register/alumni";
    }

    else {
      toast.error(
        "Admin registration is not allowed"
      );
    }
  };

  return (

  <div className="relative min-h-screen">

    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/tezu-home.jpg')",
      }}
    />

    {/* Dark Blur Overlay */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

    {/* Login Container */}
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

      {/* Login Card */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-md relative">

        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-gray-500 hover:text-red-500 transition"
        >
          <X size={28} />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8">

          Login

        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {/* Forgot Password */}
        <div className="text-right mb-4">

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Role */}
        <select
          className="w-full border p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >

          <option value="admin">
            Admin
          </option>

          <option value="student">
            Student
          </option>

          <option value="alumni">
            Alumni
          </option>

        </select>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

          <button
            onClick={handleRegister}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-xl font-semibold transition"
          >
            Register
          </button>

        </div>

      </div>

    </div>

  </div>
);
}

export default Login;