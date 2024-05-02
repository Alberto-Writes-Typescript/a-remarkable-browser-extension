import PdfDocumentMatcher from './PdfDocumentMatcher'
import UploadWidgetMatcher from './UploadWidgetMatcher'

export const UPLOAD_WIDGET_ANCHOR_ID = 'upload-widget-anchor'

export default class MouseTracker {
  static defaultMatchers = [PdfDocumentMatcher]

  #currentAnchor: HTMLElement | null = null

  readonly #matchers = MouseTracker.defaultMatchers
  readonly #attachAnchorCallback: (event: MouseEvent) => void
  readonly #detachAnchorCallback: (event: MouseEvent) => void
  readonly #viewport: HTMLElement

  constructor (viewport: HTMLElement) {
    this.#viewport = viewport

    this.#attachAnchorCallback = ({ target }) => {
      if (this.#isAnchorCandidate(target as HTMLElement)) {
        this.#markAsAnchor(target as HTMLElement)
      }
    }

    this.#detachAnchorCallback = ({ relatedTarget }) => {
      if (
        !this.#isAnchorCandidate(relatedTarget as HTMLElement) &&
        !this.#inUploadWidgetWrapper(relatedTarget as HTMLElement)
      ) {
        this.#removeCurrentAnchor()
      }
    }

    this.#viewport.addEventListener('mouseover', this.#attachAnchorCallback)
    this.#viewport.addEventListener('mouseout', this.#detachAnchorCallback)
  }

  get currentAnchor (): HTMLElement | null {
    return this.#currentAnchor
  }

  #markAsAnchor (element: HTMLElement): void {
    this.#removeCurrentAnchor()

    this.#currentAnchor = element
    this.#currentAnchor.id = UPLOAD_WIDGET_ANCHOR_ID
  }

  #removeCurrentAnchor (): void {
    this.#currentAnchor?.removeAttribute('id')
    this.#currentAnchor = null
  }

  #inUploadWidgetWrapper (element: HTMLElement): boolean {
    return new UploadWidgetMatcher(element).match != null
  }

  #isAnchorCandidate (element: HTMLElement): boolean {
    return this.#matchers.some(Matcher => {
      const instance = new Matcher(element)
      return instance.match != null
    })
  }
}
