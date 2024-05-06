import React, { useCallback, useEffect, useState } from 'react'
import { Device } from 'a-remarkable-js-sdk'
import DeviceConnector from './components/options/deviceConnector'
import Layout from './components/options/layout'
import MessageManager from './lib/services/MessageManager'
import Settings from './components/options/settings'

import '../assets/css/style.css'

function Options (): React.ReactElement {
  const [device, setDevice] = useState<Device | null>(null)

  const pair = useCallback(async (oneTimeCode: string): Promise<Device | null> => {
    const pairResponse = await MessageManager.sendPairMessage(oneTimeCode)
    const device = new Device(pairResponse.deviceToken)
    setDevice(device)

    return device
  }, [])

  const unpair = useCallback(async (): Promise<void> => {
    const unpairResponse = await MessageManager.sendUnpairMessage()
    if (unpairResponse.removedDeviceToken != null) setDevice(null)
  }, [])

  useEffect(() => {
    async function fetchDeviceFromConfiguration (): Promise<void> {
      const getConfigurationResponse = await MessageManager.sendGetConfigurationMessage()

      if (getConfigurationResponse.deviceToken != null) {
        setDevice(new Device(getConfigurationResponse.deviceToken))
      }
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
