export const useSessionStorage = (key: string): Function[] => {
  const getSessionStorage = () => {
    const session = sessionStorage.getItem(key)
    if (session != null) {
      return JSON.parse(session)
    }
    return null
  }
  const setSessionStorage = (item: Object) => {
    sessionStorage.setItem(key, JSON.stringify(item))
  }
  const removeSessionStorage = () => {
    return sessionStorage.removeItem(key)
  }
  return [getSessionStorage, setSessionStorage, removeSessionStorage]
}
