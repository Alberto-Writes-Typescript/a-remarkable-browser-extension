import ConnectionManager from '../../lib/ConnectionManager'
import type { PlasmoMessaging } from '@plasmohq/messaging'

export interface GetConfigurationMessageResponsePayload {
  deviceToken: string | undefined
  sessionToken: string | undefined
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const connectionManager = new ConnectionManager()

  const deviceToken = await connectionManager.deviceToken()
  const sessionToken = await connectionManager.sessionToken()

  response.send({ deviceToken, sessionToken } satisfies GetConfigurationMessageResponsePayload)
}

export default handler
