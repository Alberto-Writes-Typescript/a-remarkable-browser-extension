import { sendToBackground } from '@plasmohq/messaging'
import { type UploadMessagePayload } from './background/messages/upload'
import { useState } from 'react'

import '../assets/css/style.css'

function IndexPopup (): JSX.Element {
  const [data, setData] = useState('')

  async function sendMessage (): Promise<void> {
    const messagePayload = { url: 'my URL' } satisfies UploadMessagePayload
    await sendToBackground({ name: 'upload', body: messagePayload })
  }

  return (
    <div>
      <h2>
        Test Dashboard
      </h2>

      <input onChange={(e) => { setData(e.target.value) }} value={data} />

      <button onClick={sendMessage}>Send Message</button>
    </div>
  )
}

export default IndexPopup
