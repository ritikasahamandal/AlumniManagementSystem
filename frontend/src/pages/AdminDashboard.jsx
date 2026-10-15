import React, { useState, useEffect } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    company: "",
    course_name: "",
    graduation_year: "",
  });

  const handleReset = () => {

    setFilters({
      name: "",
      company: "",
      course_name: "",
      graduation_year: "",
    });

    fetchUsers();
  };

  const handleSearch = async () => {
    try {

      const query =
        new URLSearchParams(
          Object.fromEntries(
            Object.entries(filters).filter(
              ([_, value]) =>
                value !== ""
            )
          )
        ).toString();

      const res = await API.get(
        `/alumni/search?${query}`
      );

      setUsers(res.data);

    } catch (error) {

      console.error(error);

      toast.error("Search failed");
    }
  };

  // Fetch Users
  const fetchUsers = async () => {

    try {

      const res = await API.get(
        "/admin/users"
      );

      setUsers(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load users"
      );
    }
  };

  // Delete User
  const deleteUser = async (id) => {

    try {

      await API.delete(
        `/admin/user/${id}`
      );

      toast.success(
        "User deleted"
      );

      fetchUsers();

    } catch (error) {

      console.error(error);

      toast.error(
        "Delete failed"
      );
    }
  };

  // Verify Alumni
  const handleVerify = async (id) => {

    try {

      await API.put(
        `/admin/approve/${id}`
      );

      toast.success(
        "Alumni verified successfully"
      );

      fetchUsers();

    } catch (error) {

      console.error(error);

      toast.error(
        "Verification failed"
      );
    }
  };

  // Change Role
  const handleRoleChange = async (
    id,
    newRole
  ) => {

    try {

      await API.put(
        `/admin/role/${id}`,
        {
          role: newRole
        }
      );

      toast.success(
        "Role updated successfully"
      );

      fetchUsers();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update role"
      );
    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <Layout>

      {/* Heading */}
      <div className="mb-6 md:mb-8">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">

          Admin Dashboard

        </h1>

        <p className="text-sm sm:text-base text-gray-600 mt-2">

          Manage alumni and platform users.

        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* Total Users */}
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-lg transition">

          <p className="text-gray-500 text-sm mb-2">

            Total Users

          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-blue-600">

            {users.length}

          </h2>

        </div>

        {/* Alumni */}
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-lg transition">

          <p className="text-gray-500 text-sm mb-2">

            Alumni

          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-green-600">

            {
              users.filter(
                (u) =>
                  u.role === "alumni"
              ).length
            }

          </h2>

        </div>

        {/* Students */}
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-lg transition">

          <p className="text-gray-500 text-sm mb-2">

            Students

          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-purple-600">

            {
              users.filter(
                (u) =>
                  u.role === "student"
              ).length
            }

          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

        <h2 className="text-xl font-bold mb-4">
          Search Alumni
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-lg"
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
            className="w-full border p-3 rounded-lg"
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
            className="w-full border p-3 rounded-lg"
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
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFilters({
                ...filters,
                graduation_year: e.target.value,
              })
            }
          />

        </div>

        <div className="flex gap-3 mt-4">

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Search
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Reset
          </button>

        </div>

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 border-b">

          <h2 className="text-2xl font-semibold">

            Alumni Users

          </h2>

        </div>

        <div className="overflow-x-auto w-full">

         <table className="min-w-[900px] w-full">

            <thead>

              <tr className="bg-blue-100 text-left">

                <th className="p-4 whitespace-nowrap">
                  ID
                </th>

                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  Role
                </th>

                <th className="p-4">
                  Grad_Year
                </th>

                <th className="p-4">
                  Verification
                </th>

                <th className="p-4">
                  Delete
                </th>

              </tr>

            </thead>

            <tbody>

              {users
                .filter((u) => u.role === "alumni")
                .map((u) => (

                  <tr
                    key={u.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4 whitespace-nowrap font-semibold text-blue-600">

                      ALM-{u.id}

                    </td>

                    {/* Name */}
                    <td className="p-4">
                      {u.name}
                    </td>

                    {/* Email */}
                    <td className="p-4">
                      {u.email}
                    </td>

                    {/* Role */}
                    <td className="p-4">

                      <select
                        value={u.role}
                        onChange={(e) =>
                          handleRoleChange(
                            u.id,
                            e.target.value
                          )
                        }
                        className="border rounded-lg px-3 py-2"
                      >

                        <option value="alumni">
                          Alumni
                        </option>

                        <option value="student">
                          Student
                        </option>

                      </select>

                    </td>

                    <td className="p-4">
                      {u.graduation_year}
                    </td>

                    {/* Verify */}
                    <td className="p-4">

                      {u.is_approved ? (

                        <span className="text-green-600 font-semibold">

                          ✅ Verified

                        </span>

                      ) : (

                        <button
                          onClick={() =>
                            handleVerify(
                              u.id
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                          Verify
                        </button>

                      )}

                    </td>

                    {/* Delete */}
                    <td className="p-4">

                      <button
                        onClick={() =>
                          deleteUser(
                            u.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden grid grid-cols-1 gap-5">

        {users
          .filter((u) => u.role === "alumni")
          .map((u) => (

            <div
              key={u.id}
              className="bg-white rounded-2xl shadow-sm p-5"
            >

              {/* Name */}
              <h2 className="text-xl font-bold mb-2 break-words">

                {u.name}

              </h2>

              {/* Email */}
              <p className="text-gray-600 text-sm break-all mb-4">

                {u.email}

              </p>

              {/* Role */}
              <div className="mb-4">

                <p className="text-gray-500 text-sm mb-2">

                  Role

                </p>

                <select
                  value={u.role}

                  disabled={u.is_approved}

                  onChange={(e) =>
                    handleRoleChange(
                      u.id,
                      e.target.value
                    )
                  }

                  className={`border rounded-lg px-3 py-2

    ${u.is_approved
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-white"
                    }
  `}
                >

                  <option value="alumni">
                    Alumni
                  </option>

                  <option value="student">
                    Student
                  </option>

                </select>

              </div>

              {/* Verification */}
              <div className="mb-5">

                {u.is_approved ? (

                  <span className="text-green-600 font-semibold">

                    ✅ Verified

                  </span>

                ) : (

                  <button
                    onClick={() =>
                      handleVerify(
                        u.id
                      )
                    }
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
                  >
                    Verify
                  </button>

                )}

              </div>

              {/* Delete */}
              <button
                onClick={() =>
                  deleteUser(
                    u.id
                  )
                }
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
              >
                Delete
              </button>

            </div>

          ))}

      </div>

    </Layout>
  );
}

export default AdminDashboard;