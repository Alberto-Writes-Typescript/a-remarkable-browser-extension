import { type PlasmoMessaging } from '@plasmohq/messaging'
import AuthenticationManager from '../../lib/services/AuthenticationManager'
import PairManager from '../services/remarkable/PairManager'
import UploadManager from '../services/remarkable/UploadManager'

export default class Message {
  protected readonly authenticationManager: AuthenticationManager
  protected readonly pairManager: PairManager
  protected readonly uploadManager: UploadManager

  constructor () {
    this.authenticationManager = new AuthenticationManager()
    this.pairManager = new PairManager()
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
