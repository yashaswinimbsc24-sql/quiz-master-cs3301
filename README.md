# Quiz Master — CS3301 CIE-2

A full-stack React mini project based on the original GitHub React Quiz App starter.

## Features / Screens
1. Home
2. Categories
3. Quiz
4. Results
5. Leaderboard
6. Add Question

## Student modifications
- Category selection and filtering
- Leaderboard with saved scores
- Express backend/API
- Add Question form
- Per-question timer
- Responsive UI

## React concepts demonstrated
- Reusable components
- Functional components
- Class component (`QuizInstructions`)
- Parent-child communication
- Props
- `useState`
- `useEffect`
- Event handling
- Form handling
- React Router client-side routing
- Responsive UI
- Express.js REST API

## How to run

### 1. Open the project folder
Open `quiz-master-cs3301` in VS Code.

### 2. Install dependencies
```bash
npm install
```

### 3. Start frontend + backend
```bash
npm start
```

The React application opens at:
`http://localhost:3000`

The Express API runs at:
`http://localhost:5000`

## API endpoints
- `GET /api/health`
- `GET /api/questions`
- `GET /api/questions?category=Programming`
- `POST /api/questions`
- `GET /api/leaderboard`
- `POST /api/scores`

Note: scores and newly added questions are stored in memory while the Express server is running. Restarting the server resets them.
