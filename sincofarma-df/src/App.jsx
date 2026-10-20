import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useAuth } from "./contexts/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute><Dashboard /></PrivateRoute>}
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}