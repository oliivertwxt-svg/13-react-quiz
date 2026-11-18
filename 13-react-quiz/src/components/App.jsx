import { useState } from 'react'
import sampleQuestions from './sampleQuestions.js'
import ResultScreen from './ResultScreen.jsx'
import StartScreen from './StartScreen.jsx'
import Question from './Question.jsx'
import styles from './App.module.css'

function App() {
  const [screen, setScreen] = useState('start')
  const question = sampleQuestions[0]

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a
          className={styles.brand}
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            setScreen('start')
          }}
          aria-label="Little Quiz Club home"
        >
          <span className={styles.brandIcon} aria-hidden="true">✳</span>
          <span>little quiz club</span>
        </a>
        <span className={styles.headerNote}>A little brain break, anyone?</span>
      </header>

      <div className={styles.content}>
        {screen === 'start' && (
          <StartScreen onStart={() => setScreen('quiz')} />
        )}
        {screen === 'quiz' && (
          <Question
            question={question}
            currentQuestion={1}
            totalQuestions={sampleQuestions.length}
            onFinish={() => setScreen('results')}
          />
        )}
        {screen === 'results' && (
          <ResultScreen
            score={0}
            total={sampleQuestions.length}
            onPlayAgain={() => setScreen('start')}
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
