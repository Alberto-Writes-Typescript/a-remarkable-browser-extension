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
    return new DocumentPreview(documentPreviewResponse.url, documentPreviewResponse.size)
  }

  async function uploadDocument (fileName: string, url: string): Promise<null> {
    await MessageManager.sendUploadMessage(fileName, url)
    return null
  }

  useEffect(() => {
    async function fetchDeviceFromConfiguration (): Promise<void> {
      const getConfigurationResponse = await MessageManager.sendGetConfigurationMessage()
      if (getConfigurationResponse.deviceToken != null) setDevice(new Device(getConfigurationResponse.deviceToken))
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
