import React, {useEffect, useState} from 'react'
import Dashboard from './components/popup/dashboard'
import Welcome from './components/popup/welcome'

import '../assets/css/style.css'
import ConfigurationManager from './lib/services/ConfigurationManager'
import { Device } from 'a-remarkable-js-sdk'

function IndexPopup (): React.ReactElement {
  const [device, setDevice] = useState<Device | null>(null)

  useEffect(() => {
    async function fetchDeviceFromConfiguration (): Promise<void> {
      const configurationManager = new ConfigurationManager()
      const deviceToken = await configurationManager.deviceToken()

      if (deviceToken != null) setDevice(new Device(deviceToken))
    }

    void fetchDeviceFromConfiguration().then(r => {})
  }, [])

  return (
    <div className="min-w-[500px] mx-4 my-4 p-6 bg-gray-50 border border-gray-400">
      { device != null ? <Dashboard device={device}/> : <Welcome/> }
    </div>
  )
}

export default IndexPopup
