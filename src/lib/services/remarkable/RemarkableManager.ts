import { RemarkableClient } from 'a-remarkable-js-sdk'
import AuthenticationManager from '../AuthenticationManager'
import { NoDevicePairedError } from '../../errors'

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
export default abstract class RemarkableManager {
  protected authenticationManager: AuthenticationManager

  constructor () {
    this.authenticationManager = new AuthenticationManager()
  }

  /**
   * Returns a `remarkableClient` instance synchronized with the web-browser
   * configuration parameters (device & session). This client should be used
   * in all our `RemarkableManager`s to ensure we communicate with the
   * reMarkable Cloud according to the most up-to-date user credentials
   */
  protected async remarkableClient (): Promise<RemarkableClient> {
    const deviceToken = await this.authenticationManager.deviceToken()
    const sessionToken = await this.authenticationManager.sessionToken()

    if (deviceToken == null) {
      throw new NoDevicePairedError('A device token must be set before creating a remarkable client')
    }

    const client = new RemarkableClient(deviceToken, sessionToken)

    if (client.sessionExpired) {
      await client.connect()
      await this.authenticationManager.setSessionToken(client.session.token)
    }

    return client
  }

  protected async remarkableUnpairedClient (): Promise<RemarkableClient> {
    return new RemarkableClient()
  }
}
