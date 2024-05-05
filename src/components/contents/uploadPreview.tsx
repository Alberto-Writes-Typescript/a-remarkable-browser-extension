import { filesize } from 'filesize'
import React from 'react'
import type DocumentPreview from '../../lib/models/DocumentPreview'
import Icon from '../common/icon'

export interface UploadOverviewProps {
  documentPreview?: DocumentPreview
  fileName?: string
  setFileName: (fileName: string) => void
}

export default function UploadOverview ({ documentPreview, fileName, setFileName }: UploadOverviewProps): React.ReactElement {
  const uploadFileName = fileName ?? documentPreview?.name ?? '-'
  const uploadFileSize = (documentPreview != null) ? filesize(documentPreview.size) : '-'

  return (
    <div className="w-[300px] px-4 py-3 inline-flex items-center justify-between text-gray-400 border border-gray-700">
      <div>
        <Icon icon='document' size='base'/>
        <p>a</p>
      </div>
    </div>
  )
}
