import type { PlasmoMessaging } from '@plasmohq/messaging'

import * as DocumentPreviewSerializer from '../../lib/serializers/documentPreview'
import DocumentPreview from '../../lib/models/DocumentPreview'
import Message from '../../lib/utils/Message'
import * as ErrorSerializer from '../../lib/serializers/error'
import { type SerializedError } from '../../lib/serializers/error'

export interface GetDocumentPreviewMessageRequestPayload {
  url: string
}

export interface GetDocumentPreviewMessageResponsePayload {
  url: string
  size: number
}

class GetDocumentPreviewMessage extends Message {
  protected async process (request: PlasmoMessaging.Request): Promise<GetDocumentPreviewMessageResponsePayload | SerializedError> {
    const payload = request.body as GetDocumentPreviewMessageRequestPayload

    try {
      const documentPreview = await DocumentPreview.from(payload.url)
      return DocumentPreviewSerializer.serialize(documentPreview)
    } catch (error) {
      return ErrorSerializer.serialize(error as Error)
    }
  }
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const message = new GetDocumentPreviewMessage()
  await message.handle(request, response)
}

export default handler
