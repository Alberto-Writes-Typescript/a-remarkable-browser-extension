import { type Storage } from '@plasmohq/storage'
import MockStorage from '../../mocks/MockStorage'
import StorageManager from '../../../src/lib/services/StorageManager'

describe('StorageManager', () => {
  describe('set', () => {
    it('if store does not contain given key pair, adds key pair to store', async () => {
      const store = new MockStorage() as unknown as Storage

      const storeContent = await store.getAll()
      expect(storeContent).not.toHaveProperty('key')

      const storageManager = new StorageManager(store)
      await storageManager.set('key', 'value')

      expect(await store.get('key')).toBe('value')
    })

    it('if store contains given key pair, updates value of key pair in store', async () => {
      const store = new MockStorage() as unknown as Storage

      await store.set('key', 'value')
      expect(await store.get('key')).toBe('value')

      const storageManager = new StorageManager(store)
      await storageManager.set('key', 'new value')

      expect(await store.get('key')).toBe('new value')
    })
  })

  describe('get', () => {
    it('if store contains given key pair, returns value of key pair in store', async () => {
      const store = new MockStorage() as unknown as Storage

      await store.set('key', 'value')
      expect(await store.get('key')).toBe('value')
    })

    it('if store does not contain given key pair, returns undefined', async () => {
      const store = new MockStorage() as unknown as Storage

      expect(await store.get('key')).toBe(undefined)
    })
  })
})
