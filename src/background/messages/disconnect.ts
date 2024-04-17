import type { PlasmoMessaging } from '@plasmohq/messaging'
import Message from '../../lib/utils/Message'

export interface DisconnectMessageResponsePayload {
  removedSessionToken: string | undefined
}

class DisconnectMessage extends Message {
  protected async process (request: PlasmoMessaging.Request): Promise<DisconnectMessageResponsePayload> {
    const removedSessionToken = await this.configurationManager.sessionToken()
    await this.connectionManager.disconnect()
    return { removedSessionToken }
  }
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const message = new DisconnectMessage()
  await message.handle(request, response)
}

export default handler
