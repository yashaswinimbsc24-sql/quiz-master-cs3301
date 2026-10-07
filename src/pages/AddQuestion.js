import React, { useState } from "react";

const initialForm = {
  questionText: "",
  category: "Programming",
  options: ["", "", "", ""],
  correctIndex: "0"
};

export default function AddQuestion() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const updateOption = (index, value) => {
    setForm((prev) => {
      const options = [...prev.options];
      options[index] = value;
      return { ...prev, options };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!form.questionText.trim() || form.options.some((option) => !option.trim())) {
      setMessage("Please fill in the question and all four options.");
      return;
    }

    const payload = {
      questionText: form.questionText.trim(),
      category: form.category,
      answerOptions: form.options.map((answerText, index) => ({
        answerText: answerText.trim(),
        isCorrect: index === Number(form.correctIndex)
      }))
    };

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error();
      setForm(initialForm);
      setMessage("Question added successfully!");
    } catch {
      setMessage("Could not add the question. Check that the Express server is running.");
    }
  };

  return (
    <div className="page">
      <div className="page-heading">
        <span className="eyebrow">QUESTION MANAGEMENT</span>
        <h1>Add a Question</h1>
        <p>Create a new question that can be used in a future quiz.</p>
      </div>

      <form className="question-form" onSubmit={handleSubmit}>
        <label>
          Question
          <textarea
            value={form.questionText}
            onChange={(e) => setForm({ ...form, questionText: e.target.value })}
            placeholder="Enter your question"
            rows="3"
          />
        </label>

        <label>
          Category
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Programming</option>
            <option>Science</option>
            <option>Technology</option>
            <option>General Knowledge</option>
          </select>
        </label>

        <div className="options-form">
          {form.options.map((option, index) => (
            <label key={index}>
              Option {index + 1}
              <input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Answer option ${index + 1}`}
              />
            </label>
          ))}
        </div>

        <label>
          Correct Answer
          <select value={form.correctIndex} onChange={(e) => setForm({ ...form, correctIndex: e.target.value })}>
            {form.options.map((_, index) => <option key={index} value={index}>Option {index + 1}</option>)}
          </select>
        </label>

        {message && <div className={message.includes("successfully") ? "success-message" : "error-box"}>{message}</div>}
        <button className="primary-btn form-submit" type="submit">Add Question</button>
      </form>
    </div>
  );
}