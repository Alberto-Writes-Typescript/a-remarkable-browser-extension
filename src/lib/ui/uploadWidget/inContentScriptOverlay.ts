export const PLASMO_OVERLAY_TAG = 'plasmo-csui'

export default function inContentScriptOverlay (element: HTMLElement): boolean {
  return element.closest(PLASMO_OVERLAY_TAG) != null
}
