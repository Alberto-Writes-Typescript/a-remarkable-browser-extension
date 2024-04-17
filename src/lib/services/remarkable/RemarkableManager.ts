import ConfigurationManager from '../ConfigurationManager'
import { type RemarkableClient } from 'a-remarkable-js-sdk'

/**
 * A `RemarkableManager` is a extension service which makes use
 * of the reMarkable Cloud API. These services need access to
 * user's reMarkable Cloud account tokens to authenticate
 * against the API.
 *
 * By defining a service which extends the `RemarkableManager`
 * interface we provide access to the user's reMarkable Cloud
 * credentials and other relevant configuration parameters via
 * a { @link ConfigurationManager } instance.
 */
export default class RemarkableManager {
  readonly #configurationManager: ConfigurationManager

  constructor () {
    this.#configurationManager = new ConfigurationManager()
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
  async remarkableClient (): Promise<RemarkableClient> {
    return await this.configurationManager.remarkableClient()
  }
}
