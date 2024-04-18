import React, { useCallback, useEffect, useState } from 'react'
import { Device } from 'a-remarkable-js-sdk'
import ConfigurationManager from './lib/services/ConfigurationManager'
import ConnectionManager from './lib/services/remarkable/ConnectionManager'
import DeviceConnector from './components/options/deviceConnector'
import Layout from './components/options/layout'
import Settings from './components/options/settings'

import '../assets/css/style.css'

function Options (): React.ReactElement {
  const [device, setDevice] = useState<Device | null>(null)

  const pair = useCallback(async (oneTimeCode: string): Promise<Device | null> => {
    const connectionManager = new ConnectionManager()

    try {
      const deviceToken = await connectionManager.pair(oneTimeCode)

      const device = new Device(deviceToken)

      setDevice(device)

      return device
    } catch (error) {
      return null
    }
  }, [])

  const unpair = useCallback(async (): Promise<void> => {
    const connectionManager = new ConnectionManager()

    await connectionManager.unpair()

    setDevice(null)
  }, [])

  useEffect(() => {
    async function fetchDeviceFromConfiguration (): Promise<void> {
      const configurationManager = new ConfigurationManager()
      const deviceToken = await configurationManager.deviceToken()

      if (deviceToken != null) setDevice(new Device(deviceToken))
    }

    void fetchDeviceFromConfiguration().then(r => {})
  }, [])

  return (
    <Layout>
      <div className="h-full w-full p-8 space-y-4">
        { device != null ? <Settings device={device} unpair={unpair}/> : <DeviceConnector pair={pair}/> }
      </div>
    </Layout>
  )
}

export default Options
