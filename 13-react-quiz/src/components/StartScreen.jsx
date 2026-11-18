import styles from './StartScreen.module.css'

function StartScreen({ ready, questionCount, highscore, onStart }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onStart({
      category: formData.get('category'),
      difficulty: formData.get('difficulty'),
      questionCount: formData.get('questionCount'),
    })
  }

  return (
    <section className={styles.card} aria-labelledby="welcome-title">
      <div className={styles.illustration} aria-hidden="true">
        <span className={styles.sun}>✦</span>
        <span className={styles.bubble}>?</span>
        <span className={styles.sparkle}>✳</span>
        <span className={styles.smile}>☺</span>
      </div>

      {ready ? (
        <>
          <p className={styles.eyebrow}>YOUR DAILY DOSE OF AHA!</p>
          <h1 id="welcome-title" className={styles.title}>
            Your quiz is<br /><span>ready to go!</span>
          </h1>
          <p className={styles.description}>
            We found {questionCount} {questionCount === 1 ? 'question' : 'questions'} for your brain break.
          </p>
          <button
            className={styles.startButton}
            type="button"
            onClick={() => onStart()}
          >
            Start quiz <span aria-hidden="true">→</span>
          </button>
        </>
      ) : (
        <>
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
                <select name="difficulty" defaultValue="Any difficulty">
                  <option>Any difficulty</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>A quick</span>
                <select name="questionCount" defaultValue="5">
                  <option value="5">5 questions</option>
                  <option value="10">10 questions</option>
                  <option value="15">15 questions</option>
                </select>
              </label>
            </div>

            <button className={styles.startButton} type="submit">
              Find my quiz <span aria-hidden="true">→</span>
            </button>
          </form>
        </>
      )}

      <div className={styles.trustNote}>
        <span aria-hidden="true">✿</span>{' '}
        {highscore > 0
          ? `Best score so far: ${highscore}`
          : 'Just you, your brain & a good time'}
      </div>
    </section>
  )
}

export default StartScreen
