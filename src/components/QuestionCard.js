import React from "react";

export default function QuestionCard({ question, questionNumber, total, onAnswer }) {
  return (
    <section className="quiz-card">
      <div className="question-count">
        <span>Question {questionNumber}</span> / {total}
      </div>

      <h2 className="question-text">{question.questionText}</h2>

      <div className="answer-grid">
        {question.answerOptions.map((option, index) => (
          <button
            key={index}
            className="answer-button"
            onClick={() => onAnswer(option)}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            {option.answerText}
          </button>
        ))}
      </div>
    </section>
  );
}