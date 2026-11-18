import { useCallback, useRef, useState } from 'react'

function readStoredValue(key, initialValue) {
  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue === null ? initialValue : JSON.parse(storedValue)
  } catch (error) {
    console.error(`Could not read "${key}" from local storage.`, error)
    return initialValue
  }
}

function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue))
  const valueRef = useRef(value)

  const updateValue = useCallback((nextValue) => {
    const resolvedValue = typeof nextValue === 'function'
      ? nextValue(valueRef.current)
      : nextValue

    valueRef.current = resolvedValue
    setValue(resolvedValue)

    try {
      window.localStorage.setItem(key, JSON.stringify(resolvedValue))
    } catch (error) {
      console.error(`Could not save "${key}" to local storage.`, error)
    }
  }, [key])

  return [value, updateValue]
}

export default useLocalStorageState
