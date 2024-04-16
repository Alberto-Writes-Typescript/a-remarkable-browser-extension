import { RemarkableClient } from 'a-remarkable-js-sdk'
import { Storage } from '@plasmohq/storage'

const STORAGE_MAPS = {
  deviceToken: 'deviceToken',
  sessionToken: 'sessionToken'
}

export class NoDeviceTokenError extends Error {}

export default class ConfigurationManager {
  static async initialize (): Promise<ConfigurationManager> {
    const storage = new Storage()

    const deviceToken = await storage.get(STORAGE_MAPS.deviceToken)
    const sessionToken = await storage.get(STORAGE_MAPS.sessionToken)

    const configurationManager = new ConfigurationManager(deviceToken, sessionToken)

    const reMarkableClient = configurationManager.remarkableClient

    if (!reMarkableClient.paired) return configurationManager

    if (reMarkableClient.sessionExpired) {
      await reMarkableClient.connect()
      await configurationManager.setSessionToken(reMarkableClient.session.token)
    }

    return configurationManager
  }

  #deviceToken: string | undefined
  #sessionToken: string | undefined
  #reMarkableClient: RemarkableClient

  readonly #storage: Storage

  constructor (
    deviceToken: string | undefined,
    sessionToken: string | undefined
  ) {
    this.#deviceToken = deviceToken
    this.#sessionToken = sessionToken

    this.#reMarkableClient = this.newRemarkableClient(deviceToken, sessionToken)
    this.#storage = new Storage()
  }

  get remarkableClient (): RemarkableClient {
    return this.#reMarkableClient
  }

  get deviceToken (): string | undefined {
    return this.#deviceToken
  }

  get sessionToken (): string | undefined {
    return this.#sessionToken
  }

  async setDeviceToken (deviceToken?: string): Promise<void> {
    await this.#storage.set(STORAGE_MAPS.deviceToken, deviceToken)
    await this.#storage.remove(STORAGE_MAPS.sessionToken)

    this.#deviceToken = deviceToken
    this.#sessionToken = undefined

    this.#reMarkableClient = this.newRemarkableClient(this.#deviceToken)
  }

  async removeDeviceToken (): Promise<void> {
    await this.setDeviceToken()
  }

  async setSessionToken (sessionToken?: string): Promise<void> {
    if (this.#deviceToken == null) {
      throw new NoDeviceTokenError('Device token must be set before setting session token')
    }

    await this.#storage.set(STORAGE_MAPS.sessionToken, sessionToken)

    this.#sessionToken = sessionToken
    this.#reMarkableClient = this.newRemarkableClient(this.#deviceToken, sessionToken)
  }

  async removeSessionToken (): Promise<void> {
    await this.setSessionToken()
  }

  async reset (): Promise<void> {
    await Promise.all(Object.keys(STORAGE_MAPS).map(async (key) => { await this.#storage.remove(key) }))
    this.#reMarkableClient = this.newRemarkableClient()
    this.#deviceToken = undefined
    this.#sessionToken = undefined
  }

  private newRemarkableClient (deviceToken?: string, sessionToken?: string): RemarkableClient {
    return RemarkableClient.withFetchHttpClient(deviceToken, sessionToken)
  }
}
