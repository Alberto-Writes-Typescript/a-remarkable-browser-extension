/**
 * @jest-environment jsdom
 */

import { fireEvent } from '@testing-library/dom'
import AnchorTrackingManager from '../../../../src/lib/ui/uploadWidget/AnchorTrackingManager'
import { PLASMO_OVERLAY_TAG } from '../../../../src/lib/ui/uploadWidget/inContentScriptOverlay'

describe('anchorTracker', () => {
  let anchorTracker: AnchorTrackingManager
  let element: HTMLElement
  let viewport: HTMLElement

  beforeEach(() => {
    viewport = document.createElement('div')

    element = document.createElement('a')
    element.setAttribute('href', 'https://example.com/document.pdf')

    viewport.appendChild(element)

    anchorTracker = new AnchorTrackingManager(viewport)
  })

  it('if mouse is over matching element, set element as anchor', () => {
    fireEvent.mouseOver(element)

    expect(anchorTracker.currentAnchor).toBe(element)
  })

  it('if mouse leaves anchor element, unset element as anchor', () => {
    const otherElement = document.createElement('div')
    viewport.appendChild(element)

    fireEvent.mouseOver(element)

    expect(anchorTracker.currentAnchor).toBe(element)

    fireEvent.mouseOut(element, { relatedTarget: otherElement })

    expect(anchorTracker.currentAnchor).toBeNull()
  })

  it('if mouse leaves anchor element and enters to the upload widget simultaneously, anchor remains', () => {
    const uploadWidgetWrapper = document.createElement(PLASMO_OVERLAY_TAG)
    viewport.appendChild(uploadWidgetWrapper)

    const uploadWidgetHoverableElement = document.createElement('div')
    uploadWidgetWrapper.appendChild(uploadWidgetHoverableElement)

    fireEvent.mouseOver(element)

    expect(anchorTracker.currentAnchor).toBe(element)

    fireEvent.mouseOut(element, { relatedTarget: uploadWidgetHoverableElement })
    fireEvent.mouseOver(uploadWidgetHoverableElement)

    expect(anchorTracker.currentAnchor).toBe(element)

    fireEvent.mouseOut(element, { relatedTarget: document.createElement('div') })

    expect(anchorTracker.currentAnchor).toBeNull()

    // We repeat the test, this time triggering the mouseOver event before the mouseOut event
    fireEvent.mouseOver(element)

    expect(anchorTracker.currentAnchor).toBe(element)

    fireEvent.mouseOver(uploadWidgetHoverableElement)
    fireEvent.mouseOut(element, { relatedTarget: uploadWidgetHoverableElement })

    expect(anchorTracker.currentAnchor).toBe(element)
  })
})
