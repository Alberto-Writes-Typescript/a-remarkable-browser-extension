import { RemarkableClient, type Device, type Session } from 'a-remarkable-js-sdk'
import { v4 as uuidv4 } from 'uuid'

export default class ConnectionManager {
  readonly #reMarkableClient: RemarkableClient

  constructor () {
    this.#reMarkableClient = RemarkableClient.withFetchHttpClient()
  }

  async pair (oneTimeCode: string): Promise<Device> {
    if (!this.#reMarkableClient.paired) {
      await this.#reMarkableClient.pair(uuidv4(), 'browser-chrome', oneTimeCode)
    }

    return this.#reMarkableClient.device
  }

  async connect (): Promise<Session> {
    if (this.#reMarkableClient.sessionExpired) {
      await this.#reMarkableClient.connect()
    }

    return this.#reMarkableClient.session
  }
}
