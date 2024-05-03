import { filesize } from 'filesize'
import React from 'react'
import type DocumentPreview from '../../lib/models/DocumentPreview'
import DescriptionList, { DescriptionListDescription, DescriptionListTerm } from '../common/descriptionList'
import Heading from '../common/heading'
import Input from '../common/input'

export interface UploadOverviewProps {
  documentPreview?: DocumentPreview
  fileName?: string
  setFileName: (fileName: string) => void
}

export default function UploadOverview ({ documentPreview, fileName, setFileName }: UploadOverviewProps): React.ReactElement {
  const uploadFileName = fileName ?? documentPreview?.name ?? '-'
  const uploadFileSize = (documentPreview != null) ? filesize(documentPreview.size) : '-'

  return (
    <div className="w-[320px] flex flex-col gap-4 px-6 py-4 bg-gray-50 border border-gray-200">
      <Heading as="h3">upload information</Heading>
      <DescriptionList>
        <DescriptionListTerm>name</DescriptionListTerm>
        <DescriptionListDescription>
          <Input
            size="small"
            variant="transparent"
            value={uploadFileName}
            placeholder="insert document name"
            onChange={({ target: { value } }) => { setFileName(value) }}/>
        </DescriptionListDescription>

        <DescriptionListTerm>size</DescriptionListTerm>
        <DescriptionListDescription>{uploadFileSize}</DescriptionListDescription>

        <DescriptionListTerm>destination</DescriptionListTerm>
        <DescriptionListDescription>root</DescriptionListDescription>
      </DescriptionList>
    </div>
  )
}
