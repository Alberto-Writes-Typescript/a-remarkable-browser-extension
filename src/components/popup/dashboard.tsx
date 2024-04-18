import React from 'react'
import { type Device } from 'a-remarkable-js-sdk'
import Button from '../common/button'
import Heading from '../common/heading'
import Input from '../common/input'

interface DashboardProps {
  device: Device
}

function Dashboard ({ device }: DashboardProps): React.ReactElement {
  return (
    <div className="space-y-4">
      <Heading as="h3">uploads</Heading>

      <div className="flex items-center justify-center border border-gray-300 p-8">
        <p className="text-gray-300">No web document was uploaded</p>
      </div>

      <Heading as="h3">upload document</Heading>

      <div className="flex flex-col gap-10 text-sm border border-gray-500 p-4">
        <div className="inline-flex gap-6 divide-x-[1px] divide-gray-700">
          <div className="flex-1 space-y-4">
            <div className="flex flex-col">
              <label className="text-[10px] text-gray-400 font-semibold">name</label>
              <Input size="small"/>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-400 font-semibold">url</label>
              <Input size="small"/>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-400 font-semibold">destination</label>
              <Input size="small"/>
            </div>
          </div>

          <div className="w-[140px] pl-6 pr-2">
            <div className="border border-gray-400 w-full h-full"></div>
          </div>
        </div>

        <Button>upload to reMarkable</Button>
      </div>
    </div>
  )
}

export default Dashboard
