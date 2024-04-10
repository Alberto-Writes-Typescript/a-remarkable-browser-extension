import { useState } from 'react'

import '../assets/css/style.css'

function IndexPopup (): JSX.Element {
  const [data, setData] = useState('')

  return (
    <div className="bg-black">
      <h2>
        Welcome to your{' '}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{' '}
        Extension!
      </h2>
      <input onChange={(e) => { setData(e.target.value) }} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup