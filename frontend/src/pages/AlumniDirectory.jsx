import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function AlumniDirectory() {

  const [alumni, setAlumni] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    company: "",
    course_name: "",
    graduation_year: "",
  });

  // Fetch Alumni
  const fetchAlumni = async () => {

    try {

      const res = await API.get("/alumni");

      setAlumni(res.data.data || res.data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load alumni");

    }
  };

  // Search Alumni
  const handleSearch = async () => {

    try {

      const params = {};

      if (filters.name.trim())
        params.name = filters.name;

      if (filters.company.trim())
        params.company = filters.company;

      if (filters.course_name.trim())
        params.course_name = filters.course_name;

      if (filters.graduation_year)
        params.graduation_year =
          filters.graduation_year;

      const query =
        new URLSearchParams(params)
          .toString();

      const res = await API.get(
        `/alumni/search?${query}`
      );

      setAlumni(res.data);

    } catch (error) {

      console.error(
        "SEARCH ERROR =>",
        error
      );
    }
  };

  useEffect(() => {

    fetchAlumni();

  }, []);

  // Verify Alumni
  const handleVerify = async (id) => {

    try {

      await API.put(
        `/admin/approve/${id}`
      );

      toast.success(
        "Alumni verified successfully"
      );

      // Refresh alumni list
      fetchAlumni();

    } catch (error) {

      console.error(error);

      toast.error(
        "Verification failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 pt-32 px-4 md:px-10">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">

        <div className="max-w-7xl mx-auto px-4 md:px-10">

          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold text-red-800"
            >
              AlumniMS
            </Link>

            {/* Navigation */}
            <div className="flex flex-wrap items-center justify-end gap-2 md:gap-6 text-sm md:text-base">

              {/* Home */}
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Home
              </Link>

              {/* Current Page */}
              <Link
                to="/alumni-directory"
                className="text-blue-600 font-semibold"
              >
                Alumni Directory
              </Link>

              {/* My Profile */}
              <Link
                to={
                  localStorage.getItem("role") === "admin"
                    ? "/admin"
                    : localStorage.getItem("role") === "student"
                      ? "/student"
                      : "/alumni"
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition text-sm md:text-base"
              >
                My Profile
              </Link>

            </div>

          </div>

        </div>

      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 md:p-8 mb-8">

        <h1 className="text-3xl md:text-5xl font-bold mb-3">

          Alumni Directory

        </h1>

        <p className="text-gray-600 text-base md:text-lg">

          Connect with alumni from different
          departments, companies and batches.

        </p>

      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-2xl shadow p-6 md:p-8 mb-8">

        <h2 className="text-2xl font-bold mb-6">

          Search & Filter

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Name"
            value={filters.name}
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setFilters({
                ...filters,
                name: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Company"
            value={filters.company}
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setFilters({
                ...filters,
                company: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Course Name"
            value={filters.course_name}
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setFilters({
                ...filters,
                course_name: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Graduation Year"
            value={filters.graduation_year}
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setFilters({
                ...filters,
                graduation_year: e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={handleSearch}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          Search Alumni
        </button>

        <button
          onClick={() => {
            setFilters({
              name: "",
              company: "",
              course_name: "",
              graduation_year: "",
            });

            fetchAlumni();
          }}
          className="mt-6 ml-3 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition"
        >
          Reset
        </button>

      </div>

      {/* Alumni Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {alumni.map((a) => (

          <div
            key={a.id}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
          >

            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl mb-5">

              🎓

            </div>

            {/* Name */}
            <h3 className="text-2xl font-bold mb-2 break-words">

              {a.name}

            </h3>

            {/* Details */}
            <p className="text-gray-600 mb-1 break-words">
              {a.company}
            </p>

            <p className="text-gray-600 mb-1 break-words">
              {a.job_title}
            </p>

            <p className="text-blue-600 font-medium mb-1 break-words">
              {a.course_name}
            </p>

            <p className="text-gray-600 mb-1 break-words">
              {a.location}
            </p>

            <p className="text-gray-600 mb-4">

              Graduation_year:
              {" "}
              {a.graduation_year}

            </p>

            {/* <p
              className={`mt-3 font-semibold ${a.is_approved
                ? "text-green-600"
                : "text-red-500"
                }`}
            >

              {a.is_approved
                ? "Verified"
                : "Not Verified"}

            </p> */}
            <div className="mt-4">

              {a.is_approved ? (

                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  ✅ Verified
                </span>

              ) : (

                <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  ⏳ Pending Verification
                </span>

              )}

            </div>


          </div>


        ))}

      </div>

    </div>
  );
}

export default AlumniDirectory;