import { filesize } from 'filesize'
import React from 'react'
import type DocumentPreview from '../../lib/models/DocumentPreview'
import DescriptionList from '../common/descriptionList'
import Heading from '../common/heading'

export interface UploadOverviewProps {
  documentPreview?: DocumentPreview
  name?: string
}

export default function UploadOverview ({ documentPreview, name }: UploadOverviewProps): React.ReactElement {
  const uploadFileName = name ?? documentPreview?.name ?? '-'
  const uploadFileSize = (documentPreview != null) ? filesize(documentPreview.size) : '-'

  return (
    <div className="w-[320px] flex flex-col gap-4 px-6 py-4 bg-gray-50 border border-gray-200">
      <Heading as="h3">upload information</Heading>
      <DescriptionList listItems={ { name: uploadFileName, size: uploadFileSize, destination: 'root' } }/>
    </div>
  )
}
