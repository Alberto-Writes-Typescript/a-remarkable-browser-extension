import { type PlasmoMessaging } from '@plasmohq/messaging'
import ConfigurationManager from '../services/ConfigurationManager'
import ConnectionManager from '../services/remarkable/ConnectionManager'
import UploadManager from '../services/remarkable/UploadManager'

export default class Message {
  protected readonly configurationManager: ConfigurationManager
  protected readonly connectionManager: ConnectionManager
  protected readonly uploadManager: UploadManager

  constructor () {
    this.configurationManager = new ConfigurationManager()
    this.connectionManager = new ConnectionManager()
    this.uploadManager = new UploadManager()
  }

  async handle (request: PlasmoMessaging.Request, response: PlasmoMessaging.Response): Promise<void> {
    const outcome = await this.process(request)
    response.send(outcome)
  }

  protected async process (request: PlasmoMessaging.Request): Promise<unknown> {
    throw new Error(`handle method not implemented by ${this.constructor.name}`)
  }
}
