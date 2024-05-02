/**
 * @jest-environment jsdom
 */

import PdfDocumentMatcher from '../../../../src/lib/ui/uploadWidget/PdfDocumentMatcher'

describe('PdfDocumentMatcher', () => {
  describe('.match', () => {
    it(`
      if element is a link,
      the link contains an href attribute and
      href URL points to a PDF document,
      returns the element
    `,
    () => {
      const element = document.createElement('a')
      element.setAttribute('href', 'https://example.com/document.pdf')

      const matcher = new PdfDocumentMatcher(element)

      expect(matcher.match).toBe(element)
    })

    it(`
      if element is contained within a link element,
      that link contains an href attribute and
      href URL points to a PDF document,
      returns the element
    `,
    () => {
      const link = document.createElement('a')
      link.setAttribute('href', 'https://example.com/document.pdf')
      const element = document.createElement('div')
      link.appendChild(element)

      const matcher = new PdfDocumentMatcher(element)

      expect(matcher.match).toBe(link)
    })

    it(`
      if element is not contained within a link element,
      return nothing
    `,
    () => {
      const element = document.createElement('div')
      element.setAttribute('href', 'https://example.com/document.pdf')

      const matcher = new PdfDocumentMatcher(element)

      expect(matcher.match).toBeNull()
    })

    it(`
      if element is contained within a link element and
      that link contains no href attribute,
      returns nothing
    `,
    () => {
      const link = document.createElement('a')
      const element = document.createElement('div')
      link.appendChild(element)

      const matcher = new PdfDocumentMatcher(element)

      expect(matcher.match).toBeNull()
    })

    it(`
      if element is contained within a link element,
      that link contains an href attribute and
      href URL points to a document without PDF extension,
      returns nothing
    `,
    () => {
      const link = document.createElement('a')
      link.setAttribute('href', 'https://example.com/document.notapdf')
      const element = document.createElement('div')
      link.appendChild(element)

      const matcher = new PdfDocumentMatcher(element)

      expect(matcher.match).toBeNull()
    })
  })
})
