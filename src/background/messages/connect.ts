import type { PlasmoMessaging } from '@plasmohq/messaging'
import Message from '../../lib/utils/Message'

export interface ConnectMessageResponsePayload {
  sessionToken: string
}

class ConnectMessage extends Message {
  protected async process (request: PlasmoMessaging.Request): Promise<ConnectMessageResponsePayload> {
    const sessionToken = await this.connectionManager.connect()
    return { sessionToken }
  }
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const message = new ConnectMessage()
  await message.handle(request, response)
}

export default handler
