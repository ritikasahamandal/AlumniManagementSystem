import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import { Link } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/forgot-password",
        { email }
      );

      toast.success(
        res.data.message
      );

      setEmail("");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to send reset link"
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

            Forgot Password

          </h1>

          <p className="text-gray-600">

            Enter your registered email
            to receive a reset link.

          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label className="block text-gray-700 mb-2 font-medium">

              Email

            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >

            {loading
              ? "Sending..."
              : "Send Reset Link"}

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

export default ForgotPassword;