import { type PairMessageResponsePayload } from '../../background/messages/pair'
import { sendToBackground } from '@plasmohq/messaging'
import { useState } from 'react'

export default function PairDebuggerComponent (): React.ReactElement {
  const [oneTimeCode, setOneTimeCode] = useState('')
  const [deviceToken, setDeviceToken] = useState('')
  const [retrievingDeviceToken, setRetrievingDeviceToken] = useState(false)

  async function pair (): Promise<void> {
    setRetrievingDeviceToken(true)

    try {
      await sendToBackground({ name: 'unpair' })
      const response: PairMessageResponsePayload = await sendToBackground({ name: 'pair', body: { oneTimeCode } })
      setDeviceToken(response.deviceToken)
      setOneTimeCode('')
    } finally {
      setRetrievingDeviceToken(false)
    }
  }

  return (
    <div className="w-full space-y-3 overflow-hidden">
      <div className="w-full inline-flex gap-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full mt-[6px]"></div>

        <div className="grow">
          <h2 className="font-semibold text-sm">Pair Flow</h2>
          <p className="text-xs">Test extension can pair with reMarkable Cloud</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <input
            value={oneTimeCode}
            onChange={(e) => { setOneTimeCode(e.target.value); }}
            className="border-[1.5px] border-gray-400 py-[6px] px-2 text-xs rounded-lg" placeholder="one time code"/>
          {
            retrievingDeviceToken
              ? <button
                disabled={true}
                className="bg-gray-500 text-xs px-3 py-2 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300">
                pairing...
              </button>
              : <button
                onClick={pair}
                disabled={oneTimeCode.length !== 8}
                className="bg-gray-500 text-xs px-3 py-2 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300">
                pair
              </button>
          }
        </div>
      </div>

      <div className="ml-4 border border-gray-200 rounded-lg p-2 text-xs space-y-2">
        <h2 className="font-semibold">Pair outcome</h2>
        {
          retrievingDeviceToken
            ? <p>Waiting for token to be retrieved...</p>
            : <p className="line-clamp-1 max-w-[300px]">{deviceToken === '' ? 'No pairing requested' : deviceToken}</p>
        }
      </div>
    </div>
  )
}
