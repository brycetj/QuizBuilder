# 🧠 AI Quiz Builder (Full Stack)

An AI-powered quiz generator built with **Node.js + Express** (backend) and **React + Bootstrap** (frontend).  
The app generates multiple-choice quizzes from any topic using OpenAI’s LLM.  
Includes Swagger API docs, mock mode for offline/testing, and a clean modular structure.

---

## ✨ Features
- 🔹 Generate **5 multiple-choice questions** per topic (4 options, 1 correct) with explanations  
- 🔹 **Backend**: Node.js + Express + Swagger UI/OpenAPI docs  
- 🔹 **Frontend**: React (CRA) + Bootstrap, structured into reusable components  
- 🔹 **Mock mode** (`USE_MOCK=true`) to bypass API calls during development/tests  
- 🔹 **Testing**: Vitest + Supertest (backend), Jest + React Testing Library (frontend)  
- 🔹 **Code Quality**: ESLint + Prettier, optional Husky pre-commit hooks  

---

## 🚀 Quickstart

### Backend
cd backend
npm install

Create `.env` in `backend/`:
- PORT=3000
- OPENAI_API_KEY=sk-your-key-here
- USE_MOCK=true

Run backend:
npm run dev

- API: http://localhost:3000/api  
- Swagger Docs: http://localhost:3000/docs  

### Frontend
cd frontend
npm install

Create `.env` in `frontend/`:
- PORT=3001
- REACT_APP_API_BASE=http://localhost:3000

Run frontend:
npm start

- App: http://localhost:3001

---

## 📡 API Overview

### GET /api/health
Response:
{ "ok": true }

### POST /api/generate-quiz
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
- PORT → backend port (default: 3000)  
- OPENAI_API_KEY → required if USE_MOCK=false  
- USE_MOCK → "true" to return a static quiz without API calls  

🔒 Security:  
- Do **not** expose OPENAI_API_KEY to the frontend  
- `.env` is gitignored; `.env.example` is included for reference  

---

## 🧠 LLM
- Model: **OpenAI gpt-4o-mini** (fast, accurate, cost-efficient)  
- Wikipedia retrieval is enabled by default for factual grounding  
- Mock mode ensures zero cost during development/tests  

---

## 🧪 Testing

### Backend
- Framework: **Vitest + Supertest**  
- Covers route validation and schema correctness  
cd backend
npm test

### Frontend
- Framework: **Jest + React Testing Library**  
- Covers user flows: generate quiz, answer, submit, error handling  
cd frontend
npm test

---

## 🧹 Code Quality
- ESLint + Prettier configured  
- Husky + lint-staged optional pre-commit hooks  

---

## 🧭 Troubleshooting
- ❌ "Cannot use import outside a module" → ensure "type": "module" in package.json  
- ❌ API errors 401/429 → check API key/quota, or enable USE_MOCK=true  
- ❌ Tests timing out → confirm mock mode enabled in test setup  
- ❌ CRA proxy issues → restart dev server after editing package.json  

---

## 👤 Author
**Bryce Jacobson** – Software Engineer
