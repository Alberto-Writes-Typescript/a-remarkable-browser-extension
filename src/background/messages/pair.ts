import type { PlasmoMessaging } from '@plasmohq/messaging'
import Message from '../../lib/utils/Message'

export interface PairMessageRequestPayload {
  oneTimeCode: string
}

export interface PairMessageResponsePayload {
  deviceToken: string
}

class PairMessage extends Message {
  protected async process (request: PlasmoMessaging.Request): Promise<PairMessageResponsePayload> {
    const payload = request.body as PairMessageRequestPayload
    const deviceToken = await this.connectionManager.pair(payload.oneTimeCode)
    return { deviceToken }
  }
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const message = new PairMessage()
  await message.handle(request, response)
}

export default handler
