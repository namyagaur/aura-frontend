// import { useState } from "react";
// import { FiCheckCircle, FiPlus, FiAward } from "react-icons/fi";
// import TaskListItem from "../components/TaskListItem";

// export default function Tasks() {
//   const [tasks, setTasks] = useState([
//     { id: 1, title: "Review quarterly reports", duration: "2h", date: "Today", priority: "high", status: "Pending" },
//     { id: 2, title: "Update project documentation", duration: "1h", date: "Today", priority: "medium", status: "In Progress" },
//     { id: 3, title: "Design system updates", duration: "3h", date: "Tomorrow", priority: "medium", status: "Pending" },
//   ]);

//   const [completedTasks, setCompletedTasks] = useState([
//     { id: 101, title: "Team sync meeting", duration: "30m", date: "Yesterday", priority: "low", status: "Completed" },
//   ]);

//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState("");
//   const [priority, setPriority] = useState("medium");

//   const today = new Date();
//   const formattedDate = today.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//   });

//   // 🟢 Add new task
//   const addTask = () => {
//     if (!title.trim()) return alert("Please enter a task title!");
//     if (!duration.trim()) return alert("Please add a duration!");
//     const newTask = {
//       id: Date.now(),
//       title,
//       duration,
//       date: "Today",
//       priority,
//       status: "Pending",
//     };
//     setTasks((prev) => [newTask, ...prev]);
//     setTitle("");
//     setDuration("");
//   };

//   // 🟩 Move to Completed or back
//   const handleToggleStatus = (id) => {
//     // Check if it's in active list
//     const task = tasks.find((t) => t.id === id);
//     if (task) {
//       setTasks((prev) => prev.filter((t) => t.id !== id));
//       setCompletedTasks((prev) => [
//         { ...task, status: "Completed" },
//         ...prev,
//       ]);
//     } else {
//       // If already in completed, move back
//       const completedTask = completedTasks.find((t) => t.id === id);
//       if (completedTask) {
//         setCompletedTasks((prev) => prev.filter((t) => t.id !== id));
//         setTasks((prev) => [
//           { ...completedTask, status: "Pending" },
//           ...prev,
//         ]);
//       }
//     }
//   };

//   const completedCount = completedTasks.length;
//   const totalCount = tasks.length + completedCount;
//   const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

//   return (
//     <div className="tasks-page-layout">
//       {/* ==== LEFT COLUMN ==== */}
//       <div className="tasks-left">
//         <h2>Task Management</h2>
//         <p style={{ marginBottom: '1.5rem' }}>Organize, prioritize, and track all your tasks effortlessly.</p>

//         {/* ==== TASK OVERVIEW CARD ==== */}
//         <div className="card" style={{ marginBottom: '1.5rem' }}>
//           <h3>
//             Task Overview
//             <span style={{ fontSize: "0.9rem", color: "var(--text-light)", fontWeight: 500 }}>
//               {completedCount}/{totalCount} Done
//             </span>
//           </h3>

//           {/* Progress Bar */}
//           <div style={{ marginBottom: '1rem' }}>
//             <div
//               className="progress-bar"
//               style={{
//                 height: '8px',
//                 background: 'var(--border)',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//               }}
//             >
//               <div
//                 className="progress-bar-inner"
//                 style={{
//                   width: `${progressPercent}%`,
//                   background: 'var(--primary)',
//                   transition: 'width 0.3s ease',
//                 }}
//               />
//             </div>
//             <p
//               style={{
//                 textAlign: 'right',
//                 fontSize: '0.8rem',
//                 color: 'var(--text-light)',
//                 marginTop: '5px',
//               }}
//             >
//               {progressPercent}% Progress
//             </p>
//           </div>

//           {/* Active Tasks */}
//           <div className="task-list-container">
//             {tasks.length > 0 ? (
//               tasks.map((t) => (
//                 <TaskListItem key={t.id} task={t} onToggleStatus={handleToggleStatus} />
//               ))
//             ) : (
//               <p style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>All tasks completed! 🎉</p>
//             )}
//           </div>
//         </div>

//         {/* ==== ADD NEW TASK CARD ==== */}
//         <div className="card">
//           <h3 className="flex-row" style={{ marginBottom: '1rem' }}>
//             <FiPlus size={20} style={{ color: "var(--primary)" }} /> Add New Task
//           </h3>
//           <div className="task-add-bar" style={{ gap: '10px' }}>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Task title..."
//               style={{ flex: 2 }}
//             />
//             <input
//               type="text"
//               value={duration}
//               onChange={(e) => setDuration(e.target.value)}
//               placeholder="Duration (e.g. 1h 30m)"
//               style={{ flex: 1.5 }}
//             />
//             <select
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//               style={{ flex: 1 }}
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//             <button onClick={addTask}>Add</button>
//           </div>
//           <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: '10px' }}>
//             📅 Today — {formattedDate}
//           </p>
//         </div>
//       </div>

