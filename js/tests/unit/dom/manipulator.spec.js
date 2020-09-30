import Manipulator from '../../../src/dom/manipulator'

/** Test helpers */
import { getFixture, clearFixture } from '../../helpers/fixture'

describe('Manipulator', () => {
  let fixtureEl

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  describe('setDataAttribute', () => {
    it('should set data attribute', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')

      Manipulator.setDataAttribute(div, 'key', 'value')
      expect(div.getAttribute('data-key')).toEqual('value')
    })

    it('should set data attribute in kebab case', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')

      Manipulator.setDataAttribute(div, 'testKey', 'value')
      expect(div.getAttribute('data-test-key')).toEqual('value')
    })
  })

  describe('removeDataAttribute', () => {
    it('should remove data attribute', () => {
      fixtureEl.innerHTML = '<div data-key="value"></div>'

      const div = fixtureEl.querySelector('div')

      Manipulator.removeDataAttribute(div, 'key')
      expect(div.getAttribute('data-key')).toBeNull()
    })

    it('should remove data attribute in kebab case', () => {
      fixtureEl.innerHTML = '<div data-test-key="value"></div>'

      const div = fixtureEl.querySelector('div')

      Manipulator.removeDataAttribute(div, 'testKey')
      expect(div.getAttribute('data-test-key')).toBeNull()
    })
  })

  describe('getDataAttributes', () => {
    it('should return empty object for null', () => {
      expect(Manipulator.getDataAttributes(null)).toEqual({})
      expect().nothing()
    })

    it('should get all data attributes', () => {
      fixtureEl.innerHTML = '<div data-test="js" data-test2="js2" ></div>'

      const div = fixtureEl.querySelector('div')

      expect(Manipulator.getDataAttributes(div)).toEqual({
        test: 'js',
        test2: 'js2'
      })
    })
  })

  describe('getDataAttribute', () => {
    it('should get data attribute', () => {
      fixtureEl.innerHTML = '<div data-test="null" ></div>'

      const div = fixtureEl.querySelector('div')

      expect(Manipulator.getDataAttribute(div, 'test')).toBeNull()
    })

    it('should get data attribute in kebab case', () => {
      fixtureEl.innerHTML = '<div data-test-key="value" ></div>'

      const div = fixtureEl.querySelector('div')

      expect(Manipulator.getDataAttribute(div, 'testKey')).toEqual('value')
    })

    it('should normalize data', () => {
      fixtureEl.innerHTML = '<div data-test="false" ></div>'

      const div = fixtureEl.querySelector('div')

      expect(Manipulator.getDataAttribute(div, 'test')).toEqual(false)

      div.setAttribute('data-test', 'true')
      expect(Manipulator.getDataAttribute(div, 'test')).toEqual(true)

      div.setAttribute('data-test', '1')
      expect(Manipulator.getDataAttribute(div, 'test')).toEqual(1)
    })
  })

  describe('offset', () => {
    it('should return object with two properties top and left, both numbers', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')
      const offset = Manipulator.offset(div)

      expect(offset).toBeDefined()
      expect(offset.top).toEqual(jasmine.any(Number))
      expect(offset.left).toEqual(jasmine.any(Number))
    })
  })

  describe('position', () => {
    it('should return object with two properties top and left, both numbers', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')
      const position = Manipulator.position(div)

      expect(position).toBeDefined()
      expect(position.top).toEqual(jasmine.any(Number))
      expect(position.left).toEqual(jasmine.any(Number))
    })
  })

  describe('applyCss', () => {
    const parseCssText = cssText => cssText.split(';')
      .filter(rule => rule.length)
      .reduce((reducedCss, rule) => {
        const [property, value] = rule.split(':')
          .map(item => item.trim())

        return {
          ...reducedCss,
          [property]: value
        }
      }, {})

    it('should not error out if element is null or undefined', () => {
      Manipulator.applyCss(null, {})
      Manipulator.applyCss(undefined, {})
      expect().nothing()
    })

    it('should apply given css', () => {
      fixtureEl.innerHTML = '<div></div>'

      const div = fixtureEl.querySelector('div')
      const expected = { top: '10px', left: '30px' }

      Manipulator.applyCss(div, expected)
      expect(parseCssText(div.style.cssText)).toEqual(expected)
    })

    it('should keep existing css', () => {
      fixtureEl.innerHTML = '<div style="background-color: white"></div>'

      const div = fixtureEl.querySelector('div')
      const expected = {
        'background-color': 'white',
        top: '10px',
        left: '30px'
      }

      Manipulator.applyCss(div, { top: '10px', left: '30px' })
      expect(parseCssText(div.style.cssText)).toEqual(expected)
    })

    it('should reset css', () => {
      fixtureEl.innerHTML = '<div style="top: 10px; left: 50px; position: absolute;"></div>'

      const div = fixtureEl.querySelector('div')
      const expected = {}

      Manipulator.applyCss(div, { top: '', left: '', position: '' })
      expect(parseCssText(div.style.cssText)).toEqual(expected)
    })
  })
})
