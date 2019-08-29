export const addClass = (element, ...classNameList) => {
  element.classList.add(...classNameList)
}

export const removeClass = (element, ...classNameList) => {
  element.classList.remove(...classNameList)
}

export const hasClass = (element, className) => {
  return element.classList.contains(className)
}

export const toggleClass = (element, className) => {
  return element.classList.toggle(className)
}
