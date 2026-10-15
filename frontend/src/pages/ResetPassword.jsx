import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Password match check
    if (password !== confirmPassword) {

      return toast.error(
        "Passwords do not match"
      );
    }

    try {

      setLoading(true);

      const res = await API.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      toast.success(
        res.data.message
      );

      // Redirect to login
      setTimeout(() => {

        navigate("/login");

      }, 2000);

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.error ||
        "Reset failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900 mb-2">

            Reset Password

          </h1>

          <p className="text-gray-600">

            Enter your new password below.

          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* New Password */}
          <div>

            <label className="block text-gray-700 mb-2 font-medium">

              New Password

            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter new password"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block text-gray-700 mb-2 font-medium">

              Confirm Password

            </label>

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm new password"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >

            {loading
              ? "Resetting..."
              : "Reset Password"}

          </button>

        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;