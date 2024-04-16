import ConnectionManager from '../../lib/ConnectionManager'
import type { PlasmoMessaging } from '@plasmohq/messaging'

const handler: PlasmoMessaging.MessageHandler = async (request, response) => {
  const connectionManager = new ConnectionManager()

  await connectionManager.unpair()

  response.send({})
}

export default handler
