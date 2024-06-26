import React, { useState } from 'react'
import { type Device } from 'a-remarkable-js-sdk'
import Button from '../common/button'
import Heading from '../common/heading'
import Input from '../common/input'

interface DeviceConnectorProps {
  pair: (oneTimeCode: string) => Promise<Device | null>
}

function DeviceConnector ({ pair }: DeviceConnectorProps): React.ReactElement {
  const [oneTimeCode, setOneTimeCode] = React.useState<string>('')
  const [retryPairing, setRetryPairing] = React.useState<boolean>(false)
  const [pairing, setPairing] = useState<boolean>(false)

  function validOneTimeCode (code): boolean {
    return code.length === 8
  }

  async function submitOneTimeCode ({ target: { value } }): Promise<void> {
    setRetryPairing(false)
    setOneTimeCode(value as string)

    if (validOneTimeCode(value)) {
      setPairing(true)

      try {
        await pair(value as string)
      } catch (error) {
        setPairing(false)
        setRetryPairing(true)
      } finally {
        setPairing(false)
      }
    }
  }

  return (
    <div className="h-full w-[90%] flex flex-col items-center justify-center gap-10 m-auto">
      <Heading>Let's pair with your device</Heading>
      <p className="text-sm font-normal text-gray-600 text-justified">
        To upload web documents your reMarkable tablet, you need to pair
        this extension with your reMarkable account. Request a one time
        code and paste it here create a connection between the device
        and the extension
      </p>

      <Button as="a" size="base" href="https://my.remarkable.com/device/remarkable" target="_blank">
        request one time code
      </Button>

      <div className="flex flex-col space-y-1 items-center">
        <Input variant="oneTimeCode"
               disabled={pairing}
               value={oneTimeCode}
               onChange={submitOneTimeCode}/>
        <label htmlFor="one-time-code" className="text-xs italic">
          {
            retryPairing
              ? 'something went wrong during pairing, please try again'
              : pairing
                ? 'pairing with your device...'
                : 'paste your code here'
          }
        </label>
      </div>
    </div>
  )
}

export default DeviceConnector
