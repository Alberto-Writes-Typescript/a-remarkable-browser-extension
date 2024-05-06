import type { PlasmoGetOverlayAnchor } from 'plasmo'
import React, { useEffect, useRef, useState } from 'react'

import DocumentPreview from '../lib/models/DocumentPreview'
import MessageManager from '../lib/services/MessageManager'
import UploadButton from '../components/contents/uploadButton'
import styleText from 'data-text:../../assets/css/style.css'
import { UPLOAD_WIDGET_ANCHOR_ID } from '../lib/ui/uploadWidget/AnchorTrackingManager'

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

  async function uploadDocument (fileName: string, url: string): Promise<void> {
    await MessageManager.sendUploadMessage(fileName, url)
  }

  const widgetWrapperRef = useRef<HTMLDivElement>(null)
  const widgetButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchDocumentPreview (): Promise<void> {
      const documentPreviewResponse = await MessageManager.sendGetDocumentPreviewMessage(element.href as string)
      const { url, size } = documentPreviewResponse

      setDocumentPreview(new DocumentPreview(url, size))
    }

    void fetchDocumentPreview().then(r => {})
  }, [])

  useEffect(() => {
    const widgetWrapper = widgetWrapperRef.current
    const widgetButton = widgetButtonRef.current

    // Updates widget wrapper to match the anchor element's position
    if (widgetWrapper != null) widgetWrapper.style.width = `${element.offsetWidth}px`

    // Update button wrapper to position it around the widget wrapper
    if (widgetButton != null) widgetButton.style.marginLeft = `${element.offsetWidth}px`
  })

  return (
    <div ref={widgetWrapperRef} className={ `relative pointer-events-none animate-all ${documentPreview != null ? 'opacity-1' : 'hidden'}` }>
      <div ref={widgetButtonRef} className="pl-3 pointer-events-auto">
        {documentPreview != null && <UploadButton documentPreview={documentPreview} uploadDocument={uploadDocument}/>}
      </div>
    </div>
  )
}
