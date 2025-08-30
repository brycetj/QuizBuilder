# 🧠 AI Quiz Builder (Full Stack)

A full-stack project that generates multiple-choice quizzes from any topic using an LLM.  
Includes an **Node.js + Express backend** with Swagger docs and a **React + Bootstrap frontend**.  
Mock mode is available for offline/testing without API calls.

---

## ✨ Features
- Generate 5 MCQs per topic (4 options, 1 correct) with explanations  
- Backend: Node.js + Express + Swagger UI/OpenAPI docs  
- Frontend: React (CRA) + Bootstrap, separated into reusable components  
- Modular backend: routes, controllers, services split by feature  
- Mock mode (no API calls) via `USE_MOCK=true`  
- Tests: Vitest + Supertest (backend), Jest + React Testing Library (frontend)  
- ESLint/Prettier + optional Husky hooks for code quality  

---

## 🗂 Project Structure
backend/
  src/
    server.js           # starts HTTP server
    app.js              # middleware + Swagger setup
    routes/             # endpoints
    controllers/        # request logic
  lib/                  # OpenAI integration + env helpers
  docs/                 # Swagger definitions
  test/                 # Vitest + Supertest
  .env.example
  package.json

frontend/
  src/
    api/                # API wrapper for fetch
    components/         # TopicForm, QuizView, QuestionCard, etc.
    App.jsx             # main React app
    index.js
  package.json

---

## 🚀 Quickstart

### Backend
cd backend
npm install

Create `.env` in `backend/`:
PORT=3000
OPENAI_API_KEY=sk-your-key-here
USE_MOCK=true

Run backend:
npm run dev

- API: http://localhost:3000/api  
- Swagger: http://localhost:3000/docs  

### Frontend
cd frontend
npm install

Create `.env` in `frontend/`:
PORT=3001
REACT_APP_API_BASE=http://localhost:3000

Run frontend:
npm start

- App: http://localhost:3001

---

## 📡 API

### `GET /api/health`
Response:
{ "ok": true }

### `POST /api/generate-quiz`
Request:
{ "topic": "Ancient Rome" }

Response:
{
  "topic": "Ancient Rome",
  "questions": [
    {
      "prompt": "Who was the first emperor of Rome?",
      "options": ["Julius Caesar","Augustus","Nero","Trajan"],
      "correctIndex": 1,
      "explanation": "Augustus (Octavian) became the first Roman emperor."
    }
    // four more...
  ]
}

Errors:
- 400 → invalid input (missing/invalid topic)  
- 502 → LLM returned invalid payload  
- 500 → server error  

---

## ⚙️ Configuration
- PORT: backend port (default 3000)  
- OPENAI_API_KEY: required if USE_MOCK=false  
- USE_MOCK: "true" to bypass OpenAI and return canned quiz data  

Security notes:  
- Never expose OPENAI_API_KEY in the frontend  
- .env is gitignored;

---

## 🧠 LLM
- Model: OpenAI gpt-4o-mini (fast, accurate, cost-efficient)  
- Wikipedia retrieval is used by default for factual grounding  
- Mock mode prevents billing during tests or demos  

---

## 🧪 Tests

### Backend
- Framework: Vitest + Supertest  
- Covers route validation and schema correctness  
cd backend
npm test

### Frontend
- Framework: Jest + React Testing Library  
- Covers user flows: generate quiz, answer questions, submit, error handling  
cd frontend
npm test

---

## 🧹 Linting & Hooks
- ESLint + Prettier configured  
- Husky + lint-staged optional pre-commit hooks  

---

## 🧭 Troubleshooting
- “Cannot use import outside a module”: check "type": "module" in package.json  
- 401/429 errors: check API key and quota, or use USE_MOCK=true  
- Tests timing out: ensure mock mode is active in test setup  
- CRA proxy issues: restart dev server after editing package.json  

---

## 👤 Author
Bryce Jacobson • Software Engineer
