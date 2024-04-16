import RemarkableManager from './RemarkableManager'
import { v4 as uuidv4 } from 'uuid'

export class NoDevicePairedError extends Error {}

export default class ConnectionManager extends RemarkableManager {
  async pair (oneTimeCode: string): Promise<string> {
    await this.remarkableClient.pair(uuidv4(), 'browser-chrome', oneTimeCode)
    // TODO: device token should be returned after pairing, here the connection manager knows too much
    await this.configurationManager.setDeviceToken(this.remarkableClient.device.token)

    return this.remarkableClient.device.token
  }

  async unpair (): Promise<void> {
    await this.configurationManager.removeDeviceToken()
  }

  async connect (): Promise<string> {
    if (!this.remarkableClient.paired) {
      throw new NoDevicePairedError('Impossible to connect with reMarkable Cloud: extension not paired')
    }

    await this.remarkableClient.connect()
    await this.configurationManager.setSessionToken(this.remarkableClient.session.token)

    return this.remarkableClient.session.token
  }

  async disconnect (): Promise<void> {
    await this.configurationManager.removeSessionToken()
  }
}
