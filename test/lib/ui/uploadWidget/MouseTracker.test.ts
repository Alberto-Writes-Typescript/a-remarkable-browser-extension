/**
 * @jest-environment jsdom
 */

import { fireEvent } from '@testing-library/dom'
import MouseTracker from '../../../../src/lib/ui/uploadWidget/MouseTracker'
import UploadWidgetMatcher from '../../../../src/lib/ui/uploadWidget/UploadWidgetMatcher'

describe('MouseTracker', () => {
  let element: HTMLElement
  let mouseTracker: MouseTracker
  let viewport: HTMLElement

  beforeEach(() => {
    viewport = document.createElement('div')

    element = document.createElement('a')
    element.setAttribute('href', 'https://example.com/document.pdf')

    viewport.appendChild(element)

    mouseTracker = new MouseTracker(viewport)
  })

  it('if mouse is over matching element, set element as anchor', () => {
    fireEvent.mouseOver(element)

    expect(mouseTracker.currentAnchor).toBe(element)
  })

  it('if mouse leaves anchor element, unset element as anchor', () => {
    const otherElement = document.createElement('div')
    viewport.appendChild(element)

    fireEvent.mouseOver(element)

    expect(mouseTracker.currentAnchor).toBe(element)

    fireEvent.mouseOut(element, { relatedTarget: otherElement })

    expect(mouseTracker.currentAnchor).toBeNull()
  })

  it('if mouse leaves anchor element and enters to the upload widget simultaneously, anchor remains', () => {
    const uploadWidgetWrapper = document.createElement(UploadWidgetMatcher.matchingTagName)
    viewport.appendChild(uploadWidgetWrapper)

    const uploadWidgetHoverableElement = document.createElement('div')
    uploadWidgetWrapper.appendChild(uploadWidgetHoverableElement)

    fireEvent.mouseOver(element)

    expect(mouseTracker.currentAnchor).toBe(element)

    fireEvent.mouseOut(element, { relatedTarget: uploadWidgetHoverableElement })
    fireEvent.mouseOver(uploadWidgetHoverableElement)

    expect(mouseTracker.currentAnchor).toBe(element)

    fireEvent.mouseOut(element, { relatedTarget: document.createElement('div') })

    expect(mouseTracker.currentAnchor).toBeNull()

    // We repeat the test, this time triggering the mouseOver event before the mouseOut event
    fireEvent.mouseOver(element)

    expect(mouseTracker.currentAnchor).toBe(element)

    fireEvent.mouseOver(uploadWidgetHoverableElement)
    fireEvent.mouseOut(element, { relatedTarget: uploadWidgetHoverableElement })

    expect(mouseTracker.currentAnchor).toBe(element)
  })
})
