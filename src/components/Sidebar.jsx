import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiClock,
  FiActivity,
  FiCpu,
  FiSettings,
} from "react-icons/fi";

export default function Sidebar() {
  const links = [
    { to: "/", icon: <FiHome size={20} />, label: "Dashboard" },
    { to: "/tasks", icon: <FiCheckSquare size={20} />, label: "Tasks" },
    { to: "/focus", icon: <FiClock size={20} />, label: "Focus Timer" },
    { to: "/analytics", icon: <FiActivity size={20} />, label: "Analytics" },
    { to: "/settings", icon: <FiSettings size={20} />, label: "Settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo">AURA</h2>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-links-list">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
                end={link.to === "/"}
              >
                <span className="sidebar-icon">{link.icon}</span>
                <span className="sidebar-label">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>Smart Productivity Assistant</p>
      </div>
    </aside>
  );
}
