import React from "react";

export default function AuthLayout({ children, mode = "login" }) {
  return (
    <div className="auth-container">
      {/* === LEFT SIDE (Branding) === */}
      <div className="auth-left">
        <h1 className="aura-logo">Aura</h1>
        <p className="aura-tagline">Your Intelligent Productivity Companion 🌙</p>
        <p className="aura-description">
          Plan smarter, focus deeper, and unlock your best self.  
          Aura blends AI-powered insights with clean minimal design to elevate  
          your work and mind — every single day.
        </p>
      </div>

      {/* === RIGHT SIDE (Form Area) === */}
      <div className="auth-right">
        <div className="auth-form-card">
          <h2>{mode === "login" ? "Welcome Back 👋" : "Join Aura 🚀"}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
