import React, { useEffect, useState } from 'react'
import Dashboard from './components/popup/dashboard'
import Welcome from './components/popup/welcome'

import '../assets/css/style.css'
import { Device } from 'a-remarkable-js-sdk'
import DocumentPreview from './lib/models/DocumentPreview'
import MessageManager from './lib/services/MessageManager'

function IndexPopup (): React.ReactElement {
  const [device, setDevice] = useState<Device | null>(null)

  async function getDocumentPreview (url: string): Promise<DocumentPreview> {
    const documentPreviewResponse = await MessageManager.sendGetDocumentPreviewMessage(url)

    try {
      return new DocumentPreview(documentPreviewResponse.url, documentPreviewResponse.size)
    } catch (error) {
      return error
    }
  }

  async function uploadDocument (fileName: string, url: string): Promise<null | Error> {
    try {
      await MessageManager.sendUploadMessage(fileName, url)
      return null
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    async function fetchDeviceFromConfiguration (): Promise<void> {
      const getConfigrationResponse = await MessageManager.sendGetConfigurationMessage()
      if (getConfigrationResponse.deviceToken != null) setDevice(new Device(getConfigrationResponse.deviceToken))
    }

    void fetchDeviceFromConfiguration().then(r => {})
  }, [])

  return (
    <div className='p-4'>
      { device != null ? <Dashboard device={device} getDocumentPreview={getDocumentPreview} uploadDocument={uploadDocument}/> : <Welcome/> }
    </div>
  )
}

export default IndexPopup
