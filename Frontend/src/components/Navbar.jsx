import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b bg-white px-6 py-3">
      {/* Logo */}
      <h1 className="text-lg font-bold">LegalEyes</h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-black"
              : "text-gray-600 hover:text-black"
          }
        >
          Dashboard
        </NavLink>

        <button
          onClick={handleLogout}
          className="rounded bg-black px-3 py-1 text-sm text-white hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
