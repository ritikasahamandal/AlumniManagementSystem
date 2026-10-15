import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function AlumniDashboard() {

  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({});

  const [alumni, setAlumni] = useState([]);

  // Fetch logged-in alumni profile
  const fetchProfile = async () => {

    try {

      const res = await API.get("/alumni/me");

      console.log("PROFILE RESPONSE =>", res.data);

      setProfile(res.data);

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

  useEffect(() => {

    fetchProfile();
    fetchAlumni();

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
        <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">

          Alumni Portal

        </h1>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-4">

          {/* My Profile */}
          <button
            onClick={() =>
              setActiveTab("profile")
            }
            className={`w-full text-left p-4 rounded-xl transition ${activeTab === "profile"
              ? "bg-white text-blue-900 font-semibold"
              : "hover:bg-blue-800"
              }`}
          >
            👤 My Profile
          </button>

          {/* Alumni Directory
          <button
            onClick={() =>
              setActiveTab("directory")
            }
            className={`w-full text-left p-4 rounded-xl transition ${activeTab === "directory"
              ? "bg-white text-blue-900 font-semibold"
              : "hover:bg-blue-800"
              }`}
          >
            👥 Alumni Directory
          </button> */}
          {/* home page button */}
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-full text-left p-4 rounded-xl hover:bg-blue-800 transition"
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

        Profile Section
        {activeTab === "profile" && (

          <div>

            {/* Welcome Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow mb-8">

              <h2 className="text-3xl md:text-4xl font-bold mb-3">

                Welcome,
                {" "}
                {profile?.name}

              </h2>

              <p className="text-gray-600 text-base md:text-lg">

                Manage and explore your alumni network.

              </p>

            </div>

            {/* Profile Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow">

              <h3 className="text-2xl md:text-3xl font-bold mb-8">

                My Profile

              </h3>

              <div className="space-y-3">

                <p><strong>Name:</strong> {profile?.name}</p>

                <p><strong>Email:</strong> {profile?.email}</p>

                <p><strong>Course:</strong> {profile?.course_name}</p>

                <p><strong>Graduation Year:</strong> {profile?.graduation_year}</p>

                <p><strong>Company:</strong> {profile?.company}</p>

                <p><strong>Job Title:</strong> {profile?.job_title}</p>

                <p><strong>Location:</strong> {profile?.location}</p>

              </div>



            </div>

          </div>

        )}

        {/* Alumni Directory Section */}
        {activeTab === "directory" && (

          <div>

            {/* Heading */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow mb-8">

              <h2 className="text-3xl md:text-4xl font-bold mb-3">

                Alumni Directory

              </h2>

              <p className="text-gray-600 text-base md:text-lg">

                Explore alumni profiles and connections.

              </p>

            </div>

            {/* Alumni Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

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
                  <h3 className="text-xl md:text-2xl font-bold mb-2 break-words">

                    {a.name}

                  </h3>

                  <p className="text-blue-600 font-medium mb-2">

                    {a.course_name}

                  </p>

                  {/* Details */}
                  <p className="text-black mb-1 break-words">
                    {a.company}
                  </p>

                  <p className="text-gray-600 mb-1 break-words">
                    {a.job_title}
                  </p>

                  <p className="text-gray-600 mb-1 break-words">
                    {a.location}
                  </p>

                  <p className="text-gray-600">

                    Graduation Year:
                    {" "}
                    {a.graduation_year}

                  </p>
                  <div className="mt-3">
                    {a.is_approved ? (
                      <span className="text-green-600 font-semibold">
                        ✅ Verified
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        ⏳ Pending Verification
                      </span>
                    )}
                  </div>
                </div>

              ))}


            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default AlumniDashboard;