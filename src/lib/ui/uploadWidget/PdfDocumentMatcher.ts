export default class PdfDocumentMatcher {
  static matchingTagNames = ['a']
  static matchingAttribute = 'href'
  static matchingUrlRegex = /.*\.pdf$/

  element: HTMLElement

  constructor (element: HTMLElement) {
    this.element = element
  }

  get match (): HTMLElement | null {
    const matchingCandidates =
      PdfDocumentMatcher.matchingTagNames
        .map(tagName => { return this.element.closest(tagName) })
        .filter(element => element != null) as HTMLElement[]

    const matches = matchingCandidates
      .filter(element => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const url = element.getAttribute(PdfDocumentMatcher.matchingAttribute)!
        return PdfDocumentMatcher.matchingUrlRegex.test(url)
      })

    if (matches.length === 0) return null

    return matches[0]
  }
}
