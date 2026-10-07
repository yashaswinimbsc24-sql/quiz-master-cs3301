import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import AddQuestion from "./pages/AddQuestion";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/quiz/:category" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Quiz Master • CS3301 Full Stack Development • CIE-2</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}