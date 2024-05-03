import { sendToBackground } from '@plasmohq/messaging'
import type { PlasmoGetOverlayAnchor } from 'plasmo'
import React, { useEffect, useState } from 'react'

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

  return (
    <div>
      <UploadButton documentPreview={documentPreview}/>
    </div>
  )
}
