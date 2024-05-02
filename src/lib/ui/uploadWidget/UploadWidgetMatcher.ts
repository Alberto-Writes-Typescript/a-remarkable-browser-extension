export const PLASMO_OVERLAY_ID = 'plasmo-shadow-container'

/**
 * Special Matcher, used to detect items within the upload widget UI.
 *
 * While other matches search for anchor elements to attache the
 * upload widget to, this matcher searches for upload widget elements
 * to not hide the widget when the user interacts with it.
 */
export default class UploadWidgetMatcher {
  static matchingId = PLASMO_OVERLAY_ID

  element: HTMLElement

  constructor (element: HTMLElement) {
    this.element = element
  }

  get match (): HTMLElement | null {
    return this.element.closest(`#${UploadWidgetMatcher.matchingId}`)
  }
}
