import { useState } from "react";

import API from "../api/axios";

import { toast } from "react-toastify";

function AlumniRegister() {

  const [form, setForm] = useState({

    name: "",
    email: "",
    password: "",

    role: "student",


    course_name: "",
    graduation_year: "",


    company: "",
    job_title: "",
    location: "",

  });

  const handleRegister = async () => {

    try {

      await API.post(
        "/auth/register",
        form
      );

      toast.success(
        "Registration successful"
      );

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-xl">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8">

          Alumni Registration

        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-xl mb-4"

          value={form.name}

          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"

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
          className="w-full border p-3 rounded-xl mb-4"

          value={form.password}

          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {/* Role */}
        <select
          className="w-full border p-3 rounded-xl mb-6"

          value={form.role}

          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >

          <option value="student">
            Student
          </option>

          <option value="alumni">
            Alumni
          </option>

        </select>

        {/* Alumni Fields */}
        {form.role === "alumni" && (

          <>

            {/* Course Name */}
            <input
              type="text"
              placeholder="Course Name (BTech CSE, MBA...)"
              className="w-full border p-3 rounded-xl mb-4"

              value={form.course_name}

              onChange={(e) =>
                setForm({
                  ...form,
                  course_name: e.target.value,
                })
              }
            />



            {/* Graduation Year */}
            <input
              type="number"
              placeholder="Graduation Year"
              className="w-full border p-3 rounded-xl mb-4"

              value={form.graduation_year}

              onChange={(e) =>
                setForm({
                  ...form,
                  graduation_year:
                    e.target.value,
                })
              }
            />

            {/* Company */}
            <input
              type="text"
              placeholder="Company"
              className="w-full border p-3 rounded-xl mb-4"

              value={form.company}

              onChange={(e) =>
                setForm({
                  ...form,
                  company: e.target.value,
                })
              }
            />

            {/* Job Title */}
            <input
              type="text"
              placeholder="Job Title"
              className="w-full border p-3 rounded-xl mb-4"

              value={form.job_title}

              onChange={(e) =>
                setForm({
                  ...form,
                  job_title: e.target.value,
                })
              }
            />

            {/* Location */}
            <input
              type="text"
              placeholder="Location"
              className="w-full border p-3 rounded-xl mb-6"

              value={form.location}

              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
            />

          </>

        )}

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold transition"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center mt-5 text-sm text-gray-600">

          Already have an account?

          <span
            className="text-blue-600 cursor-pointer ml-1 hover:underline"
            onClick={() =>
              window.location.href = "/login"
            }
          >
            Login
          </span>

        </p>

      </div>

    </div>
  );
}

export default AlumniRegister;