import styles from './ResultScreen.module.css'

function ResultScreen({ score, total, onPlayAgain }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <section className={styles.card} aria-labelledby="result-title">
      <div className={styles.medal} aria-hidden="true">
        <span>✦</span>
        <strong>★</strong>
      </div>
      <p className={styles.eyebrow}>THAT&apos;S A WRAP!</p>
      <h1 id="result-title">Curiosity looks<br />good on you.</h1>
      <p className={styles.message}>Every question is a chance to learn something new.</p>

      <div className={styles.scorePanel}>
        <span className={styles.scoreLabel}>YOUR SCORE</span>
        <strong>{score}<span> / {total}</span></strong>
        <span className={styles.percentage}>{percentage}% curious</span>
      </div>

      <button className={styles.playButton} type="button" onClick={onPlayAgain}>
        Play another round <span aria-hidden="true">↗</span>
      </button>
      <p className={styles.footnote}>The best part? There&apos;s always more to discover.</p>
    </section>
  )
}

export default ResultScreen
