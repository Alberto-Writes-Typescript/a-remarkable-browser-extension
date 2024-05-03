import { sendToBackground } from '@plasmohq/messaging'
import type { PlasmoGetOverlayAnchor } from 'plasmo'
import React, { useEffect, useRef, useState } from 'react'

import DocumentPreview from '../lib/models/DocumentPreview'
import type { GetDocumentPreviewMessageResponsePayload } from '../background/messages/getDocumentPreview'
import { UPLOAD_WIDGET_ANCHOR_ID } from '../lib/ui/uploadWidget/MouseTracker'
import UploadButton from '../components/contents/uploadButton'

import styleText from 'data-text:../../assets/css/style.css'

export const getStyle = (): HTMLElement => {
  const style = document.createElement('style')
  style.textContent = styleText
  return style
}

// @ts-expect-error - Expected Error
export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => {
  return document.querySelector(`#${UPLOAD_WIDGET_ANCHOR_ID}`)
}

export default function UploadWidget ({ anchor: { element } }): React.ReactElement {
  const [documentPreview, setDocumentPreview] = useState<DocumentPreview | undefined>(undefined)
  const widgetWrapperRef = useRef<HTMLDivElement>(null)
  const widgetButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchDocumentPreview (): Promise<void> {
      const documentPreviewResponse: GetDocumentPreviewMessageResponsePayload =
        await sendToBackground(
          {
            name: 'getDocumentPreview',
            body: { url: element.href },
            extensionId: 'egdpalgnbmgehpebjmkklcfkggadmglp'
          }
        )

      const { url, size } = documentPreviewResponse

      setDocumentPreview(new DocumentPreview(url, size))
    }

    void fetchDocumentPreview().then(r => {})
  }, [])

  useEffect(() => {
    const widgetWrapper = widgetWrapperRef.current as HTMLDivElement
    const widgetButton = widgetButtonRef.current as HTMLDivElement

    // Updates widget wrapper to match the anchor element's position
    widgetWrapper.style.width = `${element.offsetWidth}px`

    // Update button wrapper to position it around the widget wrapper
    widgetButton.style.marginLeft = `${element.offsetWidth}px`
  })

  return (
    <div ref={widgetWrapperRef} className={ `relative pointer-events-none animate-all ${documentPreview != null ? 'opacity-1' : 'hidden'}` }>
      <div ref={widgetButtonRef} className="pl-3 pointer-events-auto">
        <UploadButton documentPreview={documentPreview}/>
      </div>
    </div>
  )
}
