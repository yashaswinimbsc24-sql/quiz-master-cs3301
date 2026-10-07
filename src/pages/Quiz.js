import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";

export default function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const decodedCategory = decodeURIComponent(category);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(15);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/questions?category=${encodeURIComponent(decodedCategory)}`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load questions.");
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to connect to the Express server. Please make sure the backend is running.");
        setLoading(false);
      });
  }, [decodedCategory]);

  const finishQuiz = useCallback((finalScore) => {
    navigate("/results", {
      state: {
        score: finalScore,
        total: questions.length,
        category: decodedCategory
      }
    });
  }, [navigate, questions.length, decodedCategory]);

  const tick = useCallback((type) => {
    if (type === "tick") {
      setSeconds((prev) => Math.max(prev - 1, 0));
    } else if (type === "timeout") {
      const nextQuestion = current + 1;
      if (nextQuestion < questions.length) {
        setCurrent(nextQuestion);
        setSeconds(15);
      } else {
        finishQuiz(score);
      }
    }
  }, [current, questions.length, score, finishQuiz]);

  useEffect(() => {
    if (seconds === 0 && questions.length > 0) tick("timeout");
  }, [seconds, questions.length, tick]);

  const handleAnswer = (option) => {
    const newScore = score + (option.isCorrect ? 1 : 0);
    setScore(newScore);
    const nextQuestion = current + 1;

    if (nextQuestion < questions.length) {
      setCurrent(nextQuestion);
      setSeconds(15);
    } else {
      finishQuiz(newScore);
    }
  };

  if (loading) return <div className="page centered"><div className="loading">Loading quiz...</div></div>;
  if (error) return <div className="page centered"><div className="error-box">{error}</div></div>;
  if (!questions.length) return <div className="page centered"><div className="error-box">No questions found for this category.</div></div>;

  return (
    <div className="page quiz-page">
      <div className="quiz-topbar">
        <div>
          <span className="eyebrow">{decodedCategory.toUpperCase()}</span>
          <h1>Quiz Challenge</h1>
        </div>
        <Timer seconds={seconds} onTimeUp={tick} />
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      <QuestionCard
        question={questions[current]}
        questionNumber={current + 1}
        total={questions.length}
        onAnswer={handleAnswer}
      />

      <p className="quiz-note">Choose an answer to continue. The timer resets for each question.</p>
    </div>
  );
}