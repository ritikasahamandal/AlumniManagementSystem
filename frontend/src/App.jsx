import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AddAlumni from "./pages/AddAlumni";
import ProtectedRoute from "./components/protectedRoute";
import SearchAlumni from "./pages/SearchAlumni";
import SendEmail from "./pages/SendEmail";
import StudentRegister from "./pages/StudentRegister";
import AlumniRegister from "./pages/AlumniRegister";
import StudentDashboard from "./pages/StudentDashboard";
import AlumniDashboard from "./pages/AlumniDashboard";
import StudentRoute from "./components/StudentRoute";
import AlumniRoute from "./components/AlumniRoute";
import LandingPage from "./pages/LandingPage";
import AlumniDirectory from "./pages/AlumniDirectory";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/add-alumni" element={
          <ProtectedRoute>
            <AddAlumni />
          </ProtectedRoute>
        } />
        <Route
          path="/search-alumni"
          element={
            <ProtectedRoute>
              <SearchAlumni />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send-email"
          element={
            <ProtectedRoute>
              <SendEmail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register/student"
          element={<StudentRegister />}
        />

        <Route
          path="/register/alumni"
          element={<AlumniRegister />}
        />

        <Route
          path="/student"
          element={
            <StudentRoute>
              <StudentDashboard />
            </StudentRoute>
          }
        />

        <Route
          path="/alumni"
          element={
            <AlumniRoute>
              <AlumniDashboard />
            </AlumniRoute>
          }
        />

        <Route
          path="/register/student"
          element={<StudentRegister />}
        />

        <Route
          path="/register/alumni"
          element={<AlumniRegister />}
        />

        <Route
          path="/alumni-directory"
          element={<AlumniDirectory />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </>
  )
}

export default App;
