import React from 'react'
import Dashboard from './components/popup/dashboard'
import Welcome from './components/popup/welcome'

import '../assets/css/style.css'

function IndexPopup (): JSX.Element {
  return (
    <div className="min-w-[500px] mx-4 my-4 px-8 py-6 bg-gray-50 border border-gray-400">
      <Welcome/>
    </div>
  )
}

export default IndexPopup
