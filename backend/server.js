const express = require("express");
const cors = require("cors");
const questions = require("./data/questions");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let questionStore = [...questions];

let scores = [
  { id: 1, player: "Demo Player", category: "Programming", score: 9, total: 10 },
  { id: 2, player: "Aarav", category: "Science", score: 8, total: 10 },
  { id: 3, player: "Ananya", category: "Technology", score: 7, total: 10 }
];

app.get("/api/health", (req, res) => {
  res.json({ message: "Quiz Master API is running" });
});

app.get("/api/questions", (req, res) => {
  const { category } = req.query;
  const result = category
    ? questionStore.filter((q) => q.category.toLowerCase() === String(category).toLowerCase())
    : questionStore;
  res.json(result);
});

app.post("/api/questions", (req, res) => {
  const { questionText, category, answerOptions } = req.body;

  if (!questionText || !category || !Array.isArray(answerOptions) || answerOptions.length !== 4) {
    return res.status(400).json({ message: "Question, category and four answer options are required." });
  }

  if (!answerOptions.some((option) => option.isCorrect)) {
    return res.status(400).json({ message: "One answer must be marked correct." });
  }

  const newQuestion = {
    id: Date.now(),
    questionText,
    category,
    answerOptions
  };

  questionStore.push(newQuestion);
  res.status(201).json(newQuestion);
});

app.get("/api/leaderboard", (req, res) => {
  const sorted = [...scores].sort((a, b) => {
    const scoreA = a.score / a.total;
    const scoreB = b.score / b.total;
    return scoreB - scoreA;
  });
  res.json(sorted);
});

app.post("/api/scores", (req, res) => {
  const { player, category, score, total } = req.body;

  if (!player || !category || typeof score !== "number" || typeof total !== "number") {
    return res.status(400).json({ message: "Invalid score data." });
  }

  const newScore = {
    id: Date.now(),
    player,
    category,
    score,
    total
  };

  scores.push(newScore);
  res.status(201).json(newScore);
});

app.listen(PORT, () => {
  console.log(`Quiz Master API running at http://localhost:${PORT}`);
});