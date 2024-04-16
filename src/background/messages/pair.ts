import ConnectionManager from '../../lib/ConnectionManager'
import type { PlasmoMessaging } from '@plasmohq/messaging'

export interface PairMessageRequestPayload {
  oneTimeCode: string
}

export interface PairMessageResponsePayload {
  deviceToken: string
}

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const payload = request.body as PairMessageRequestPayload

  const connectionManager = new ConnectionManager()

  const deviceToken = await connectionManager.pair(payload.oneTimeCode)

  response.send({ deviceToken } satisfies PairMessageResponsePayload)
}

export default handler
