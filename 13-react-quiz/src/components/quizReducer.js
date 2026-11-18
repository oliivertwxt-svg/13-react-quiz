export const initialQuizState = {
  status: 'idle',
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: 15,
  highscore: 0,
}

function finishQuiz(state) {
  return {
    ...state,
    status: 'finished',
    highscore: Math.max(state.highscore, state.points),
  }
}

export function quizReducer(state, action) {
  switch (action.type) {
    case 'start':
      if (state.status === 'ready') {
        return { ...state, status: 'active', secondsRemaining: 15 }
      }

      if (!['idle', 'error', 'finished'].includes(state.status)) return state

      return {
        ...initialQuizState,
        status: 'loading',
        highscore: state.highscore,
      }

    case 'dataReceived':
      if (state.status !== 'loading') return state
      if (!Array.isArray(action.payload) || action.payload.length === 0) {
        return { ...state, status: 'error' }
      }
      return { ...state, status: 'ready', questions: action.payload }

    case 'dataFailed':
      if (state.status !== 'loading') return state
      return { ...state, status: 'error' }

    case 'newAnswer': {
      if (state.status !== 'active' || state.answer) return state
      const question = state.questions[state.index]
      if (!question?.answers.includes(action.payload)) return state

      const isCorrect = action.payload === question.correctAnswer
      return {
        ...state,
        answer: { selected: action.payload, isCorrect },
        points: state.points + Number(isCorrect),
      }
    }

    case 'nextQuestion':
      if (state.status !== 'active' || !state.answer) return state
      if (state.index === state.questions.length - 1) return finishQuiz(state)
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        secondsRemaining: 15,
      }

    case 'finish':
      if (state.status !== 'active') return state
      return finishQuiz(state)

    case 'restart':
      return { ...initialQuizState, highscore: state.highscore }

    case 'tick':
      if (state.status !== 'active' || state.answer) return state
      if (state.secondsRemaining <= 1) {
        return { ...finishQuiz(state), secondsRemaining: 0 }
      }
      return { ...state, secondsRemaining: state.secondsRemaining - 1 }

    default:
      throw new Error(`Unknown quiz action: ${action.type}`)
  }
}
