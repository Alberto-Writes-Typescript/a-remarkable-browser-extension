import React from 'react'
import Dashboard from './components/popup/dashboard'

import '../assets/css/style.css'

function IndexPopup (): JSX.Element {
  return (
    <div className="px-8 py-6 min-w-[500px]">
      <Dashboard device={null}/>
    </div>
  )
}

export default IndexPopup
