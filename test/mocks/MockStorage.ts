/**
 * `Plasmo` { @link Storage } mock class
 *
 * Emulates the behavior of the `Plasmo` storage. Since the
 * actual documentation does not provide a clear explanation
 * on how some methods work, this class will be used to mimic
 * its behavior and document the capabilities of the actual
 * class.
 *
 * Use this mock for all storage-related tests in the extension.
 */
export default class MockStorage {
  readonly #store: Record<string, string> = {}

  /**
   * Returns value from { @param key } if it exists in the store.
   * Otherwise, returns `undefined`.
   *
   * @param key - The key to search for in the store
   * @returns The value associated with the key if it exists in the store.
   */
  async get (key: string): Promise<unknown | undefined> {
    if (key in this.#store) {
      return JSON.parse(this.#store[key])
    } else {
      console.log('me llama')
      return undefined
    }
  }

  /**
   * Adds { @param key }-{ @param value } pair to the store.
   * Returns null. The original store parses all values as
   * JSON, storing them in a string.
   *
   * @param key
   * @param value
   */
  async set (key: string, value: unknown): Promise<null> {
    this.#store.key = JSON.stringify(value)
    return null
  }

  async getAll (): Promise<Record<string, string>> {
    return this.#store
  }
}
