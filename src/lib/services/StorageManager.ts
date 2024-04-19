import { Storage } from '@plasmohq/storage'

export default class StorageManager {
  readonly #store: Storage
  readonly #namespace?: string

  constructor (
    store: Storage = new Storage(),
    namespace?: string
  ) {
    this.#store = store

    if (namespace != null) {
      this.#namespace = namespace
      this.#store.setNamespace(namespace)
    }
  }

  async get (key: string): Promise<unknown> {
    return await this.#store.get(key)
  }

  async set (key: string, value: unknown): Promise<unknown> {
    await this.#store.set(key, value)
    return value
  }

  async remove (key: string): Promise<void> {
    await this.#store.remove(key)
  }

  private async storeMap (): Promise<Record<string, string>> {
    return await this.#store.getAll()
  }

  private async has (key: string): Promise<boolean> {
    const storeMap = await this.storeMap()
    return key in storeMap
  }
}
