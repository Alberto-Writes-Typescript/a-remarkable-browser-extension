import React, { useState } from 'react'

import '../assets/css/style.css'
import PairingWizard from './options/pairingWizard'

function Options (): React.ReactElement {
  const [deviceToken, setDeviceToken] = useState(null)

  function paired (): boolean {
    return deviceToken !== null
  }

  function deviceTokenManager (): React.ReactElement {
    return <p>Paired</p>
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center p-16 bg-gray-50 text-gray-400 text-xs">
      <div className="h-fit min-h-[650px] w-[450px] flex flex-row border border-gray-400 rounded">
        <div className="w-20 bg-gray-400 relative">
          <p className="absolute bottom-6 text-xs text-white -rotate-90">v0.1.0</p>
        </div>
        <div className="grow p-8 space-y-4">
          <h1 className="text-xl">Configuration</h1>

          { paired() ? deviceTokenManager() : PairingWizard() }
        </div>
      </div>
    </div>
  )
}

export default Options
