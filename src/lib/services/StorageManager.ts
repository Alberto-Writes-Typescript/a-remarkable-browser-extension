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

  private async storeMap (): Promise<Record<string, string>> {
    return await this.#store.getAll()
  }
}
