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
      this.#setAnchor(target as HTMLElement)
    }

    this.#detachAnchorCallback = ({ relatedTarget }) => {
      if (
        this.#currentAnchor != null &&
        !this.#currentAnchor.contains(relatedTarget as HTMLElement) &&
        !this.#inUploadWidgetWrapper(relatedTarget as HTMLElement)
      ) {
        this.#unsetAnchor()
      }
    }

    this.#viewport.addEventListener('mouseover', this.#attachAnchorCallback)
    this.#viewport.addEventListener('mouseout', this.#detachAnchorCallback)
  }

  get currentAnchor (): HTMLElement | null {
    return this.#currentAnchor
  }

  #setAnchor (element: HTMLElement): void {
    const newAnchor = this.#anchor(element)

    if (newAnchor != null) {
      this.#unsetAnchor()

      this.#currentAnchor = newAnchor
      this.#currentAnchor.id = UPLOAD_WIDGET_ANCHOR_ID
    }
  }

  #unsetAnchor (): void {
    this.#currentAnchor?.removeAttribute('id')
    this.#currentAnchor = null
  }

  #inUploadWidgetWrapper (element: HTMLElement): boolean {
    return new UploadWidgetMatcher(element).match != null
  }

  #anchor (element: HTMLElement): HTMLElement | null | undefined {
    return this.#matchers
      .map(Matcher => {
        const instance = new Matcher(element)
        return instance.match
      })
      .find(match => { return match != null })
  }
}
