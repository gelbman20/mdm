export const setLocalStorageItem = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value))
  } catch (e) {
    console.log('[setLocalStorageItem] error')
    return null
  }
}

export const getLocalStorageItem = (name) => {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch (e) {
    return null;
  }
}

export const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start)
}

export const limit = 10;
