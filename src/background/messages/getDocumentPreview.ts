import type { PlasmoMessaging } from '@plasmohq/messaging'
import DocumentPreview from '../../lib/models/DocumentPreview'
import Message from '../../lib/utils/Message'

export interface GetDocumentPreviewMessageRequestPayload {
  url: string
}

export interface GetDocumentPreviewMessageResponsePayload {
  documentPreview: DocumentPreview
}

class GetDocumentPreviewMessage extends Message {
  protected async process (request: PlasmoMessaging.Request): Promise<GetDocumentPreviewMessageResponsePayload> {
    const payload = request.body as GetDocumentPreviewMessageRequestPayload
    const documentPreview = await DocumentPreview.from(payload.url)
    return { documentPreview }
  }
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const message = new GetDocumentPreviewMessage()
  await message.handle(request, response)
}

export default handler
