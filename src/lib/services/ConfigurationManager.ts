import { RemarkableClient } from 'a-remarkable-js-sdk'
import { Storage } from '@plasmohq/storage'
import { NoDevicePairedError } from '../errors'

export const STORAGE_MAPS = {
  deviceToken: 'deviceToken',
  sessionToken: 'sessionToken'
}

/**
 * Interface for extension configuration management
 *
 * The class provides a single endpoint for the extension
 * services to persist and retrieve extension configuration
 * parameters. Underneath, the service uses the browser
 * extension internal storage to persist the parameters.
 *
 * Use the class
 */
export default class ConfigurationManager {
  readonly #storage: Storage

  constructor () {
    this.#storage = new Storage()
  }

  async remarkableClient (): Promise<RemarkableClient> {
    const deviceToken = await this.deviceToken()
    const sessionToken = await this.sessionToken()
    return new RemarkableClient(deviceToken, sessionToken)
  }

  async deviceToken (): Promise<string | undefined> {
    return await this.#storage.get(STORAGE_MAPS.deviceToken)
  }

  async sessionToken (): Promise<string | undefined> {
    return await this.#storage.get(STORAGE_MAPS.sessionToken)
  }

  async setDeviceToken (deviceToken: string): Promise<string> {
    await this.#storage.set(STORAGE_MAPS.deviceToken, deviceToken)
    await this.#storage.remove(STORAGE_MAPS.sessionToken)
    return deviceToken
  }

  async removeDeviceToken (): Promise<void> {
    await this.#storage.remove(STORAGE_MAPS.deviceToken)
    await this.#storage.remove(STORAGE_MAPS.sessionToken)
  }

  async setSessionToken (sessionToken: string): Promise<string> {
    const deviceToken = await this.deviceToken()

    if (deviceToken == null) {
      throw new NoDevicePairedError('Device token must be set before setting session token')
    }

    await this.#storage.set(STORAGE_MAPS.sessionToken, sessionToken)

    return sessionToken
  }

  async removeSessionToken (): Promise<void> {
    await this.#storage.remove(STORAGE_MAPS.sessionToken)
  }

  async reset (): Promise<void> {
    await Promise.all(Object.keys(STORAGE_MAPS).map(async (key) => { await this.#storage.remove(key) }))
  }
}
