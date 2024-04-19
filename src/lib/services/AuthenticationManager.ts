import { Device, FetchClient, Session } from 'a-remarkable-js-sdk'
import { NoDevicePairedError, UnknownSessionDeviceError } from '../errors'
import StorageManager from './StorageManager'

export const AUTHENTICATION_KEYS: Record<string, string> = {
  deviceToken: 'deviceToken',
  sessionToken: 'sessionToken'
}

/**
 * Interface for reMarkable Cloud token-based authentication
 * credentials management.
 *
 * Provides an interface for { @link RemarkableManager } services
 * to persist and retrieve authentication credentials from the
 * browser extension storage.
 *
 * (!) The manager does not handle how tokens are generated or
 * fetched from the reMarkable Cloud API.
 */
export default class AuthenticationManager {
  readonly #storeManager: StorageManager

  constructor (storeManager: StorageManager = new StorageManager()) {
    this.#storeManager = storeManager
  }

  async deviceToken (): Promise<string | undefined> {
    return (await this.#storeManager.get(AUTHENTICATION_KEYS.deviceToken)) as string
  }

  /**
   * Adds new device to browser extension.
   *
   * In the reMarkable Cloud, a device is identify by its device token.
   *
   * When a new `Device` is set through its device token, the authentication
   * manager clears all extension information present in storage and persist
   * the new device. This way we make sure there is no previous information
   * from other devices in the system.
   */
  async setNewDevice (deviceToken: string): Promise<string> {
    // TODO: I should validate the device token is an actual JWT token with Device info
    await this.clearDeviceInformation()
    await this.#storeManager.set(AUTHENTICATION_KEYS.deviceToken, deviceToken)
    return deviceToken
  }

  async sessionToken (): Promise<string | undefined> {
    return (await this.#storeManager.get(AUTHENTICATION_KEYS.sessionToken)) as string
  }

  async setSessionToken (sessionToken: string): Promise<string> {
    // TODO: I should validate the device token is an actual JWT token with Device info
    const deviceToken = await this.deviceToken()

    if (deviceToken == null) {
      throw new NoDevicePairedError('A session token can only be set after a device token')
    }

    const device = new Device(deviceToken, FetchClient)
    const session = new Session(sessionToken)

    if (device.id !== session.deviceId) {
      throw new UnknownSessionDeviceError('Session token does not belong to the current device')
    }

    await this.#storeManager.set(AUTHENTICATION_KEYS.sessionToken, sessionToken)

    return sessionToken
  }

  /**
   * Removes all information related to current device from browser storage
   * @private
   */
  private async clearDeviceInformation (): Promise<void> {
    // TODO: Use namespace instead of removing all authentication keys
    await Promise.all(
      Object.values(AUTHENTICATION_KEYS).map(async key => {
        await this.#storeManager.remove(key)
      })
    )
  }
}
