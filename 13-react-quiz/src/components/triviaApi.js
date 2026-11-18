const CATEGORY_URL = 'https://opentdb.com/api_category.php'
const QUESTION_URL = 'https://opentdb.com/api.php'

const responseCodeMessages = {
  1: 'There are not enough questions for that category and difficulty. Try a different selection.',
  2: 'The question request contained an invalid option. Please try again.',
  3: 'The trivia session could not be found. Please try again.',
  4: 'The trivia session has run out of questions. Please try again.',
  5: 'The trivia service is busy. Wait a moment and try again.',
}

function decodeHtmlEntities(value) {
  const document = new DOMParser().parseFromString(value, 'text/html')
  return document.documentElement.textContent ?? ''
}

function shuffleAnswers(answers) {
  const shuffled = [...answers]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled
}

async function getJson(url, signal, requestName) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`${requestName} failed with HTTP ${response.status}. Please try again.`)
  }

  try {
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error(`${requestName} returned invalid data. Please try again.`, {
      cause: error,
    })
  }
}

export async function fetchCategories(signal) {
  const data = await getJson(CATEGORY_URL, signal, 'Loading categories')
  if (!Array.isArray(data.trivia_categories) || data.trivia_categories.length === 0) {
    throw new Error('The trivia service did not return any categories.')
  }

  return data.trivia_categories.map((category) => ({
    id: category.id,
    name: decodeHtmlEntities(category.name),
  }))
}

export async function fetchQuestions({ categoryId, difficulty, signal }) {
  const query = new URLSearchParams({
    amount: '10',
    category: String(categoryId),
    difficulty,
    type: 'multiple',
  })
  const data = await getJson(`${QUESTION_URL}?${query}`, signal, 'Loading questions')

  if (data.response_code !== 0) {
    throw new Error(
      responseCodeMessages[data.response_code]
        ?? `The trivia service returned error code ${data.response_code}. Please try again.`,
    )
  }
  if (!Array.isArray(data.results) || data.results.length === 0) {
    throw new Error('The trivia service did not return any questions.')
  }

  return data.results.map((result) => {
    if (!Array.isArray(result.incorrect_answers) || typeof result.correct_answer !== 'string') {
      throw new Error('The trivia service returned a question in an unexpected format.')
    }

    const correctAnswer = decodeHtmlEntities(result.correct_answer)
    const answers = shuffleAnswers([
      correctAnswer,
      ...result.incorrect_answers.map(decodeHtmlEntities),
    ])

    return {
      category: decodeHtmlEntities(result.category),
      difficulty: result.difficulty,
      prompt: decodeHtmlEntities(result.question),
      answers,
      correctAnswer,
    }
  })
}
