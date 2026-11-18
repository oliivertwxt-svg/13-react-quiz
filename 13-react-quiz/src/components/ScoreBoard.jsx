import styles from './ScoreBoard.module.css'

function ScoreBoard({ score, total }) {
  return (
    <div className={styles.score}>
      <span className={styles.star} aria-hidden="true">★</span>
      <span className={styles.label}>SCORE</span>
      <strong>{score}<span>/{total}</span></strong>
    </div>
  )
}

export default ScoreBoard
