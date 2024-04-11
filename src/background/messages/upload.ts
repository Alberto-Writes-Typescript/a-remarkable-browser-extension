import type { PlasmoMessaging } from '@plasmohq/messaging'

export interface UploadMessagePayload {
  url: string
}

/**
 * Web document upload message handler
 *
 * @param request
 * @param response
 */
const uploadMessage: PlasmoMessaging.MessageHandler = async (
  request: PlasmoMessaging.Request<string, UploadMessagePayload>,
  response: PlasmoMessaging.Response
) => {
  console.log('cacahuesería')

  const message = { received: true }

  response.send({ message })
}

export default uploadMessage
