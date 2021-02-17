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

export const transformStringToArray = (string) => {
  if (Array.isArray(string)) return string
  return string.split(',')
}

export const transformErrors = (obj) => {
  return Object.keys(obj).map((key) => {
    return `${key}: ${obj[key].join(', ')}`
  })
}

export const limit = 10;
