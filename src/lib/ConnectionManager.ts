import { RemarkableClient, type Device, type Session } from 'a-remarkable-js-sdk'
import { SecureStorage } from '@plasmohq/storage/secure'
import { v4 as uuidv4 } from 'uuid'

export default class ConnectionManager {
  #reMarkableClient: RemarkableClient

  readonly #tokenStore: SecureStorage

  constructor () {
    this.#tokenStore = new SecureStorage()
    this.#reMarkableClient = RemarkableClient.withFetchHttpClient()
  }

  async deviceToken (): Promise<string | undefined> {
    return this.#tokenStore.get('deviceToken')
  }

  async sessionToken (): Promise<string | undefined> {
    return this.#tokenStore.get('sessionToken')
  }

  async pair (oneTimeCode: string): Promise<Device> {
    const deviceToken = await this.deviceToken()

    if (deviceToken != null) {
      this.#reMarkableClient = RemarkableClient.withFetchHttpClient(deviceToken)

      return this.#reMarkableClient.device
    }

    if (!this.#reMarkableClient.paired) {
      await this.#reMarkableClient.pair(uuidv4(), 'browser-chrome', oneTimeCode)
    }

    this.#tokenStore.set('deviceToken', this.#reMarkableClient.device.token)

    return this.#reMarkableClient.device
  }

  async connect (): Promise<Session> {
    const deviceToken = await this.deviceToken()
    const sessionToken = await this.sessionToken()

    this.#reMarkableClient = RemarkableClient.withFetchHttpClient(deviceToken, sessionToken)

    if (!this.#reMarkableClient.paired) {
      throw new Error('Device not paired')
    }

    if (!this.#reMarkableClient.sessionExpired) {
      return this.#reMarkableClient.session
    }

    await this.#reMarkableClient.connect()

    this.#tokenStore.set('sessionToken', this.#reMarkableClient.session.token)

    return this.#reMarkableClient.session
  }
}
