import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import InternshipDetail from "./pages/InternshipDetail";
import TestEngine from "./pages/TestEngine";
import ResultPage from "./pages/ResultPage";
import Dashboard from "./pages/Dashboard";
import Tests from "./pages/Tests";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { UserProfile } from "./types";

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));

      // Premium loading delay
      await new Promise((res) => setTimeout(res, 1200));
      setIsLoading(false);
    };

    initApp();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
        {/* LOGO */}
        <div className="mb-10 relative">
          <img
            src="https://drive.google.com/thumbnail?id=117kBU2vFBqEXbrf2q7Kua8R7BSbUNCsa&sz=w400"
            alt="Internadda Logo"
            className="w-24 h-24 object-contain drop-shadow-xl animate-float"
          />
        </div>

        {/* RUNNING LOADER */}
        <div className="loader"></div>

        {/* CSS */}
        <style>{`
          .loader {
            width: 90px;
            height: 14px;
            display: grid;
            box-shadow: 0 3px 0 #2563eb;
          }
          .loader:before,
          .loader:after {
            content: "";
            grid-area: 1/1;
            background:
              radial-gradient(circle closest-side, var(--c, #2563eb) 92%, #0000)
              0 0 / calc(100%/4) 100%;
            animation: l4 1s infinite linear;
          }
          .loader:after {
            --c: #1e40af;
            background-color: #ffffff;
            box-shadow: 0 -2px 0 0 #2563eb;
            clip-path: inset(-2px calc(50% - 10px));
          }
          @keyframes l4 {
            100% {
              background-position: calc(100%/3) 0;
            }
          }

          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-float {
            animation: float 2.2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage mode="login" setUser={setUser} />} />
            <Route path="/signup" element={<AuthPage mode="signup" setUser={setUser} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/internship/:id" element={<InternshipDetail />} />
            <Route path="/test/practice/:id" element={<TestEngine type="practice" />} />
            <Route path="/test/real/:id" element={<TestEngine type="real" />} />
            <Route path="/result/:id" element={<ResultPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
