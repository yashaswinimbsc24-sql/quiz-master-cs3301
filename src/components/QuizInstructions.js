import React, { Component } from "react";

export default class QuizInstructions extends Component {
  render() {
    return (
      <div className="instructions-card">
        <strong>Quick instructions</strong>
        <ul>
          <li>Choose one answer for each question.</li>
          <li>You have 15 seconds per question.</li>
          <li>Your score is saved to the leaderboard.</li>
        </ul>
      </div>
    );
  }
}