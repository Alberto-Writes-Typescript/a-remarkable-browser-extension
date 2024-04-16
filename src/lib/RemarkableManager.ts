import ConfigurationManager from './ConfigurationManager'
import { RemarkableClient } from 'a-remarkable-js-sdk'

export default class RemarkableManager {
  static async initialize (): Promise<RemarkableManager> {
    const configurationManager = await ConfigurationManager.initialize()
    return new this(configurationManager)
  }

  readonly #configurationManager: ConfigurationManager

  constructor (configurationManager: ConfigurationManager) {
    this.#configurationManager = configurationManager
  }

  get configurationManager (): ConfigurationManager {
    return this.#configurationManager
  }

  /**
   * Returns a `remarkableClient` instance synchronized with the web-browser
   * configuration parameters (device & session). This client should be used
   * in all our `RemarkableManager`s to ensure we communicate with the
   * reMarkable Cloud according to the most up-to-date user credentials
   */
  get remarkableClient (): RemarkableClient {
    return this.configurationManager.remarkableClient
  }
}
