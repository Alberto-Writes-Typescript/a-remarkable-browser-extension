import React, { useState } from 'react'
import { type Device } from 'a-remarkable-js-sdk'
import DeviceConnector from './components/options/deviceConnector'
import Layout from './components/options/layout'
import Settings from './components/options/settings'

import '../assets/css/style.css'

function Options (): React.ReactElement {
  const [device, setDevice] = useState<Device | null>(null)

  return (
    <Layout>
      <div className="h-full w-full p-8 space-y-4">
        { device != null ? <Settings/> : <DeviceConnector/> }
      </div>
    </Layout>
  )
}

export default Options
