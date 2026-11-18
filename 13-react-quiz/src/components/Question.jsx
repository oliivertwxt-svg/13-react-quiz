import ProgressBar from './ProgressBar.jsx'
import ScoreBoard from './ScoreBoard.jsx'
import Timer from './Timer.jsx'
import styles from './Question.module.css'

function Question({
  question,
  currentQuestion,
  totalQuestions,
  progress,
  score,
  maxPoints,
  answer: answerState,
  secondsRemaining,
  onAnswer,
  onNext,
}) {
  return (
    <section className={styles.card} aria-labelledby="question-title">
      <div className={styles.topline}>
        <span className={styles.category}>{question.category}</span>
        <div className={styles.stats}>
          <ScoreBoard score={score} total={maxPoints} />
          <Timer seconds={secondsRemaining} />
        </div>
      </div>

      <div className={styles.progressLabel}>
        <span>Question {String(currentQuestion).padStart(2, '0')}</span>
        <span>{String(totalQuestions).padStart(2, '0')}</span>
      </div>
      <ProgressBar
        current={currentQuestion}
        total={totalQuestions}
        progress={progress}
      />

      <div className={styles.questionBody}>
        <p className={styles.eyebrow}>
          {question.difficulty} <span aria-hidden="true">·</span> TRUST YOUR GUT
        </p>
        <h1 id="question-title">{question.prompt}</h1>
        <p className={styles.instruction}>
          {answerState ? 'Press Enter or choose Next to continue' : 'Choose one answer · Press 1–4'}
        </p>

        <div className={styles.answers} role="group" aria-label="Answer choices">
          {question.answers.map((option, index) => {
            const isSelected = answerState?.selected === option
            const isCorrect = option === question.correctAnswer
            const isIncorrectSelection = isSelected && !answerState.isCorrect
            const answerClassName = [
              answerState && isCorrect && styles.correct,
              isIncorrectSelection && styles.incorrect,
            ].filter(Boolean).join(' ')

            return (
              <button
                className={`${styles.answer} ${answerClassName}`}
                key={option}
                type="button"
                aria-pressed={isSelected}
                aria-keyshortcuts={String(index + 1)}
                disabled={Boolean(answerState)}
                onClick={() => onAnswer(option)}
              >
                <span className={styles.letter}>{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
                {answerState && isCorrect && (
                  <span className={styles.answerFeedback}>Correct</span>
                )}
                {isIncorrectSelection && (
                  <span className={styles.answerFeedback}>Not quite</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <p className={styles.screenReaderOnly} role="status" aria-live="polite" aria-atomic="true">
        {answerState
          ? answerState.isCorrect
            ? 'Correct!'
            : `Incorrect. The correct answer is ${question.correctAnswer}.`
          : ''}
      </p>

      <div className={styles.bottomline}>
        <span className={styles.encouragement}>
          <span aria-hidden="true">✦</span>{' '}
          {answerState ? 'Answer locked in!' : 'You’ve got this!'}
        </span>
        {answerState && (
          <button className={styles.nextButton} type="button" onClick={onNext}>
            {currentQuestion === totalQuestions ? 'See results' : 'Next'}
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </section>
  )
}

export default Question
