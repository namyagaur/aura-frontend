import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./layout/DashboardLayout";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Focus from "./pages/Focus";
import Mood from "./pages/Mood";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/tasks" element={<DashboardLayout><Tasks /></DashboardLayout>} />
            <Route path="/focus" element={<DashboardLayout><Focus /></DashboardLayout>} />
            <Route path="/mood" element={<DashboardLayout><Mood /></DashboardLayout>} />
            <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />

            <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
