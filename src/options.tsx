import { useState } from 'react'

import '../assets/css/style.css'

function Options (): React.ReactElement {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-16 bg-gray-50">
      <div className="h-fit min-h-[650px] w-[450px] flex flex-row border border-gray-400 rounded">
        <div className="w-10 bg-gray-400 relative">
          <p className="absolute bottom-6 left-1 text-xs text-white -rotate-90">v0.1.0</p>
        </div>
        <div className="flex-grow p-8 space-y-2">
          <h1 className="text-xl text-gray-500">Configuration</h1>
        </div>
      </div>
    </div>
  )
}

export default Options
