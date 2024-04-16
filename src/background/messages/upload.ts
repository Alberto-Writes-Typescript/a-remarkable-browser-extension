import ConnectionManager from '../../lib/ConnectionManager'
import UploadManager from '../../lib/fileTransfer/UploadManager'
import type { PlasmoMessaging } from '@plasmohq/messaging'
import { type DocumentReference } from 'a-remarkable-js-sdk'

export interface UploadMessageRequestPayload {
  webDocumentUrl: string
}

export interface UploadMessageResponsePayload {
  documentReference: DocumentReference
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const payload = request.body as UploadMessageRequestPayload

  const connectionManager = new ConnectionManager()

  const uploadManager = new UploadManager(
    // @ts-expect-error - Expected
    await connectionManager.deviceToken()
  )

  const documentReference = await uploadManager.upload(
    'debugUploadDocument',
    payload.webDocumentUrl
  )

  response.send({ documentReference } satisfies UploadMessageResponsePayload)
}

export default handler