//       {/* ==== RIGHT COLUMN ==== */}
//       <div  className="tasks-right">
//         <div className="card tasks-completed-card">
//           <h3>
//             <FiCheckCircle style={{ color: "var(--success)" }} /> Tasks Completed
//           </h3>
//           <p>Recently done</p>

//           {completedTasks.length > 0 ? (
//             completedTasks.map((t) => (
//               <TaskListItem key={t.id} task={t} onToggleStatus={handleToggleStatus} />
//             ))
//           ) : (
//             <p style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>No completed tasks yet</p>
//           )}

//           <div className="card-footer" style={{ marginTop: 'auto' }}>
//             <FiAward /> Great progress today!
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/Tasks.jsx
import { useState, useEffect, useContext } from "react";
import { API } from "../api";
import { AuthContext } from "../context/AuthContext";
import TaskListItem from "../components/TaskListItem";
import { FiCheckCircle, FiPlus, FiAward } from "react-icons/fi";

export default function Tasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(true);

  // Fetch tasks on mount (and when user changes)
  useEffect(() => {
    if (!user) {
      setTasks([]);
      setCompletedTasks([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    API.get("/tasks")
      .then((res) => {
        if (cancelled) return;
        const all = res.data || [];
        setTasks(all.filter(t => t.status !== "Completed"));
        setCompletedTasks(all.filter(t => t.status === "Completed"));
      })
      .catch((err) => {
        console.error("Could not fetch tasks", err);
      })
      .finally(() => setLoading(false));
    return () => (cancelled = true);
  }, [user]);

  // Add new task -> POST /tasks
  const addTask = async () => {
    if (!title.trim()) return alert("Please enter a task title!");
    if (!duration.trim()) return alert("Please add a duration!");
    const payload = { title, duration, priority, date: "Today", status: "Pending" };

    try {
      const res = await API.post("/tasks", payload);
      // server returns created task
      setTasks(prev => [res.data, ...prev]);
      setTitle("");
      setDuration("");
    } catch (err) {
      console.error("Error creating task", err);
      alert("Unable to create task");
    }
  };

  // Toggle status (complete / undo) -> PATCH /tasks/:id
  const handleToggleStatus = async (id) => {
    // find where it is
    const isActive = tasks.find(t => t.id === id || t._id === id);
    const isCompleted = completedTasks.find(t => t.id === id || t._id === id);

    try {
      if (isActive) {
        // optimistic UI update
        const task = isActive;
        await API.patch(`/tasks/${task._id || task.id}`, { status: "Completed" });
        setTasks(prev => prev.filter(t => (t._id || t.id) !== (task._id || task.id)));
        setCompletedTasks(prev => [{ ...task, status: "Completed" }, ...prev]);
      } else if (isCompleted) {
        const task = isCompleted;
        await API.patch(`/tasks/${task._id || task.id}`, { status: "Pending" });
        setCompletedTasks(prev => prev.filter(t => (t._id || t.id) !== (task._id || task.id)));
        setTasks(prev => [{ ...task, status: "Pending" }, ...prev]);
      }
    } catch (err) {
      console.error("Error updating status", err);
      alert("Could not update task status");
      // Optionally re-fetch tasks to be safe
    }
  };

  if (loading) return <p>Loading tasks…</p>;

  return (
    <div className="dashboard-grid-layout tasks-page-layout">
      {/* LEFT: Overview + Add */}
      <div className="tasks-left">
        <div className="card">
          <h3>Task Overview</h3>
          <div className="progress-bar" style={{ margin: "10px 0" }}>
            {/* you can compute progress from tasks+completedTasks */}
          </div>
          <div className="task-list-container">
            {tasks.length > 0 ? tasks.map(t => (
              <TaskListItem key={t._id || t.id} task={t} onToggleStatus={handleToggleStatus} />
            )) : <p>No active tasks</p>}
          </div>
        </div>

        <div className="card">
          <h3>Add New Task</h3>
          <div className="task-add-bar">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title..." />
            <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration e.g. 1h" />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button onClick={addTask}><FiPlus /> Add</button>
          </div>
        </div>
      </div>

      {/* RIGHT: Completed */}
      <div className="tasks-right">
        <div className="card tasks-completed-card">
          <h3><FiCheckCircle /> Tasks Completed</h3>
          <div className="task-list-container">
            {completedTasks.length > 0 ? completedTasks.map(t => (
              <TaskListItem key={t._id || t.id} task={t} onToggleStatus={handleToggleStatus} />
            )) : <p>No completed tasks yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
