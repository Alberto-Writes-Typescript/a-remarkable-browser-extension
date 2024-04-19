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
  #namespace?: string | undefined

  readonly #store: Record<string, string> = {}

  constructor (namespace?: string) { this.setNamespace(namespace) }

  setNamespace (namespace: string | undefined): void {
    this.#namespace = namespace
  }

  /**
   * Returns value from { @param key } if it exists in the store.
   * Otherwise, returns `undefined`.
   *
   * @param key - The key to search for in the store
   * @returns The value associated with the key if it exists in the store.
   */
  async get (key: string): Promise<unknown | undefined> {
    const namespacedKey = this.namespacedKey(key)

    if (namespacedKey in this.#store) {
      return JSON.parse(this.#store[namespacedKey])
    } else {
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
    this.#store[this.namespacedKey(key)] = JSON.stringify(value)
    return null
  }

  async remove (key: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    console.log(this.#store, key, this.namespacedKey(key))
    delete this.#store[this.namespacedKey(key)]
  }

  async getAll (): Promise<Record<string, string>> {
    return this.#store
  }

  private namespacedKey (key: string): string {
    return this.#namespace != null ? `${this.#namespace}${key}` : key
  }
}
