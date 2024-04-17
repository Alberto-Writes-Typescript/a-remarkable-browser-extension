import React, { useCallback, useState } from 'react'
import { Device } from 'a-remarkable-js-sdk'
import ConnectionManager from './lib/services/remarkable/ConnectionManager'
import DeviceConnector from './components/options/deviceConnector'
import Layout from './components/options/layout'
import Settings from './components/options/settings'

import '../assets/css/style.css'

function Options (): React.ReactElement {
  const [device, setDevice] = useState<Device | null>(null)

  const pairDevice = useCallback(async (oneTimeCode: string): Promise<Device | null> => {
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

  return (
    <Layout>
      <div className="h-full w-full p-8 space-y-4">
        { device != null ? <Settings/> : <DeviceConnector pairDevice={pairDevice}/> }
      </div>
    </Layout>
  )
}

export default Options
