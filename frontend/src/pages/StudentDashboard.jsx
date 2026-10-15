import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function StudentDashboard() {

  const [student, setStudent] = useState(null);

  const [alumni, setAlumni] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    company: "",
    course_name: "",
    graduation_year: "",
  });

  const fetchStudent = async () => {

    try {

      const res = await API.get(
        "/auth/me"
      );

      setStudent(res.data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load profile"
      );
    }
  };

  // Fetch all alumni
  const fetchAlumni = async () => {

    try {

      const res = await API.get(
        "/alumni"
      );

      setAlumni(res.data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load alumni"
      );
    }
  };

  // Search alumni
  const handleSearch = async () => {

    try {

      const query =
        new URLSearchParams(filters).toString();

      const res = await API.get(
        `/alumni/search?${query}`
      );

      setAlumni(res.data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Search failed"
      );
    }
  };

  useEffect(() => {

    fetchStudent();

  }, []);

  // Logout
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/";
  };

  return (

    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-full md:w-72 bg-blue-900 text-white p-6 flex flex-col shadow-xl">

        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">

          Student Portal

        </h1>

        <div className="flex flex-col gap-4">

          <button
            onClick={() =>
              window.location.href = "/"
            }
            className="bg-blue-800 hover:bg-blue-700 p-4 rounded-xl font-medium text-left"
          >
            🏠 Home
          </button>

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-6 md:mt-auto bg-red-500 hover:bg-red-600 p-4 rounded-xl font-semibold transition"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">

        {/* Header */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow mb-8">

          <h2 className="text-3xl md:text-4xl font-bold mb-3">

            Student Dashboard

          </h2>

        </div>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow">

          <h3 className="text-2xl font-bold mb-6">

            My Profile

          </h3>

          <div className="space-y-4">

            <p>
              <strong>Name:</strong>{" "}
              {student?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {student?.email}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {student?.role}
            </p>

          </div>

        </div>








      </div>

    </div>
  );
}

export default StudentDashboard;