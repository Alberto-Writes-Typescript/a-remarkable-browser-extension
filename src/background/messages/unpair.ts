import type { PlasmoMessaging } from '@plasmohq/messaging'

import Message from '../../lib/utils/Message'

export interface UnpairMessageResponsePayload {
  removedDeviceToken: string | undefined
}

class UnpairMessage extends Message {
  protected async process (request: PlasmoMessaging.Request): Promise<UnpairMessageResponsePayload> {
    const removedDeviceToken = await this.authenticationManager.deviceToken()
    await this.pairManager.unpair()
    return { removedDeviceToken }
  }
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const message = new UnpairMessage()
  await message.handle(request, response)
}

export default handler
