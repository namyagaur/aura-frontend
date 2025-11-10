import { useState, useEffect, useRef } from "react";
import { FiPlay, FiPause, FiRotateCcw } from "react-icons/fi";

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // 'focus' | 'break'
  const timerRef = useRef(null);

  // Format seconds → mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            if (mode === "focus") {
              setMode("break");
              setTimeLeft(5 * 60); // switch to 5 min break
            } else {
              setMode("focus");
              setTimeLeft(25 * 60);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, mode]);

  const toggleTimer = () => setIsRunning((prev) => !prev);
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  return (
    <div className={`focus-timer ${isRunning ? "running" : ""} ${mode === "focus" ? "focus-mode" : "break-mode"}`}>

      <h3>{mode === "focus" ? "Focus Session" : "Break Time 🌿"}</h3>

      {/* Timer display */}
      <div className="focus-timer-display">{formatTime(timeLeft)}</div>

      <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
        {mode === "focus"
          ? "Stay focused and crush your goals 🔥"
          : "Relax your mind before next session 💆‍♀️"}
      </p>

      {/* Controls */}
      <div className="focus-timer-controls">
        <button
          onClick={toggleTimer}
          style={{
            background: isRunning ? "var(--danger)" : "var(--primary)",
          }}
        >
          {isRunning ? <FiPause /> : <FiPlay />} {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer}>
          <FiRotateCcw /> Reset
        </button>
      </div>
    </div>
  );
}
