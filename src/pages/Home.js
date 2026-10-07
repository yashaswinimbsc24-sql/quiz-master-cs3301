import React from "react";
import { Link } from "react-router-dom";
import QuizInstructions from "../components/QuizInstructions";

export default function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">CS3301 • FULL STACK REACT PROJECT</span>
          <h1>Test your knowledge.<br /><span>Beat your best score.</span></h1>
          <p>
            A responsive quiz platform built from the original React quiz starter
            and extended with routing, categories, a leaderboard and an Express API.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/categories">Start Quiz →</Link>
            <Link className="secondary-btn" to="/leaderboard">View Leaderboard</Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-icon">?</div>
          <h3>Ready for a challenge?</h3>
          <p>Pick a category and answer before the timer runs out.</p>
          <div className="mini-stats">
            <div><strong>4</strong><span>Categories</span></div>
            <div><strong>10</strong><span>Questions</span></div>
            <div><strong>15s</strong><span>Per Question</span></div>
          </div>
        </div>
      </section>

      <QuizInstructions />

      <section className="feature-grid">
        <div className="feature-card"><span>📚</span><h3>Multiple Categories</h3><p>Practice Programming, Science, Technology and General Knowledge.</p></div>
        <div className="feature-card"><span>🏆</span><h3>Leaderboard</h3><p>Record your score and compare your performance with other players.</p></div>
        <div className="feature-card"><span>⚡</span><h3>Fast & Responsive</h3><p>Designed to work comfortably on desktop, tablet and mobile screens.</p></div>
      </section>
    </div>
  );
}