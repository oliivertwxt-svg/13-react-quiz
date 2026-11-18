import ProgressBar from './ProgressBar.jsx'
import ScoreBoard from './ScoreBoard.jsx'
import Timer from './Timer.jsx'
import styles from './Question.module.css'

function Question({ question, currentQuestion, totalQuestions, onFinish }) {
  return (
    <section className={styles.card} aria-labelledby="question-title">
      <div className={styles.topline}>
        <span className={styles.category}>{question.category}</span>
        <div className={styles.stats}>
          <ScoreBoard score={0} total={totalQuestions} />
          <Timer seconds={30} />
        </div>
      </div>

      <div className={styles.progressLabel}>
        <span>Question {String(currentQuestion).padStart(2, '0')}</span>
        <span>{String(totalQuestions).padStart(2, '0')}</span>
      </div>
      <ProgressBar current={currentQuestion} total={totalQuestions} />

      <div className={styles.questionBody}>
        <p className={styles.eyebrow}>
          {question.difficulty} <span aria-hidden="true">·</span> TRUST YOUR GUT
        </p>
        <h1 id="question-title">{question.prompt}</h1>
        <p className={styles.instruction}>Choose one answer</p>

        <div className={styles.answers} role="radiogroup" aria-label="Answer choices">
          {question.answers.map((answer, index) => (
            <label className={styles.answer} key={answer}>
              <input
                type="radio"
                name="answer"
                value={answer}
                aria-label={`${String.fromCharCode(65 + index)}. ${answer}`}
              />
              <span className={styles.answerContent}>
                <span className={styles.letter}>{String.fromCharCode(65 + index)}</span>
                <span>{answer}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.bottomline}>
        <span className={styles.encouragement}>
          <span aria-hidden="true">✦</span> You&apos;ve got this!
        </span>
        <button className={styles.nextButton} type="button" onClick={onFinish}>
          Finish quiz <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default Question
