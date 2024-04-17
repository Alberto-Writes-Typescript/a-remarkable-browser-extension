import RemarkableManager from './RemarkableManager'
import { v4 as uuidv4 } from 'uuid'
import { NoDevicePairedError } from '../../errors'

export default class ConnectionManager extends RemarkableManager {
  async pair (oneTimeCode: string): Promise<string> {
    const client = await this.remarkableClient()
    await client.pair(uuidv4(), 'browser-chrome', oneTimeCode)
    // TODO: device token should be returned after pairing, here the connection manager knows too much
    await this.configurationManager.setDeviceToken(client.device.token)
    return client.device.token
  }

  async unpair (): Promise<void> {
    await this.configurationManager.removeDeviceToken()
  }

  async connect (): Promise<string> {
    const client = await this.remarkableClient()

    if (!client.paired) {
      throw new NoDevicePairedError('Impossible to connect with reMarkable Cloud: extension not paired')
    }

    await client.connect()
    await this.configurationManager.setSessionToken(client.session.token)
    return client.session.token
  }

  async disconnect (): Promise<void> {
    await this.configurationManager.removeSessionToken()
  }
}
