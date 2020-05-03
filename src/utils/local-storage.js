const prefix = 'gto'

export const clearState = () => {
  try {
    localStorage.removeItem(`${prefix}.state`)
  } catch {
    // ignore clear errors
  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(`${prefix}.state`)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(`${prefix}.state`, serializedState)
  } catch {
    // ignore write errors
  }
}
