import styles from './LoadingScreen.module.css'

function LoadingScreen({ message }) {
  return (
    <section className={styles.card} aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <h1>{message}</h1>
      <p>Just a moment while we get things ready.</p>
    </section>
  )
}

export default LoadingScreen
