import { useState } from "react";

export default function MoodTracker() {
  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😌", label: "Calm" },
    { emoji: "🤔", label: "Focused" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😫", label: "Stressed" },
  ];
  const [mood, setMood] = useState("😌");
  const label = moods.find(m => m.emoji === mood)?.label;

  return (
    <div className="card">
      <h3>How are you feeling?</h3>
      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>Track your mood throughout the day</p>
      <div className="mood-tracker-controls">
        {moods.map(m => (
          <button key={m.emoji} className={m.emoji === mood ? "active" : ""} onClick={() => setMood(m.emoji)}>
            {m.emoji} <small>{m.label}</small>
          </button>
        ))}
      </div>
      <p style={{ marginTop: "1rem", padding: '10px', background: '#f0f9ff', borderRadius: '8px', color: 'var(--primary)', textAlign: 'center' }}>
          You're feeling **{label}** today ✨
      </p>
    </div>
  );
}