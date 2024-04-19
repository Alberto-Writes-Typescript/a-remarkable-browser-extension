import { Storage } from '@plasmohq/storage'

export default class StorageManager {
  readonly #store: Storage

  constructor (store: Storage = new Storage()) {
    this.#store = store
  }

  async get (key: string): Promise<unknown> {
    return await this.#store.get(key)
  }

  async set (key: string, value: unknown): Promise<unknown> {
    await this.#store.set(key, value)
    return value
  }

  async remove (key: string): Promise<void> {
    if (await this.has(key)) await this.#store.remove(key)
  }

  private async storeMap (): Promise<Record<string, string>> {
    return await this.#store.getAll()
  }

  private async has (key: string): Promise<boolean> {
    const storeMap = await this.storeMap()
    return key in storeMap
  }
}
