import React from 'react'
import { type Device } from 'a-remarkable-js-sdk'
import DocumentUploader from './documentUploader'
import Heading from '../common/heading'

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
      <DocumentUploader/>
    </div>
  )
}

export default Dashboard
