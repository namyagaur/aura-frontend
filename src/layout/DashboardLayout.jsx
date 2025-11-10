import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout-container">
      <Sidebar />
      <div className="main-content-area">
        <Navbar />
        {/* The main content wrapper that applies the Grid */}
        <main className="dashboard-grid-layout">
          {children}
        </main>
      </div>
    </div>
  );
}