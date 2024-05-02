/**
 * @jest-environment jsdom
 */

import UploadWidgetMatcher, { PLASMO_OVERLAY_ID }
  from '../../../../src/lib/ui/uploadWidget/UploadWidgetMatcher'

describe('PdfDocumentMatcher', () => {
  describe('.match', () => {
    it(`
      if element has Plasmo overlay ID,
      returns the element
    `,
    () => {
      const element = document.createElement('div')
      element.setAttribute('id', PLASMO_OVERLAY_ID)

      const matcher = new UploadWidgetMatcher(element)

      expect(matcher.match).toBe(element)
    })

    it(`
      if element is contained within an element containing the Plasmo overlay ID,
      returns the element
    `,
    () => {
      const element = document.createElement('div')
      element.setAttribute('id', PLASMO_OVERLAY_ID)
      const childElement = document.createElement('div')
      element.appendChild(childElement)

      const matcher = new UploadWidgetMatcher(element)

      expect(matcher.match).toBe(element)
    })

    it(`
      if element is not contained within an element containing the Plasmo overlay ID,
      return nothing
    `,
    () => {
      const element = document.createElement('div')

      const matcher = new UploadWidgetMatcher(element)

      expect(matcher.match).toBeNull()
    })
  })
})
