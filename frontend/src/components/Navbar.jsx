import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <nav className="w-full py-4 bg-gray-900 text-white shadow">
      <div className="container mx-auto flex items-center justify-between">
        <h2 className="text-xl font-bold text-cyan-600">Kanban Board</h2>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              {user.username}{" "}
              <span className="text-xs text-gray-400">({user.role})</span>
            </span>
            <button
              onClick={logout}
              className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-300 hover:text-white transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
