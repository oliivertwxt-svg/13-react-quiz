import { useEffect, useReducer } from 'react'
import sampleQuestions from './sampleQuestions.js'
import ResultScreen from './ResultScreen.jsx'
import StartScreen from './StartScreen.jsx'
import Question from './Question.jsx'
import { initialQuizState, quizReducer } from './quizReducer.js'
import styles from './App.module.css'

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState)
  const totalQuestions = state.questions.length
  const maxPoints = totalQuestions
  const progress = totalQuestions > 0
    ? ((state.index + 1) / totalQuestions) * 100
    : 0

  useEffect(() => {
    if (state.status !== 'loading') return undefined

    const timeoutId = window.setTimeout(() => {
      if (state.questions.length === 0) {
        dispatch({ type: 'dataFailed' })
      } else {
        dispatch({ type: 'dataReceived', payload: state.questions })
      }
    }, 350)

    return () => window.clearTimeout(timeoutId)
  }, [state.status, state.questions])

  useEffect(() => {
    if (state.status !== 'active' || state.answer) return undefined

    const intervalId = window.setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [state.status, state.answer])

  function handleStart({ category, difficulty, questionCount }) {
    const questions = sampleQuestions
      .filter((question) => (
        (category === 'Mixed bag' || question.category === category)
        && (difficulty === 'Any difficulty' || question.difficulty === difficulty)
      ))
      .slice(0, Number(questionCount))

    dispatch({ type: 'start', payload: { questions } })
  }

  const question = state.questions[state.index]

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a
          className={styles.brand}
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            dispatch({ type: 'restart' })
          }}
          aria-label="Little Quiz Club home"
        >
          <span className={styles.brandIcon} aria-hidden="true">✳</span>
          <span>little quiz club</span>
        </a>
        <span className={styles.headerNote}>A little brain break, anyone?</span>
      </header>

      <div className={styles.content}>
        {(state.status === 'idle' || state.status === 'ready') && (
          <StartScreen
            ready={state.status === 'ready'}
            questionCount={totalQuestions}
            highscore={state.highscore}
            onStart={(settings) => {
              if (settings) {
                handleStart(settings)
              } else {
                dispatch({ type: 'start' })
              }
            }}
          />
        )}
        {state.status === 'loading' && (
          <section className={styles.statusCard} aria-live="polite">
            <span className={styles.spinner} aria-hidden="true" />
            <h1>Picking your questions...</h1>
            <p>Getting your brain break ready.</p>
          </section>
        )}
        {state.status === 'error' && (
          <section className={styles.statusCard} role="alert">
            <span className={styles.errorIcon} aria-hidden="true">?</span>
            <h1>No questions found</h1>
            <p>Try a different category or difficulty for this sample quiz.</p>
            <button
              className={styles.statusButton}
              type="button"
              onClick={() => dispatch({ type: 'restart' })}
            >
              Change settings
            </button>
          </section>
        )}
        {state.status === 'active' && question && (
          <Question
            question={question}
            currentQuestion={state.index + 1}
            totalQuestions={totalQuestions}
            progress={progress}
            score={state.points}
            maxPoints={maxPoints}
            answer={state.answer}
            secondsRemaining={state.secondsRemaining}
            onAnswer={(answer) => dispatch({ type: 'newAnswer', payload: answer })}
            onNext={() => dispatch({ type: 'nextQuestion' })}
          />
        )}
        {state.status === 'finished' && (
          <ResultScreen
            score={state.points}
            total={maxPoints}
            highscore={state.highscore}
            onPlayAgain={() => dispatch({ type: 'restart' })}
          />
        )}
      </div>

      <footer className={styles.footer}>
        Made for curious minds <span aria-hidden="true">✦</span>
      </footer>
    </main>
  )
}

export default App
