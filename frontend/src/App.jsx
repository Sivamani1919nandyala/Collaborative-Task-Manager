import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // ✅ import dashboard
import "./styles/auth.css"; // our single CSS for forms

function App() {
  return (
    <Router>
      {/* Navigation links */}
      <nav style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/signup" style={{ marginRight: "10px" }}>Signup</Link>
        <Link to="/login">Login</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} /> {/* default route */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* now imported */}
      </Routes>
    </Router>
  );
}

export default App;
