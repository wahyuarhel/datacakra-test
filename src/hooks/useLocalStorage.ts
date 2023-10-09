export const useLocalStorage = (key: string): Function[] => {
  const getLocalStorage = () => {
    const local = localStorage.getItem(key)
    if (local != null) {
      return JSON.parse(local)
    }
    return null
  }
  const setLocalStorage = (item: Object) => {
    localStorage.setItem(key, JSON.stringify(item))
  }
  const removeLocalStorage = () => {
    return localStorage.removeItem(key)
  }
  return [getLocalStorage, setLocalStorage, removeLocalStorage]
}
