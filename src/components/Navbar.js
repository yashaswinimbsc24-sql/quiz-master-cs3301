import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const links = [
    ["/", "Home"],
    ["/categories", "Categories"],
    ["/leaderboard", "Leaderboard"],
    ["/add-question", "Add Question"]
  ];

  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-icon">Q</span>
        <span>Quiz Master</span>
      </NavLink>

      <nav className="nav-links">
        {links.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}