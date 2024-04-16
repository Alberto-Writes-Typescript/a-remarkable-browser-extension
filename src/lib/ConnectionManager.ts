import { RemarkableClient } from 'a-remarkable-js-sdk'
import { SecureStorage } from '@plasmohq/storage/secure'
import { Storage } from '@plasmohq/storage'
import { v4 as uuidv4 } from 'uuid'

export default class ConnectionManager {
  #reMarkableClient: RemarkableClient

  readonly #tokenStore: Storage

  constructor () {
    this.#tokenStore = new Storage()
    this.#reMarkableClient = RemarkableClient.withFetchHttpClient()
  }

  get remarkableClient (): RemarkableClient {
    return this.#reMarkableClient
  }

  async deviceToken (): Promise<string | undefined> {
    return await this.#tokenStore.get('deviceToken')
  }

  async sessionToken (): Promise<string | undefined> {
    return await this.#tokenStore.get('sessionToken')
  }

  async pair (oneTimeCode: string): Promise<string> {
    const deviceToken = await this.deviceToken()

    if (deviceToken != null) {
      this.#reMarkableClient = RemarkableClient.withFetchHttpClient(deviceToken)

      return this.#reMarkableClient.device.token
    }

    if (!this.#reMarkableClient.paired) {
      await this.#reMarkableClient.pair(uuidv4(), 'browser-chrome', oneTimeCode)
    }

    await this.#tokenStore.set('deviceToken', this.#reMarkableClient.device.token)

    return this.#reMarkableClient.device.token
  }

  async unpair (): Promise<void> {
    await this.#tokenStore.remove('deviceToken')
  }

  async connect (): Promise<string> {
    const deviceToken = await this.deviceToken()
    const sessionToken = await this.sessionToken()

    this.#reMarkableClient = RemarkableClient.withFetchHttpClient(deviceToken, sessionToken)

    if (!this.#reMarkableClient.sessionExpired) {
      return this.#reMarkableClient.session.token
    }

    await this.#reMarkableClient.connect()

    await this.#tokenStore.set('sessionToken', this.#reMarkableClient.session.token)

    return this.#reMarkableClient.session.token
  }
}
