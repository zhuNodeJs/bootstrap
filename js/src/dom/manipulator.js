/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha2): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(val) {
  if (val === 'true') {
    return true
  }

  if (val === 'false') {
    return false
  }

  if (val === Number(val).toString()) {
    return Number(val)
  }

  if (val === '' || val === 'null') {
    return null
  }

  return val
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`)
}

const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-${normalizeDataKey(key)}`, value)
  },

  removeDataAttribute(element, key) {
    element.removeAttribute(`data-${normalizeDataKey(key)}`)
  },

  getDataAttributes(element) {
    if (!element) {
      return {}
    }

    const attributes = {
      ...element.dataset
    }

    Object.keys(attributes).forEach(key => {
      attributes[key] = normalizeData(attributes[key])
    })

    return attributes
  },

  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-${normalizeDataKey(key)}`))
  },

  offset(element) {
    const rect = element.getBoundingClientRect()

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  },

  position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    }
  },

  applyCss(element, cssObject) {
    if (!element) {
      return
    }

    const existingStyle = element.style.cssText.split(';')
      .filter(rule => rule.length)
      .reduce((reducedCss, rule) => {
        const [property, value] = rule.split(':')
          .map(item => item.trim())

        return {
          ...reducedCss,
          [property]: value
        }
      }, {})

    const cssToApply = {
      ...existingStyle,
      ...cssObject
    }

    element.style.cssText = Object.keys(cssToApply)
      .map(objKey => `${objKey}: ${cssToApply[objKey]};`)
      .join(' ')
  }
}

export default Manipulator
