import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { FiChevronDown, FiSearch, FiLogOut, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext); // ✅ get logout function
  const navigate = useNavigate();

  const themes = ["classic", "midnight", "ocean", "forest", "lavender"];
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const nextTheme = () => {
    const i = themes.indexOf(theme);
    const next = themes[(i + 1) % themes.length];
    toggleTheme(next);
  };

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const handleLogout = () => {
    logout(); // Clear user data
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="navbar">
      {/* === Left: Search === */}
      <div className="navbar-left">
        <div className="search-box">
          <FiSearch size={18} className="search-icon" />
          <input
            className="search-input"
            placeholder="Search tasks, goals, insights..."
          />
        </div>
      </div>

      {/* === Right: Theme + Profile === */}
      <div className="navbar-actions">
        <select
  className="navbar-theme-selector"
  value={theme}
  onChange={(e) => toggleTheme(e.target.value)}
>
  <option value="classic">Classic</option>
  <option value="midnight">Midnight</option>
  <option value="ocean">Ocean Mist</option>
  <option value="forest">Forest Calm</option>
  <option value="lavender">Lavender Dream</option>
</select>


        {/* === Profile Icon + Dropdown === */}
        <div
          className="navbar-user-menu"
          ref={menuRef}
          style={{ position: "relative" }}
        >
          <div
            className="navbar-user-icon"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <FiUser size={18} />
          </div>

          {showMenu && (
            <div className="user-dropdown">
              <button onClick={() => navigate("/settings")}>
                ⚙️ Settings
              </button>
              <button onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
