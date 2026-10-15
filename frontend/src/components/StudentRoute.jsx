import { Navigate } from "react-router-dom";

function StudentRoute({ children }) {

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  if (!token || role !== "student") {
    return <Navigate to="/" />;
  }

  return children;
}

export default StudentRoute;