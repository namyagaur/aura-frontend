import { FiClock, FiCalendar } from "react-icons/fi";

export default function TaskListItem({ task, onToggleStatus }) {
  if (!task) return null;

  const { id, title, duration, date, priority = "low", status = "Pending" } = task;

  const formattedDate = (date && date !== "Invalid Date") ? date : "";
  const formattedDuration = duration ? duration : "";

  const handleClick = () => {
    if (typeof onToggleStatus === "function") onToggleStatus(id);
  };

  const showCheckbox = status !== "Focus";

  return (
    <div
      className={`task-list-item ${status === "Completed" ? "completed" : ""}`}
      onClick={handleClick}
    >
      {/* Top Row */}
      <div className="task-top-row">
        {showCheckbox && (
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={status === "Completed"}
              onChange={handleClick}
            />
          </div>
        )}
        <span
          className="task-title"
          style={{
            textDecoration: status === "Completed" ? "line-through" : "none",
            color: status === "Completed" ? "var(--text-light)" : "var(--text-dark)",
          }}
        >
          {title}
        </span>
      </div>

      {/* Bottom Row */}
      <div className="task-bottom-row">
        {formattedDuration && (
          <span className="flex-row">
            <FiClock size={12} /> {formattedDuration}
          </span>
        )}
        {formattedDate && (
          <span className="flex-row">
            <FiCalendar size={12} /> {formattedDate}
          </span>
        )}
        <span className={`priority ${priority.toLowerCase()}`}>{priority}</span>
      </div>
    </div>
  );
}
