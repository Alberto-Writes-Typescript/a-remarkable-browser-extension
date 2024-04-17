import { sendToBackground } from '@plasmohq/messaging'
import { Storage } from '@plasmohq/storage'
import { useEffect, useState } from 'react'
import { type GetConfigurationMessageResponsePayload } from '~src/background/messages/getConfiguration'

export default function UnpairDebuggerComponent (): React.ReactElement {
  const [deviceToken, setDeviceToken] = useState('')
  const [retrievingDeviceToken, setRetrievingDeviceToken] = useState(false)

  /**
   * Fetches the device token from the background script when the component mounts.
   */
  useEffect(() => {
    const fetchDeviceToken = async (): Promise<void> => {
      setRetrievingDeviceToken(true)

      try {
        const response: GetConfigurationMessageResponsePayload = await sendToBackground({ name: 'getConfiguration' })
        setDeviceToken(response.deviceToken ?? '')
      } finally {
        setRetrievingDeviceToken(false)
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
      deviceToken: (deviceTokenChange) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setDeviceToken(deviceTokenChange.newValue)
      }
    })
  })

  async function unpair (): Promise<void> {
    await sendToBackground({ name: 'unpair' })
    setDeviceToken('')
  }

  return (
    <div className="w-full space-y-3 overflow-hidden">
      <div className="w-full inline-flex gap-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full mt-[6px]"></div>

        <div className="grow">
          <h2 className="font-semibold text-sm">Unpair Flow</h2>
          <p className="text-xs">Test extension can pair with reMarkable Cloud</p>
        </div>

        <div className="flex items-center justify-center">
          {
            retrievingDeviceToken
              ? <button disabled={true}
                        className="bg-gray-500 text-xs px-3 py-2 text-white rounded-lg bg-gray-300">
                unpair
              </button>
              : <button disabled={deviceToken === ''}
                        onClick={unpair}
                        className="bg-gray-500 text-xs px-3 py-2 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300">
                unpair
              </button>
          }
        </div>
      </div>

      <div className="ml-4 border border-gray-200 rounded-lg p-2 text-xs space-y-2">
        <h2 className="font-semibold">Unpair outcome</h2>
        {
          retrievingDeviceToken
            ? <p>Loading current token from storage...</p>
            : <p className="line-clamp-1 max-w-[300px]">{deviceToken !== '' ? deviceToken : 'No device token in store'}</p>
        }
      </div>
    </div>
  )
}
