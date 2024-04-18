import React from 'react'
import Button from '../common/button'
import Heading from '../common/heading'
import type { Device } from 'a-remarkable-js-sdk'

interface SettingsProps {
  device: Device
  unpair: () => Promise<void>
}

function Settings ({ device, unpair }: SettingsProps): React.ReactElement {
  return (
    <div className="w-full h-full space-y-8 text-gray-600">
      <Heading>Configuration</Heading>

      <div className="space-y-4">
        <Heading as="h3">reMarkable Cloud Connection</Heading>

        <div className="border border-gray-500 p-3 space-y-2 text-sm">
          <p className="font-thin">Device <span className="!font-normal float-right">{device.id}</span></p>
          <hr/>
          <p className="font-thin">Connected at <span className="!font-normal float-right">12.12.2024</span></p>
        </div>

        <div className="w-full inline-flex gap-4 justify-center">
          <Button onClick={unpair}>Disconnect</Button>
        </div>
      </div>
    </div>
  )
}

export default Settings
