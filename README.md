# 🧠 AI Quiz Builder (Backend)

A minimal backend service that generates multiple-choice quizzes from any topic using an LLM. Includes mock mode for offline/testing and Swagger docs for a clean demo.

---

## ✨ Features
- Generate 5 MCQs per topic (4 options, 1 correct) with explanations
- Optional Wikipedia retrieval for grounding
- Mock mode (no API calls) via USE_MOCK=true
- Swagger UI at /docs and OpenAPI JSON at /docs.json
- Modular code: routes, controllers, services, docs split by feature
- Tests (Vitest + Supertest) and linting (ESLint), optional Git hooks and CI

---

## 🗂 Project Structure
    backend/
      ├─ src/
      │  ├─ server.js            # starts HTTP server
      │  ├─ app.js               # builds Express app, middleware, docs
      │  └─ routes/
      │     ├─ index.js          # mounts feature routers under /api
      │     ├─ health.routes.js  # GET /api/health
      │     └─ quiz.routes.js    # POST /api/generate-quiz
      ├─ controllers/
      │  └─ quiz.controller.js
      ├─ lib/
      │  ├─ env.js               # env loading + validation
      │  ├─ llm.js               # OpenAI wrapper + mock mode
      │  └─ retrieval.js         # Wikipedia summary
      ├─ docs/
      │  ├─ base.js
      │  ├─ index.js             # composes feature docs
      │  └─ features/
      │     ├─ health.js
      │     └─ quiz.js
      ├─ test/
      │  ├─ api.test.js
      │  ├─ llm-shape.test.js
      │  └─ setup.js             # sets USE_MOCK=true for tests
      ├─ .eslintrc.json
      ├─ vitest.config.mjs
      ├─ package.json
      └─ .env.example

---

## 🚀 Quickstart
1) Install
    npm install

2) Configure environment (create backend/.env)
    PORT=3000
    OPENAI_API_KEY=sk-your-key-here
    USE_MOCK=true

   Notes:
   - USE_MOCK=true returns a static quiz (no external calls).
   - For real generation set USE_MOCK=false and provide a valid OPENAI_API_KEY.

3) Run
    npm run dev
   App:  http://localhost:3000
   Docs: http://localhost:3000/docs

---

## 🔧 Scripts
    npm run dev          # start server (with source maps)
    npm start            # start server (prod-like)
    npm test             # run tests once (Vitest)
    npm run test:watch   # run tests in watch mode
    npm run lint         # lint
    npm run lint:fix     # lint with --fix

(If you added nodemon or a debug config, document them here.)

---

## 📡 API

### GET /api/health
Response 200:
    { "ok": true }

### POST /api/generate-quiz
Request:
    {
      "topic": "Ancient Rome",
      "useRetrieval": true
    }

Response 200:
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
- 400: invalid input (e.g., missing topic)
- 502: LLM returned invalid payload
- 500: server error

Interactive docs: open /docs and click “Try it out”.

---

## ⚙️ Configuration
Environment variables (backend/.env):
- PORT: server port (default 3000)
- OPENAI_API_KEY: API key for OpenAI (required in real mode)
- USE_MOCK: "true" | "false" (true skips external calls and returns a canned quiz)

Security notes:
- Never expose OPENAI_API_KEY to the browser; calls happen server-side.
- .env is gitignored; commit .env.example instead.

---

## 🧠 LLM + Retrieval
- LLM model (default): gpt-4o-mini (low cost, quick, accurate)
- Retrieval (optional): Wikipedia REST summary for the given topic; safe to disable

Cost control:
- USE_MOCK=true during development and tests
- Cache or rate-limit in production
- Keep prompts concise and temperature low

---

## 🧪 Tests
- Framework: Vitest
- HTTP: Supertest
- Strategy: In tests we set USE_MOCK=true (via test/setup.js), so no network calls

Run:
    npm test
    npm run test:watch

What’s covered:
- Route 200s/400s and schema sanity (5 questions, 4 options, 0–3 correctIndex)

---

## 🧹 Linting & Hooks (optional but recommended)
- ESLint configured with import order + Prettier compatibility
- Pre-commit hooks via Husky + lint-staged (if initialized)

CI example (GitHub Actions, repo root .github/workflows/ci.yml):
    name: CI
    on: [push, pull_request]
    jobs:
      backend-ci:
        runs-on: ubuntu-latest
        defaults:
          run:
            working-directory: backend
        steps:
          - uses: actions/checkout@v4
          - uses: actions/setup-node@v4
            with:
              node-version: 20
              cache: 'npm'
              cache-dependency-path: backend/package-lock.json
          - run: npm ci
          - run: npm run lint
          - run: npm test
            env:
              USE_MOCK: "true"
              NODE_ENV: "test"

---

## 🧭 Troubleshooting
- “Cannot use import outside a module”: ensure "type": "module" in package.json
- 401/insufficient_quota from OpenAI: add billing or use USE_MOCK=true
- Tests timing out: ensure tests set USE_MOCK=true and import app after setting env
- 429 rate limiting in dev: lower rate limit or disable in test mode
- JSON body not parsed: app.use(express.json()) must be before routes

---

## 👤 Author
Bryce Jacobson • Software Engineer  
