import styles from './ProgressBar.module.css'

function ProgressBar({ current, total, progress }) {
  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-label="Quiz progress"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
    >
      <span className={styles.fill} style={{ width: `${progress}%` }} />
    </div>
  )
}

export default ProgressBar
