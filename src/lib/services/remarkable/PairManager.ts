import { v4 as uuidv4 } from 'uuid'
import RemarkableManager from './RemarkableManager'

export default class PairManager extends RemarkableManager {
  async pair (oneTimeCode: string): Promise<string> {
    const client = await this.remarkableClient()
    await client.pair(uuidv4(), 'browser-chrome', oneTimeCode)
    // TODO: device token should be returned after pairing, here the connection manager knows too much
    await this.authenticationManager.setNewDevice(client.device.token)
    return client.device.token
  }

  async unpair (): Promise<void> {
    await this.authenticationManager.removeCurrentDevice()
  }
}
