const PLASMO_OVERLAY_TAG = 'plasmo-csui'

/**
 * Special Matcher, used to detect items within the upload widget UI.
 *
 * While other matches search for anchor elements to attache the
 * upload widget to, this matcher searches for upload widget elements
 * to not hide the widget when the user interacts with it.
 */
export default class UploadWidgetMatcher {
  static matchingTagName = PLASMO_OVERLAY_TAG

  element: HTMLElement

  constructor (element: HTMLElement) {
    this.element = element
  }

  get match (): HTMLElement | null {
    return this.element.closest(UploadWidgetMatcher.matchingTagName)
  }
}
