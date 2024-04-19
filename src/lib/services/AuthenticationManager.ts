import { Device, Session } from 'a-remarkable-js-sdk'
import { Storage } from '@plasmohq/storage'
import {
  InvalidDeviceTokenError,
  InvalidSessionTokenError,
  NoDevicePairedError,
  UnknownSessionDeviceError
} from '../errors'
import StorageManager from './StorageManager'

export const DEVICE_STORAGE_NAMESPACE = 'remarkable'

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

  constructor (storeManager?: StorageManager) {
    this.#storeManager = storeManager ?? new StorageManager(new Storage(), DEVICE_STORAGE_NAMESPACE)
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
    try {
      // TODO: add token validator to `Device` class
      // eslint-disable-next-line no-new
      new Device(deviceToken)
    } catch (error) {
      throw new InvalidDeviceTokenError('Device token is not a JWT reMarkable device token')
    }

    await this.removeCurrentDevice()
    await this.#storeManager.set(AUTHENTICATION_KEYS.deviceToken, deviceToken)
    return deviceToken
  }

  /**
   * Removes all information related to current device from browser storage
   *
   * @private
   */
  async removeCurrentDevice (): Promise<void> {
    await this.#storeManager.clear()
  }

  async sessionToken (): Promise<string | undefined> {
    return (await this.#storeManager.get(AUTHENTICATION_KEYS.sessionToken)) as string
  }

  async setSessionToken (sessionToken: string): Promise<string> {
    const deviceToken = await this.deviceToken()

    if (deviceToken == null) {
      throw new NoDevicePairedError('A session token can only be set after a device token')
    }

    const device = new Device(deviceToken)

    let session: Session

    try {
      session = new Session(sessionToken)
    } catch (error) {
      throw new InvalidSessionTokenError('Session token is not a JWT reMarkable session token')
    }

    if (device.id !== session.deviceId) {
      throw new UnknownSessionDeviceError('Session token does not belong to the current device')
    }

    await this.#storeManager.set(AUTHENTICATION_KEYS.sessionToken, sessionToken)

    return sessionToken
  }
}
