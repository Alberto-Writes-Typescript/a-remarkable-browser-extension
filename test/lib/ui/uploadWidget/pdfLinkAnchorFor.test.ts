/**
 * @jest-environment jsdom
 */

import pdfLinkAnchorFor from '../../../../src/lib/ui/uploadWidget/pdfLinkAnchorFor'

describe('pdfLinkAnchorFor', () => {
  it(`
      if element is a link,
      the link contains an href attribute and
      href URL points to a PDF document,
      returns the element
    `,
  () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'https://example.com/document.pdf')

    expect(pdfLinkAnchorFor(element)).toBe(element)
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

    expect(pdfLinkAnchorFor(element)).toBe(link)
  })

  it(`
      if element is not contained within a link element,
      return nothing
    `,
  () => {
    const element = document.createElement('div')
    element.setAttribute('href', 'https://example.com/document.pdf')

    expect(pdfLinkAnchorFor(element)).toBeNull()
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

    expect(pdfLinkAnchorFor(element)).toBeNull()
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

    expect(pdfLinkAnchorFor(element)).toBeNull()
  })
})
