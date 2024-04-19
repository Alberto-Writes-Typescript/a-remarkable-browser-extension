import { sendToBackground } from '@plasmohq/messaging'
import React, { useCallback, useEffect, useState } from 'react'
import { Device } from 'a-remarkable-js-sdk'
import DeviceConnector from './components/options/deviceConnector'
import { type GetConfigurationMessageResponsePayload } from './background/messages/getConfiguration'
import Layout from './components/options/layout'
import { type PairMessageResponsePayload } from './background/messages/pair'
import Settings from './components/options/settings'
import { type UnpairMessageResponsePayload } from './background/messages/unpair'

import '../assets/css/style.css'

function Options (): React.ReactElement {
  const [device, setDevice] = useState<Device | null>(null)

  const pair = useCallback(async (oneTimeCode: string): Promise<Device | null> => {
    const pairResponse: PairMessageResponsePayload = await sendToBackground({ name: 'pair' })
    const device = new Device(pairResponse.deviceToken)
    setDevice(device)
    return device
  }, [])

  const unpair = useCallback(async (): Promise<void> => {
    const unpairResponse: UnpairMessageResponsePayload = await sendToBackground({ name: 'unpair' })
    if (unpairResponse.removedDeviceToken != null) setDevice(null)
  }, [])

  useEffect(() => {
    async function fetchDeviceFromConfiguration (): Promise<void> {
      const getConfigrationResponse: GetConfigurationMessageResponsePayload = await sendToBackground({ name: 'getConfiguration' })

      if (getConfigrationResponse.deviceToken != null) setDevice(new Device(getConfigrationResponse.deviceToken))
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
