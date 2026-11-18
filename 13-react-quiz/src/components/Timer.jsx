import styles from './Timer.module.css'

function Timer({ seconds }) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const displayTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`

  return (
    <div className={styles.timer} aria-label={`${seconds} seconds remaining`}>
      <span className={styles.icon} aria-hidden="true">◷</span>
      <span>{displayTime}</span>
    </div>
  )
}

export default Timer
