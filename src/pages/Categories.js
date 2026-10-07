import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Programming", icon: "💻", description: "React, JavaScript and web development" },
  { name: "Science", icon: "🔬", description: "Physics, biology and scientific facts" },
  { name: "Technology", icon: "⚙️", description: "Computers, devices and modern technology" },
  { name: "General Knowledge", icon: "🌍", description: "World facts, history and everyday knowledge" }
];

export default function Categories() {
  const [questionCount, setQuestionCount] = useState({});

  useEffect(() => {
    fetch("/api/questions")
      .then((response) => response.json())
      .then((data) => {
        const counts = {};
        data.forEach((q) => { counts[q.category] = (counts[q.category] || 0) + 1; });
        setQuestionCount(counts);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="page">
      <div className="page-heading">
        <span className="eyebrow">CHOOSE YOUR CHALLENGE</span>
        <h1>Quiz Categories</h1>
        <p>Select a topic and see how much you know.</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link className="category-card" to={`/quiz/${encodeURIComponent(category.name)}`} key={category.name}>
            <div className="category-icon">{category.icon}</div>
            <div>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <small>{questionCount[category.name] || 0} questions available</small>
            </div>
            <span className="arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}