import { useEffect, useReducer, useRef, useState } from 'react'
import ErrorScreen from './ErrorScreen.jsx'
import LoadingScreen from './LoadingScreen.jsx'
import ResultScreen from './ResultScreen.jsx'
import StartScreen from './StartScreen.jsx'
import Question from './Question.jsx'
import { fetchCategories, fetchQuestions } from './triviaApi.js'
import { initialQuizState, quizReducer } from './quizReducer.js'
import styles from './App.module.css'

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState)
  const [categoryState, setCategoryState] = useState({
    status: 'loading',
    categories: [],
    error: null,
  })
  const [categoryAttempt, setCategoryAttempt] = useState(0)
  const [quizError, setQuizError] = useState(null)
  const requestSettings = useRef(null)
  const totalQuestions = state.questions.length
  const maxPoints = totalQuestions
  const progress = totalQuestions > 0
    ? ((state.index + 1) / totalQuestions) * 100
    : 0

  useEffect(() => {
    const controller = new AbortController()

    fetchCategories(controller.signal)
      .then((categories) => {
        if (!controller.signal.aborted) {
          setCategoryState({ status: 'ready', categories, error: null })
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && !controller.signal.aborted) {
          setCategoryState({
            status: 'error',
            categories: [],
            error: error.message,
          })
        }
      })

    return () => controller.abort()
  }, [categoryAttempt])

  useEffect(() => {
    if (state.status !== 'loading') return undefined

    const controller = new AbortController()
    const settings = requestSettings.current

    fetchQuestions({ ...settings, signal: controller.signal })
      .then((questions) => {
        if (!controller.signal.aborted) {
          dispatch({ type: 'dataReceived', payload: questions })
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && !controller.signal.aborted) {
          setQuizError(error.message)
          dispatch({ type: 'dataFailed' })
        }
      })

    return () => controller.abort()
  }, [state.status])

  useEffect(() => {
    if (state.status !== 'active' || state.answer) return undefined

    const intervalId = window.setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [state.status, state.answer])

  function handleStart(settings) {
    requestSettings.current = settings
    setQuizError(null)
    dispatch({ type: 'start' })
  }

  function handleRestart() {
    setQuizError(null)
    dispatch({ type: 'restart' })
  }

  function retryCategories() {
    setCategoryState({ status: 'loading', categories: [], error: null })
    setCategoryAttempt((attempt) => attempt + 1)
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
            handleRestart()
          }}
          aria-label="Little Quiz Club home"
        >
          <span className={styles.brandIcon} aria-hidden="true">✳</span>
          <span>little quiz club</span>
        </a>
        <span className={styles.headerNote}>A little brain break, anyone?</span>
      </header>

      <div className={styles.content}>
        {state.status === 'idle' && categoryState.status === 'loading' && (
          <LoadingScreen message="Finding your quiz topics..." />
        )}
        {state.status === 'idle' && categoryState.status === 'error' && (
          <ErrorScreen
            title="We couldn’t load quiz topics"
            message={categoryState.error}
            onRetry={retryCategories}
          />
        )}
        {(state.status === 'idle' && categoryState.status === 'ready'
          || state.status === 'ready') && (
          <StartScreen
            ready={state.status === 'ready'}
            questionCount={totalQuestions}
            highscore={state.highscore}
            categories={categoryState.categories}
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
          <LoadingScreen message="Fetching your questions..." />
        )}
        {state.status === 'error' && (
          <ErrorScreen
            message={quizError ?? 'The quiz could not be loaded. Please try again.'}
            onRetry={handleRestart}
          />
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
            onPlayAgain={handleRestart}
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
