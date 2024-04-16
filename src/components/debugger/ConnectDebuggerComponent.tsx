import { type ConnectMessageResponsePayload } from '../../background/messages/connect'
import { sendToBackground } from '@plasmohq/messaging'
import { useState } from 'react'

export default function ConnectDebuggerComponent (): React.ReactElement {
  const [sessionToken, setSessionToken] = useState('')

  async function connect (): Promise<void> {
    const response: ConnectMessageResponsePayload = await sendToBackground({ name: 'connect' })
    setSessionToken(response.sessionToken)
  }

  return (
    <div className="space-y-3">
      <div className="w-full inline-flex gap-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full mt-[6px]"></div>

        <div className="grow">
          <h2 className="font-semibold text-sm">Connect Flow</h2>
          <p className="text-xs">Test extension can connect with reMarkable Cloud</p>
        </div>

        <div className="flex items-center justify-center">
          <button onClick={connect} className="bg-gray-500 text-xs px-3 py-2 text-white rounded-lg hover:bg-gray-700">
            connect
          </button>
        </div>
      </div>

      <div className="ml-4 border border-gray-200 rounded-lg p-2 text-xs space-y-2">
        <h2 className="font-semibold">Pair outcome</h2>
        <p className="line-clamp-1 max-w-[300px]">{sessionToken === '' ? 'NO SESSION CONNECTED YET' : sessionToken}</p>
      </div>
    </div>
  )
}
