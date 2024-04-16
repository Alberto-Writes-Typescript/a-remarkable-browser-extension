import ConnectionManager from '../../lib/ConnectionManager'
import type { PlasmoMessaging } from '@plasmohq/messaging'

export interface ConnectMessageResponsePayload {
  sessionToken: string
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const connectionManager = new ConnectionManager()

  const sessionToken = await connectionManager.connect()

  response.send({ sessionToken } satisfies ConnectMessageResponsePayload)
}

export default handler
