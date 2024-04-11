import { enableFetchMocks } from 'jest-fetch-mock'

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
