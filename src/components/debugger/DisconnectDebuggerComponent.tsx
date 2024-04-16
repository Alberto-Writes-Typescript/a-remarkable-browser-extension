import { type GetConfigurationMessageResponsePayload } from '../../../src/background/messages/getConfiguration'
import { sendToBackground } from '@plasmohq/messaging'
import { Storage } from '@plasmohq/storage'
import { useEffect, useState } from 'react'

export default function DisconnectDebuggerComponent (): React.ReactElement {
  const [sessionToken, setSessionToken] = useState('')
  const [retrievingSessionToken, setRetrievingSessionToken] = useState(false)

  /**
   * Fetches the device token from the background script when the component mounts.
   */
  useEffect(() => {
    const fetchDeviceToken = async (): Promise<void> => {
      setRetrievingSessionToken(true)

      try {
        const response: GetConfigurationMessageResponsePayload = await sendToBackground({ name: 'getConfiguration' })
        setSessionToken(response.sessionToken ?? '')
      } finally {
        setRetrievingSessionToken(false)
      }
    }

    void fetchDeviceToken()
  }, [])

  /**
   * Watches for changes in the storage to update the current device token
   */
  useEffect(() => {
    const storage = new Storage()

    storage.watch({
      sessionToken: (sessionTokenChange) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setSessionToken(sessionTokenChange.newValue)
      }
    })
  })

  async function disconnect (): Promise<void> {
    await sendToBackground({ name: 'disconnect' })
    setSessionToken('')
  }

  return (
    <div className="w-full space-y-3 overflow-hidden">
      <div className="w-full inline-flex gap-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full mt-[6px]"></div>

        <div className="grow">
          <h2 className="font-semibold text-sm">Disconnect Flow</h2>
          <p className="text-xs">Test extension can disconnect from reMarkable Cloud</p>
        </div>

        <div className="flex items-center justify-center">
          {
            retrievingSessionToken
              ? <button disabled={true}
                        className="bg-gray-500 text-xs px-3 py-2 text-white rounded-lg bg-gray-300">
                disconnect
              </button>
              : <button disabled={sessionToken === ''}
                        onClick={disconnect}
                        className="bg-gray-500 text-xs px-3 py-2 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300">
                disconnect
              </button>
          }
        </div>
      </div>

      <div className="ml-4 border border-gray-200 rounded-lg p-2 text-xs space-y-2">
        <h2 className="font-semibold">Disconnect outcome</h2>
        {
          retrievingSessionToken
            ? <p>Loading current token from storage...</p>
            : <p className="line-clamp-1 max-w-[300px]">{sessionToken !== '' ? sessionToken : 'No device token in store'}</p>
        }
      </div>
    </div>
  )
}
