import { type Storage } from '@plasmohq/storage'
import MockStorage from '../../mocks/MockStorage'
import StorageManager, { DEFAULT_NAMESPACE } from '../../../src/lib/services/StorageManager'

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

    it('when namespace is provided, only returns keys from given namespace', async () => {
      const store = new MockStorage() as unknown as Storage

      await store.set('key', 'value')

      let storageManager = new StorageManager(store)
      expect(await storageManager.get('key')).toBe('value')

      storageManager = new StorageManager(store, 'namespace')
      await storageManager.set('key', 'another value')

      expect(await storageManager.get('key')).toBe('another value')
    })
  })

  describe('get', () => {
    it('if store contains given key pair, returns value of key pair in store', async () => {
      const store = new MockStorage() as unknown as Storage

      const storageManager = new StorageManager(store)
      await storageManager.set('key', 'value')

      expect(await storageManager.get('key')).toBe('value')
    })

    it('if store does not contain given key pair, returns undefined', async () => {
      const store = new MockStorage() as unknown as Storage

      const storageManager = new StorageManager(store)

      expect(await storageManager.get('key')).toBe(undefined)
    })

    it('when namespace is provided, set key value pairs in namespace', async () => {
      const store = new MockStorage() as unknown as Storage

      await store.set('key', 'value')

      const storageManager = new StorageManager(store, 'namespace')
      await storageManager.set('otherKey', 'another value')

      expect(await storageManager.get('otherKey')).toBe('another value')

      store.setNamespace('default')
      const storeContent = await store.getAll()
      expect(Object.keys(storeContent).includes('otherKey')).toBeFalsy()
    })
  })

  describe('remove', () => {
    it('if store contains given key pair, removes key pair from store', async () => {
      const store = new MockStorage() as unknown as Storage

      await store.set('key', 'value')
      expect(await store.get('key')).toBe('value')

      const storageManager = new StorageManager(store)
      await storageManager.remove('key')

      expect(await storageManager.get('key')).toBe(undefined)
    })

    it('when namespace is provided, only removes keys from given namespace', async () => {
      const store = new MockStorage() as unknown as Storage

      await store.set('key', 'value')

      const storageManager = new StorageManager(store, 'namespace')
      await storageManager.set('otherKey', 'another value')

      const contentBeforeRemoval = { ...(await store.getAll()) }
      await storageManager.remove('key')
      expect(contentBeforeRemoval).toStrictEqual(await store.getAll())

      await storageManager.remove('otherKey')
      expect(contentBeforeRemoval).not.toStrictEqual(await store.getAll())
    })
  })

  describe('clear', () => {
    it('removes all key value pairs from store', async () => {
      const store = new MockStorage() as unknown as Storage

      const storageManager = new StorageManager(store)
      await storageManager.set('key', 'value')
      await storageManager.set('otherKey', 'another value')

      await storageManager.clear()

      expect(await store.getAll()).toStrictEqual({})
    })

    it('when namespace is provided, only removes keys from given namespace', async () => {
      const store = new MockStorage() as unknown as Storage

      await store.set('key', 'value')

      const storageManager = new StorageManager(store, 'namespace')
      await storageManager.set('otherKey', 'another value')

      await storageManager.clear()

      expect(await store.getAll()).toStrictEqual({})
      store.setNamespace(DEFAULT_NAMESPACE)
      expect(await store.getAll()).toStrictEqual({ key: JSON.stringify('value') })
    })
  })
})
