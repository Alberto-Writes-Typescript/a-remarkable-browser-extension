import React from 'react'
import ReactDOM from 'react-dom'

import '../assets/css/style.css'
import Welcome from './components/landingPage/welcome'

function LandingPage (): React.ReactElement {
  return <Welcome/>
}

ReactDOM.render(<LandingPage />, document.getElementById('root'))

export default LandingPage
