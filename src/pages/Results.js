import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const result = location.state || { score: 0, total: 0, category: "Quiz" };
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const percentage = result.total ? Math.round((result.score / result.total) * 100) : 0;

  const saveScore = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;

    try {
      await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player: name.trim(),
          category: result.category,
          score: result.score,
          total: result.total
        })
      });
      setSaved(true);
    } catch {
      setSaved(false);
    }
  };

  return (
    <div className="page centered results-page">
      <div className="results-card">
        <span className="eyebrow">QUIZ COMPLETE</span>
        <div className="result-trophy">🏆</div>
        <h1>Great job!</h1>
        <p className="result-category">{result.category}</p>

        <div className="score-circle">
          <strong>{result.score}</strong>
          <span>/ {result.total}</span>
        </div>
        <h2>{percentage}% Accuracy</h2>

        {!saved ? (
          <form className="score-form" onSubmit={saveScore}>
            <label>Enter your name to save your score</label>
            <div className="inline-form">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength="30" />
              <button className="primary-btn" type="submit">Save Score</button>
            </div>
          </form>
        ) : (
          <div className="success-message">✓ Score saved to the leaderboard!</div>
        )}

        <div className="result-actions">
          <Link className="primary-btn" to={`/quiz/${encodeURIComponent(result.category)}`}>Retry Quiz</Link>
          <Link className="secondary-btn" to="/leaderboard">Leaderboard</Link>
          <Link className="text-btn" to="/">Back Home</Link>
        </div>
      </div>
    </div>
  );
}