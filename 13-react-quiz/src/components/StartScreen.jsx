import styles from './StartScreen.module.css'

function StartScreen({ onStart }) {
  function handleSubmit(event) {
    event.preventDefault()
    onStart()
  }

  return (
    <section className={styles.card} aria-labelledby="welcome-title">
      <div className={styles.illustration} aria-hidden="true">
        <span className={styles.sun}>✦</span>
        <span className={styles.bubble}>?</span>
        <span className={styles.sparkle}>✳</span>
        <span className={styles.smile}>☺</span>
      </div>

      <p className={styles.eyebrow}>YOUR DAILY DOSE OF AHA!</p>
      <h1 id="welcome-title" className={styles.title}>
        Ready to give your<br />brain a <span>little stretch?</span>
      </h1>
      <p className={styles.description}>
        Pick your vibe, then see what you know. No pressure, just fun.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span className={styles.label}>I&apos;m in the mood for</span>
          <select name="category" defaultValue="Mixed bag">
            <option>Mixed bag</option>
            <option>Nature</option>
            <option>Science</option>
            <option>Pop culture</option>
            <option>Geography</option>
            <option>Food</option>
          </select>
        </label>

        <div className={styles.fieldRow}>
          <label className={styles.field}>
            <span className={styles.label}>Make it</span>
            <select name="difficulty" defaultValue="Easy peasy">
              <option>Easy peasy</option>
              <option>Getting curious</option>
              <option>Brain bender</option>
            </select>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>A quick</span>
            <select name="questionCount" defaultValue="5 questions">
              <option>5 questions</option>
              <option>10 questions</option>
              <option>15 questions</option>
            </select>
          </label>
        </div>

        <button className={styles.startButton} type="submit">
          Let&apos;s play <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className={styles.trustNote}>
        <span aria-hidden="true">✿</span> Just you, your brain &amp; a good time
      </div>
    </section>
  )
}

export default StartScreen
