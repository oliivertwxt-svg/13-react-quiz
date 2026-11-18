import styles from './ErrorScreen.module.css'

function ErrorScreen({ title = 'We couldn’t load your quiz', message, onRetry }) {
  return (
    <section className={styles.card} role="alert">
      <span className={styles.icon} aria-hidden="true">!</span>
      <p className={styles.eyebrow}>A LITTLE HICCUP</p>
      <h1>{title}</h1>
      <p className={styles.message}>{message}</p>
      <button className={styles.button} type="button" onClick={onRetry}>
        Try again <span aria-hidden="true">→</span>
      </button>
    </section>
  )
}

export default ErrorScreen
