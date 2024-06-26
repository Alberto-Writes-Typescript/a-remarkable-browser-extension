import React, { useRef } from 'react'
import Button from '../common/button'
import Heading from '../common/heading'

function Welcome (): React.ReactElement {
  const extensionIdRef = useRef('egdpalgnbmgehpebjmkklcfkggadmglp')

  return (
    <div className="h-full w-[400px] flex flex-col items-center justify-center gap-6 m-auto">
      <Heading>No device connected</Heading>
      <p className="text-sm font-normal text-gray-600 text-center">
        Start uploading documents to your reMarkable tablet by pairing
        your device with this extension
      </p>

      <Button as="a" size="base" href={`chrome-extension://${extensionIdRef.current}/options.html`} target="_blank">
        open extension settings
      </Button>
    </div>
  )
}

export default Welcome
