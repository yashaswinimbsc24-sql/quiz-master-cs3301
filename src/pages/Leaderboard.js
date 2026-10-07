import React, { useEffect, useState } from "react";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((response) => response.json())
      .then(setScores)
      .catch(() => setScores([]));
  }, []);

  const categories = ["All", "Programming", "Science", "Technology", "General Knowledge"];
  const visibleScores = filter === "All" ? scores : scores.filter((item) => item.category === filter);

  return (
    <div className="page">
      <div className="page-heading leaderboard-heading">
        <div>
          <span className="eyebrow">TOP PERFORMERS</span>
          <h1>Leaderboard</h1>
          <p>Scores saved from completed quizzes.</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </div>

      <div className="leaderboard-card">
        {visibleScores.length === 0 ? (
          <div className="empty-state">No scores yet. Complete a quiz and save your result!</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Rank</th><th>Player</th><th>Category</th><th>Score</th><th>Accuracy</th></tr>
              </thead>
              <tbody>
                {visibleScores.map((item, index) => (
                  <tr key={item.id}>
                    <td><span className={`rank rank-${index + 1}`}>{index + 1}</span></td>
                    <td><strong>{item.player}</strong></td>
                    <td>{item.category}</td>
                    <td>{item.score}/{item.total}</td>
                    <td>{Math.round((item.score / item.total) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}