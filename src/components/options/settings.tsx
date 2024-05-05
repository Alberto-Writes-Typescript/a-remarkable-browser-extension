import React from 'react'
import Button from '../common/button'
import Heading from '../common/heading'
import type { Device } from 'a-remarkable-js-sdk'
import DescriptionList from '../common/descriptionList'

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

        <DescriptionList listItems={ { Device: device.id, 'Connected at': '12.12.2024' } }/>

        <div className="w-full inline-flex gap-4 justify-center">
          <Button size="base" onClick={unpair}>Disconnect</Button>
        </div>
      </div>
    </div>
  )
}

export default Settings
