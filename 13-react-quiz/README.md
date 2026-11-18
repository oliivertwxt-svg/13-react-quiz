# Little Quiz Club

A playful, accessible trivia quiz built with React 19 and Vite. Choose a category and difficulty, answer ten questions, and try to beat your saved high score.

## Features

- Questions and categories from the [Open Trivia DB](https://opentdb.com/)
- Category and difficulty selection, with settings remembered in local storage
- Correct/incorrect answer feedback and score tracking
- Fifteen-second countdown for each question
- High score saved in local storage
- Keyboard support: press **1–4** to choose an answer and **Enter** to continue
- Accessible answer buttons, pressed state, and screen-reader announcements
- Responsive layout, loading states, and retryable error screens

## Screenshot

Replace this placeholder with a screenshot of the quiz:

![Little Quiz Club screenshot placeholder](./screenshots/quiz-screen.png)

## Run locally

```sh
npm install
npm run dev
```

Create and preview a production build:

```sh
npm run build
npm run preview
```

Vite writes the production-ready static site to `dist/`. It contains the built HTML entry point and optimized JavaScript, CSS, and other assets; it can be served by a static hosting provider such as Vercel.

## What I learned about hooks

- **`useReducer`** is useful when related state changes through explicit transitions, such as loading questions, answering, scoring, and finishing a quiz.
- **`useEffect`** synchronizes with external systems. Its dependency array determines when the effect re-runs; cleanup aborts fetches and clears timers/listeners so stale work does not continue.
- **`useLocalStorageState`** is a custom hook that reuses persistence behavior for the high score and last-used quiz settings.
- **Derived values** such as progress and maximum points stay out of state, avoiding duplicate values that could become inconsistent.
