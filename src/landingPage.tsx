import React from 'react'
import { createRoot } from 'react-dom/client'

import '../assets/css/style.css'
import Welcome from './components/landingPage/welcome'

function LandingPage (): React.ReactElement {
  return <Welcome/>
}

const container = document.getElementById('root')

if (container != null) {
  const root = createRoot(container)
  root.render(<LandingPage/>)
}

console.log(container)