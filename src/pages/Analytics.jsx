import {
  FiClock,
  FiCheckSquare,
  FiZap,
  FiTrendingUp,
  FiTarget,
  FiChevronRight,
  FiCpu,
} from "react-icons/fi";

export default function Analytics() {
  return (
    <main className="analytics-page">
      <h2>Performance Analytics</h2>
      <p className="page-subtitle">
        Track your productivity trends and personalized performance insights
      </p>

      {/* === GRID LAYOUT === */}
      <div className="analytics-grid">
        {/* ==== LEFT COLUMN: Metrics + Charts ==== */}
        <section className="analytics-left">
          {/* ==== Metric Cards ==== */}
          <div className="metric-card-grid">
            <div className="card metric-card">
              <div className="metric-top">
                <FiCheckSquare className="metric-icon success" />
                <small className="trend positive">+12%</small>
              </div>
              <h3>67</h3>
              <p>Tasks Completed</p>
            </div>

            <div className="card metric-card">
              <div className="metric-top">
                <FiClock className="metric-icon primary" />
                <small className="trend positive">+8%</small>
              </div>
              <h3>43.5</h3>
              <p>Focus Hours</p>
            </div>

            <div className="card metric-card">
              <div className="metric-top">
                <FiZap className="metric-icon warning" />
                <small className="trend positive">+5%</small>
              </div>
              <h3>87</h3>
              <p>Productivity Score</p>
            </div>

            <div className="card metric-card">
              <div className="metric-top">
                <FiTrendingUp className="metric-icon success" />
                <small className="trend neutral">High</small>
              </div>
              <h3>Excellent</h3>
              <p>Weekly Trend</p>
            </div>
          </div>

          {/* ==== Charts Section ==== */}
          <div className="charts-grid">
            <div className="card chart-card">
              <h3>Tasks Completed (Daily)</h3>
              <p>Track your daily task completion this week</p>
              <div className="chart-placeholder">📊 Bar Chart Placeholder</div>
            </div>

            <div className="card chart-card">
              <h3>Focus Trend</h3>
              <p>Your focus hours across sessions</p>
              <div className="chart-placeholder">📈 Line Chart Placeholder</div>
            </div>
          </div>
        </section>

        {/* ==== RIGHT COLUMN ==== */}
        <section className="analytics-right">
          {/* Goal Progress */}
          <div className="card goal-progress-card">
            <h3 className="flex-row" style={{ justifyContent: "space-between" }}>
              <span className="flex-row">
                <FiTarget className="metric-icon primary" /> Goal Progress
              </span>
              <span className="progress-value">71%</span>
            </h3>

            <div className="progress-bar-group">
              <div>
                <p>Weekly Goal</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill primary"
                    style={{ width: "71%" }}
                  ></div>
                </div>
              </div>

              <div>
                <p>Focus Sessions</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill success"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>

              <div>
                <p>Consistency</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill warning"
                    style={{ width: "64%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="card ai-insights-card">
            <h3 className="flex-row">
              <FiCpu className="metric-icon primary" /> AI Insights
            </h3>
            <p className="text-light small">Personalized recommendations</p>

            <div className="insight-card-item">
              <h4>
                <FiZap className="metric-icon primary" /> Peak Productivity
              </h4>
              <p>You work best between 9–11 AM</p>
            </div>

            <div className="insight-card-item">
              <h4>
                <FiTarget className="metric-icon success" /> Goal Achievement
              </h4>
              <p>You’re 87% toward your weekly goal</p>
            </div>

            <div className="insight-card-item">
              <h4>
                <FiClock className="metric-icon danger" /> Focus Improvement
              </h4>
              <p>Your focus sessions have improved by 25%</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
