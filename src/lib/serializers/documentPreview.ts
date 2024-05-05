import DocumentPreview from '../models/DocumentPreview'

export interface SerializedDocumentPreview {
  url: string
  size: number
}

export function serialize (documentPreview: DocumentPreview): SerializedDocumentPreview {
  return {
    url: documentPreview.url,
    size: documentPreview.size
  }
}

export function deserialize (documentPreviewPayload: SerializedDocumentPreview): DocumentPreview {
  return new DocumentPreview(documentPreviewPayload.url, documentPreviewPayload.size)
}
