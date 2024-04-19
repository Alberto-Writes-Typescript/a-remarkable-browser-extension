import { Device, FetchClient, Session } from 'a-remarkable-js-sdk'
import { type Storage } from '@plasmohq/storage'
import AuthenticationManager, { AUTHENTICATION_KEYS } from '../../../src/lib/services/AuthenticationManager'
import { NoDevicePairedError, UnknownSessionDeviceError } from '../../../src/lib/errors'
import StorageManager from '../../../src/lib/services/StorageManager'
import MockStorage from '../../mocks/MockStorage'

describe('AuthenticationManager', () => {
  let storageManager: StorageManager

  beforeEach(() => {
    const store = new MockStorage() as unknown as Storage
    storageManager = new StorageManager(store)
  })

  describe('deviceToken', () => {
    it('if device token is not stored, returns nothing', async () => {
      const authenticationManager = new AuthenticationManager(storageManager)

      expect(await authenticationManager.deviceToken()).toBeUndefined()
    })

    it('if device token is stored, returns device token', async () => {
      await storageManager.set(AUTHENTICATION_KEYS.deviceToken, 'deviceToken')

      expect(await storageManager.get(AUTHENTICATION_KEYS.deviceToken)).toBe('deviceToken')

      const authenticationManager = new AuthenticationManager(storageManager)

      expect(await authenticationManager.deviceToken()).toBe('deviceToken')
    })
  })

  describe('setNewDevice', () => {
    it('sets device token', async () => {
      const authenticationManager = new AuthenticationManager(storageManager)

      await authenticationManager.setNewDevice('deviceToken')

      expect(await authenticationManager.deviceToken()).toBe('deviceToken')
    })

    it('if there is information stored from a previous device, removes it from storage', async () => {
      await storageManager.set(AUTHENTICATION_KEYS.deviceToken, 'previousDeviceToken')
      await storageManager.set(AUTHENTICATION_KEYS.sessionToken, 'previousSessionToken')

      expect(await storageManager.get(AUTHENTICATION_KEYS.deviceToken)).toBe('previousDeviceToken')
      expect(await storageManager.get(AUTHENTICATION_KEYS.sessionToken)).toBe('previousSessionToken')

      const authenticationManager = new AuthenticationManager(storageManager)

      await authenticationManager.setNewDevice('deviceToken')

      expect(await storageManager.get(AUTHENTICATION_KEYS.deviceToken)).not.toBe('previousDeviceToken')
      expect(await storageManager.get(AUTHENTICATION_KEYS.sessionToken)).toBeUndefined()
    })
  })

  describe('sessionToken', () => {
    it('if session token is not stored, returns nothing', async () => {
      const authenticationManager = new AuthenticationManager(storageManager)

      expect(await authenticationManager.sessionToken()).toBeUndefined()
    })

    it('if session token is stored, returns session token', async () => {
      await storageManager.set(AUTHENTICATION_KEYS.sessionToken, 'sessionToken')

      expect(await storageManager.get(AUTHENTICATION_KEYS.sessionToken)).toBe('sessionToken')

      const authenticationManager = new AuthenticationManager(storageManager)

      expect(await authenticationManager.sessionToken()).toBe('sessionToken')
    })
  })

  describe('setSessionToken', () => {
    it('if there is a device set, and session points to device, sets session token', async () => {
      const deviceToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoMC11c2VyaWQiOiJhdXRoMHw1ZWZjMjg3ZmM0ODgwMTAwMTM0NGY5MjMiLCJkZXZpY2UtZGVzYyI6ImJyb3dzZXItY2hyb21lIiwiZGV2aWNlLWlkIjoiYmUwYzlmNGQtY2RjYi00MDVmLTk3NDQtZjgzNzJjYjdlNTlkIiwiaWF0IjoxNzEzMTY4NzE2LCJpc3MiOiJyTSBXZWJBcHAiLCJqdGkiOiJjazB0dHVzbTA5RT0iLCJuYmYiOjE3MTMxNjg3MTYsInN1YiI6InJNIERldmljZSBUb2tlbiJ9.48dxqxXSbiaAbpnnU7TUWgzGHGd-bQNHiesZQFfWbxU'
      const sessionToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJhdXRoMC1wcm9maWxlIjp7IlVzZXJJRCI6ImF1dGgwfDVlZmMyODdmYzQ4ODAxMDAxMzQ0ZjkyMyIsIklzU29jaWFsIjpmYWxzZSwiQ29ubmVjdGlvbiI6IlVzZXJuYW1lLVBhc3N3b3JkLUF1dGhlbnRpY2F0aW9uIiwiTmFtZSI6InBhc2N1MjE2QGdtYWlsLmNvbSIsIk5pY2tuYW1lIjoicGFzY3UyMTYiLCJHaXZlbk5hbWUiOiIiLCJGYW1pbHlOYW1lIjoiIiwiRW1haWwiOiJwYXNjdTIxNkBnbWFpbC5jb20iLCJFbWFpbFZlcmlmaWVkIjp0cnVlLCJDcmVhdGVkQXQiOiIyMDIwLTA3LTAxVDA2OjA5OjAzLjk0M1oiLCJVcGRhdGVkQXQiOiIyMDI0LTA0LTEwVDA2OjQ4OjQxLjUxWiJ9LCJiZXRhIjp0cnVlLCJkZXZpY2UtZGVzYyI6ImJyb3dzZXItY2hyb21lIiwiZGV2aWNlLWlkIjoiYmUwYzlmNGQtY2RjYi00MDVmLTk3NDQtZjgzNzJjYjdlNTlkIiwiZXhwIjoxNzEzMTc5NTIyLCJpYXQiOjE3MTMxNjg3MjIsImlzcyI6InJNIFdlYkFwcCIsImp0aSI6ImNrMHRZUFMxTGNJPSIsImxldmVsIjoiY29ubmVjdCIsIm5iZiI6MTcxMzE2ODcyMiwic2NvcGVzIjoiZG9jZWRpdCBod2NtYWlsOi0xIHN5bmM6dG9ydG9pc2UgaW50Z3IgbWFpbDotMSBzY3JlZW5zaGFyZSIsInN1YiI6ImF1dGgwfDVlZmMyODdmYzQ4ODAxMDAxMzQ0ZjkyMyJ9.Ik-gd9-Wgsu-42E_9NAu1W5ZeeJM6VzNJMNEAJTJX4M'

      const device = new Device(deviceToken, FetchClient)
      const session = new Session(sessionToken)
      expect(device.id).toBe(session.deviceId)

      const authenticationManager = new AuthenticationManager(storageManager)
      await authenticationManager.setNewDevice(deviceToken)
      expect(await authenticationManager.deviceToken()).toBe(deviceToken)

      await authenticationManager.setSessionToken(sessionToken)
      expect(await authenticationManager.sessionToken()).toBe(sessionToken)
    })

    it('if there is a device set, and session points to a different device, throws error', async () => {
      const deviceToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoMC11c2VyaWQiOiJhdXRoMHw1ZWZjMjg3ZmM0ODgwMTAwMTM0NGY5MjMiLCJkZXZpY2UtZGVzYyI6ImJyb3dzZXItY2hyb21lIiwiZGV2aWNlLWlkIjoiMmVmMzFhMzAtNzc2Zi00N2EwLWIwODgtMjY0NzA2OTY2ZTUxIiwiaWF0IjoxNzEzNTE4NjU0LCJpc3MiOiJyTSBXZWJBcHAiLCJqdGkiOiJjazB0b2IvWEJNVT0iLCJuYmYiOjE3MTM1MTg2NTQsInN1YiI6InJNIERldmljZSBUb2tlbiJ9.F8mXEnr0NWiIKdCQpgSRa3jzajHZPqO8n647OLDyENw'
      const sessionToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJhdXRoMC1wcm9maWxlIjp7IlVzZXJJRCI6ImF1dGgwfDVlZmMyODdmYzQ4ODAxMDAxMzQ0ZjkyMyIsIklzU29jaWFsIjpmYWxzZSwiQ29ubmVjdGlvbiI6IlVzZXJuYW1lLVBhc3N3b3JkLUF1dGhlbnRpY2F0aW9uIiwiTmFtZSI6InBhc2N1MjE2QGdtYWlsLmNvbSIsIk5pY2tuYW1lIjoicGFzY3UyMTYiLCJHaXZlbk5hbWUiOiIiLCJGYW1pbHlOYW1lIjoiIiwiRW1haWwiOiJwYXNjdTIxNkBnbWFpbC5jb20iLCJFbWFpbFZlcmlmaWVkIjp0cnVlLCJDcmVhdGVkQXQiOiIyMDIwLTA3LTAxVDA2OjA5OjAzLjk0M1oiLCJVcGRhdGVkQXQiOiIyMDI0LTA0LTEwVDA2OjQ4OjQxLjUxWiJ9LCJiZXRhIjp0cnVlLCJkZXZpY2UtZGVzYyI6ImJyb3dzZXItY2hyb21lIiwiZGV2aWNlLWlkIjoiYmUwYzlmNGQtY2RjYi00MDVmLTk3NDQtZjgzNzJjYjdlNTlkIiwiZXhwIjoxNzEzMTc5NTIyLCJpYXQiOjE3MTMxNjg3MjIsImlzcyI6InJNIFdlYkFwcCIsImp0aSI6ImNrMHRZUFMxTGNJPSIsImxldmVsIjoiY29ubmVjdCIsIm5iZiI6MTcxMzE2ODcyMiwic2NvcGVzIjoiZG9jZWRpdCBod2NtYWlsOi0xIHN5bmM6dG9ydG9pc2UgaW50Z3IgbWFpbDotMSBzY3JlZW5zaGFyZSIsInN1YiI6ImF1dGgwfDVlZmMyODdmYzQ4ODAxMDAxMzQ0ZjkyMyJ9.Ik-gd9-Wgsu-42E_9NAu1W5ZeeJM6VzNJMNEAJTJX4M'

      const device = new Device(deviceToken, FetchClient)
      const session = new Session(sessionToken)
      expect(device.id).not.toBe(session.deviceId)

      const authenticationManager = new AuthenticationManager(storageManager)
      await authenticationManager.setNewDevice(deviceToken)
      expect(await authenticationManager.deviceToken()).toBe(deviceToken)

      await expect(authenticationManager.setSessionToken(sessionToken))
        .rejects.toThrow(UnknownSessionDeviceError)
    })

    it('if there is no device set, throws error', async () => {
      const authenticationManager = new AuthenticationManager(storageManager)

      await expect(authenticationManager.setSessionToken('sessionToken'))
        .rejects.toThrow(NoDevicePairedError)
    })
  })
})
