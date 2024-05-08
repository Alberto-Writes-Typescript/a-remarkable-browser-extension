import type { PlasmoMessaging } from '@plasmohq/messaging'

import Message from '../../lib/utils/Message'

export interface GetConfigurationMessageResponsePayload {
  deviceToken: string | undefined
  sessionToken: string | undefined
}

class GetConfigurationMessage extends Message {
  protected async process (request: PlasmoMessaging.Request): Promise<GetConfigurationMessageResponsePayload> {
    const deviceToken = await this.authenticationManager.deviceToken()
    const sessionToken = await this.authenticationManager.sessionToken()
    return { deviceToken, sessionToken }
  }
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const message = new GetConfigurationMessage()
  await message.handle(request, response)
}

export default handler
