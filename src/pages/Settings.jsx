import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSettings, FiBell } from "react-icons/fi";

const THEMES = [
  { name: "Classic", key: "classic", color: "#2563eb" },
  { name: "Midnight", key: "midnight", color: "#1e293b" },
  { name: "Ocean Mist", key: "ocean", color: "#0ea5e9" },
  { name: "Forest Calm", key: "forest", color: "#15803d" },
  { name: "Lavender Dream", key: "lavender", color: "#8b5cf6" },
];

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {/* === Full Width Theme Settings === */}
      <div style={{ gridColumn: "1 / span 2" }}>
        <div className="card">
          <h3 className="flex-row">
            <FiSettings size={20} style={{ color: "var(--primary)" }} /> Theme Settings
          </h3>
          <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
            Customize your workspace appearance
          </p>

          <div
            className="card"
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              background: "var(--background)",
            }}
          >
            <h4>
              Current Theme:{" "}
              <b style={{ color: "var(--primary)", textTransform: "capitalize" }}>
                {theme}
              </b>
            </h4>
          </div>

          <h3>Available Themes</h3>
          <p
            style={{
              color: "var(--text-light)",
              marginBottom: "1.5rem",
            }}
          >
            Click to instantly apply your preferred theme
          </p>

          <div className="grid-2" style={{ gap: "1.5rem" }}>
            {THEMES.map((t) => (
              <div
                key={t.key}
                className="flex-row"
                style={{
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <p>{t.name}</p>
                <button
                  onClick={() => toggleTheme(t.key)}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "6px",
                    background: t.color,
                    border:
                      theme === t.key
                        ? "2px solid var(--primary)"
                        : "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "transform 0.25s ease",
                  }}
                  title={`Switch to ${t.name}`}
                ></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === Full Width Notification Settings === */}
      <div style={{ gridColumn: "1 / span 2" }}>
        <div className="card">
          <h3 className="flex-row">
            <FiBell size={20} style={{ color: "var(--primary)" }} /> Notifications
          </h3>
          <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
            Manage your notification preferences
          </p>

          <div
            className="flex-row"
            style={{
              justifyContent: "space-between",
              borderBottom: "1px solid var(--border)",
              padding: "1rem 0",
            }}
          >
            <div>
              <h4>Task Reminders</h4>
              <p style={{ color: "var(--text-light)" }}>
                Get notified about upcoming tasks
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              style={{
                width: "40px",
                height: "20px",
                accentColor: "var(--primary)",
              }}
            />
          </div>

          <div
            className="flex-row"
            style={{
              justifyContent: "space-between",
              padding: "1rem 0",
            }}
          >
            <div>
              <h4>Focus Timer Alerts</h4>
              <p style={{ color: "var(--text-light)" }}>
                Alerts when a session ends
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              style={{
                width: "40px",
                height: "20px",
                accentColor: "var(--primary)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
