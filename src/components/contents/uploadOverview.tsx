import React from 'react'
import DescriptionList from '../common/descriptionList'
import Heading from '../common/heading'
import { type WebPdfDocument } from '../../lib/models/WebPdfDocument'

export interface UploadOverviewProps {
  webDocument?: WebPdfDocument
}

export default function UploadOverview ({ webDocument }: UploadOverviewProps): React.ReactElement {
  return (
    <div className="w-[320px] flex flex-col gap-4 px-6 py-4 bg-gray-50 border border-gray-200">
      <Heading as="h3">upload information</Heading>
      <DescriptionList listItems={ { name: webDocument?.name, size: webDocument?.size, destination: 'root' } }/>
    </div>
  )
}
