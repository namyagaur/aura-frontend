import { useEffect, useState, useRef } from "react";
import { FiPlay, FiPause, FiRotateCcw, FiClock } from "react-icons/fi";

export default function Focus() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const timerRef = useRef(null);

  // Format seconds → MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Toggle start/pause
  const toggleTimer = () => setIsRunning((prev) => !prev);

  // Reset timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setSecondsLeft(workMinutes * 60);
  };

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          const next = isBreak ? workMinutes * 60 : breakMinutes * 60;
          setIsBreak(!isBreak);
          return next;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isRunning, isBreak, workMinutes, breakMinutes]);

  // Update timer when focus duration changes
  useEffect(() => {
    if (!isBreak) setSecondsLeft(workMinutes * 60);
  }, [workMinutes]);

  const totalSeconds = (isBreak ? breakMinutes : workMinutes) * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className="focus-timer-sphere-page">
      <div
        className={`focus-sphere-card ${
          isBreak ? "break-mode" : "focus-mode"
        } ${isRunning ? "running" : ""}`}
      >
        <h2 className="sphere-title">
          <FiClock /> Focus Timer
        </h2>
        <p className="sphere-sub">
          Breathe. Focus. Grow. <br /> Let your time glow.
        </p>

        {/* Timer Circle */}
        <div className="sphere-timer">
          <div className="sphere-orb">
            <svg className="sphere-ring" width="220" height="220">
              <defs>
                <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="breakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>

              <circle
                className="sphere-ring-bg"
                cx="110"
                cy="110"
                r="95"
                strokeWidth="10"
              />
              <circle
                className="sphere-ring-fill"
                cx="110"
                cy="110"
                r="95"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 95}
                strokeDashoffset={2 * Math.PI * 95 * (1 - progress / 100)}
                stroke={isBreak ? "url(#breakGradient)" : "url(#focusGradient)"}
              />
            </svg>

            <div className="sphere-core">
              <div className="sphere-glow"></div>
              <h1 className="sphere-time">{formatTime(secondsLeft)}</h1>
              <small>{isBreak ? "Break" : "Focus"}</small>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="sphere-controls">
          {!isRunning ? (
            <button onClick={toggleTimer} className="sphere-play">
              <FiPlay />
            </button>
          ) : (
            <button onClick={toggleTimer} className="sphere-pause">
              <FiPause />
            </button>
          )}
          <button onClick={resetTimer} className="sphere-reset">
            <FiRotateCcw />
          </button>
        </div>

        {/* Settings */}
        <div className="sphere-settings">
          <div>
            <label>Focus</label>
            <input
              type="number"
              min="1"
              max="90"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
            />
            <span>min</span>
          </div>
          <div>
            <label>Break</label>
            <input
              type="number"
              min="1"
              max="30"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
            />
            <span>min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
