import * as dotenv from 'dotenv'
import { enableFetchMocks } from 'jest-fetch-mock'

/**
 * jest-fetch-mock Configuration
 * -----------------------------
 */

/**
 * `fetch` polyfill for Jest
 *
 * Despite `Jest` `jsdom` providing a browser-like interface for
 * testing, it does not implement the `fetch` API. This leads to
 * `fetch is not defined` errors when running tests that use `fetch`.
 *
 * `jest-fetch-mock` is a library that provides a `fetch` polyfill
 * for Jest. It mocks the `fetch` API and allows you to write tests
 * that use `fetch` without errors.
 */
enableFetchMocks()

/**
 * Ensure that `fetch` mock is disabled by default
 */
fetchMock.disableMocks()

/**
 * DotEnv Configuration
 * --------------------
 */

/**
 * Load environment variables from .env.test file
 */
dotenv.config({ path: '.env.test' })

/**
 * Plasmo mocks & polyfills
 * ------------------------
 */

/**
 * Fixes problem when importing @plasmohq/storage { @link Storage } in Jest
 */
jest.mock('pify', () => {
  return async (): Promise<void> => { await Promise.resolve() }
})
