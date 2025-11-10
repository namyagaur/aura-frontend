import { useEffect, useState } from "react";
import { API } from "../api";
import TaskListItem from "../components/TaskListItem";
import FocusTimer from "../components/FocusTimer";
import MoodTracker from "../components/MoodTracker";
import { FiCheckCircle, FiAward, FiPlus, FiCpu, FiTarget } from "react-icons/fi";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");

  // 🧠 Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // ➕ Add Task (POST)
  const addTask = async () => {
    if (!newTask.trim()) return alert("Please enter a task name!");
    try {
      const res = await API.post("/tasks", {
        title: newTask,
        priority,
      });
      setTasks((prev) => [res.data, ...prev]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // 🔁 Toggle completion (PATCH)
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
    try {
      const res = await API.patch(`/tasks/${id}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const activeTasks = tasks.filter((t) => t.status !== "Completed");
  const completedTasks = tasks.filter((t) => t.status === "Completed");

  const total = tasks.length;
  const done = completedTasks.length;
  const progress = total ? Math.round((done / total) * 100) : 0;

  // AI Insights (static)
  const AI_INSIGHTS = [
    {
      icon: <FiTarget style={{ color: "var(--success)" }} />,
      title: "Goal Achievement",
      text: "You’re 87% toward your weekly goal. Keep going!",
    },
    {
      icon: <FiCpu style={{ color: "var(--primary)" }} />,
      title: "Focus Optimization",
      text: "Your focus sessions increased by 25% this week.",
    },
    {
      icon: <FiAward style={{ color: "var(--warning)" }} />,
      title: "Consistency Streak",
      text: "You’ve been consistent for 7 days straight. 🔥",
    },
  ];

  return (
    <main>
      <h2>Welcome back, Namya 👋</h2>
      <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
        Here’s your productivity snapshot for today
      </p>

      <div className="dashboard-grid-main">
        {/* === COLUMN 1: Task Overview === */}
        <div className="card task-overview-card">
          <h3 className="flex-row" style={{ justifyContent: "space-between" }}>
            Task Overview
            <span style={{ color: "var(--text-light)", fontWeight: 500 }}>
              {done}/{total} Done
            </span>
          </h3>

          <div
            style={{
              height: "6px",
              background: "#e5e7eb",
              borderRadius: "6px",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                height: "6px",
                width: `${progress}%`,
                background: "var(--primary)",
                borderRadius: "6px",
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>

          <div className="task-add-bar">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button onClick={addTask}>
              <FiPlus />
            </button>
          </div>

          <div className="task-overview-list">
            {activeTasks.length === 0 ? (
              <p style={{ color: "var(--text-light)", textAlign: "center", marginTop: "1rem" }}>
                🎉 All tasks completed!
              </p>
            ) : (
              activeTasks.map((t) => (
                <TaskListItem key={t._id} task={t} onToggleStatus={() => toggleStatus(t._id, t.status)} />
              ))
            )}
          </div>
        </div>

        {/* === COLUMN 2: Completed Tasks === */}
        <div className="card">
          <h3 className="flex-row">
            <FiCheckCircle style={{ color: "var(--success)" }} /> Tasks Completed
          </h3>
          <p style={{ color: "var(--text-light)", marginBottom: "1rem", fontSize: "0.9rem" }}>
            Finished tasks appear here automatically
          </p>

          {completedTasks.length === 0 ? (
            <p style={{ color: "var(--text-light)", textAlign: "center" }}>No completed tasks yet</p>
          ) : (
            completedTasks.map((t) => (
              <div key={t._id} className="task-list-item completed" onClick={() => toggleStatus(t._id, t.status)}>
                <FiCheckCircle size={18} style={{ color: "var(--success)" }} />
                <div style={{ flexGrow: 1 }}>
                  <b>{t.title}</b>
                  <small style={{ color: "var(--text-light)", display: "block" }}>
                    {t.priority?.toUpperCase()} Priority
                  </small>
                </div>
              </div>
            ))
          )}
        </div>

        {/* === COLUMN 3: Mood Tracker === */}
        <MoodTracker />
      </div>

      <div className="dashboard-grid-main" style={{ marginTop: "1rem" }}>
        <div>
          <FocusTimer />
        </div>

        <div className="card">
          <h3 className="flex-row">
            <FiCpu style={{ color: "var(--primary)" }} /> AI Insights
          </h3>
          <p style={{ color: "var(--text-light)", marginBottom: "1rem", fontSize: "0.9rem" }}>
            Personalized recommendations
          </p>
          {AI_INSIGHTS.map((i, index) => (
            <div key={index} style={{ marginBottom: "1.2rem" }}>
              <h4 className="flex-row" style={{ marginBottom: "5px", fontSize: "1rem", fontWeight: 500 }}>
                {i.icon} {i.title}
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
