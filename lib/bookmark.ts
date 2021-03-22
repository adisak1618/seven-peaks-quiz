export const JSONparse = (str: any): any => {
  try {
    return JSON.parse(str)
  } catch (error) {
    return null
  }
}

export const getJsonArray = () => {
  const bookmarkRaw = localStorage.getItem("bookmark")
  return JSONparse(bookmarkRaw) as any
}