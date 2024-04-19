import { Storage } from '@plasmohq/storage'

export const DEFAULT_NAMESPACE = 'default'

export default class StorageManager {
  readonly #store: Storage
  readonly #namespace?: string

  constructor (
    store: Storage = new Storage(),
    namespace?: string
  ) {
    this.#store = store

    this.#namespace = namespace ?? DEFAULT_NAMESPACE
    this.#store.setNamespace(this.#namespace)
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

  async clear (): Promise<void> {
    const storeNamespace = await this.#store.getAll()

    await Promise.all(
      Object.keys(storeNamespace).map(async key => { await this.remove(key) })
    )
  }
}
