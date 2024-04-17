import React, { useState } from 'react'
import Layout from './components/options/layout'
import Settings from './components/options/settings'

import '../assets/css/style.css'

function Options (): React.ReactElement {
  return (
    <Layout>
      <div className="p-8 space-y-4">
        <Settings/>
      </div>
    </Layout>
  )
}

export default Options
