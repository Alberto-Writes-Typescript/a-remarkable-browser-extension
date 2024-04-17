import { type DocumentReference } from 'a-remarkable-js-sdk'
import type { PlasmoMessaging } from '@plasmohq/messaging'
import Message from '../../lib/utils/Message'

export interface UploadMessageRequestPayload {
  name?: string
  webDocumentUrl: string
}

export interface UploadMessageResponsePayload {
  documentReference: DocumentReference
}

class PairMessage extends Message {
  protected async process (request: PlasmoMessaging.Request): Promise<UploadMessageResponsePayload> {
    const payload = request.body as UploadMessageRequestPayload
    const documentReference = await this.uploadManager.upload(
      payload.name ?? 'Untitled Document',
      payload.webDocumentUrl
    )
    return { documentReference }
  }
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const message = new PairMessage()
  await message.handle(request, response)
}

export default handler
