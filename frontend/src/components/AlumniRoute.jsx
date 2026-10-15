import { Navigate } from "react-router-dom";

function AlumniRoute({ children }) {

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  if (!token || role !== "alumni") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AlumniRoute;