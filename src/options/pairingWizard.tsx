import React, { useState } from 'react'

function PairingWizard (): React.ReactElement {
  return (
    <div className="space-y-4 pr-8">
      <div className="inline-flex gap-2 items-center">
        <div className="h-2 w-2 rounded-full bg-gray-500 animate-pulse"></div>
        <h2 className="text-sm text-gray-500">Connect to reMarkable</h2>
      </div>
      <hr/>
      <p className="text-xs">
        Let's pair ARCE with your reMarkable tablet to start uploading your
        documents from the web to your device.
      </p>
      <p>
        Go to myRemarkable page, request a One-Time code and paste it here.
        Then, click on the "pair" button to connect your reMarkable account
        with the extension.
      </p>

      <form className="flex flex-col gap-4 items-start">
        <input
          type="text"
          name="one_time_code"
          placeholder="AXRDFASR"
          className="p-2 bg-transparent border-b-[1.5px] border-gray-200 w-fit hover:border-gray-400 focus:border-gray-400"/>

        <button type="submit"
                className="px-4 py-[7px] rounded-full uppercase bg-gray-500 text-white text-[10px] hover:bg-gray-600">connect
        </button>
      </form>
    </div>
  )
}

export default PairingWizard
