import { filesize } from 'filesize'
import React from 'react'

import type DocumentPreview from '../../lib/models/DocumentPreview'
import Icon from '../common/icon'
import Input from '../common/input'

export interface UploadOverviewProps {
  documentPreview?: DocumentPreview
  fileName?: string
  setFileName: (fileName: string) => void
}

export default function UploadOverview ({ documentPreview, fileName, setFileName }: UploadOverviewProps): React.ReactElement {
  const uploadFileName = fileName ?? documentPreview?.name ?? '-'
  const uploadFileSize = (documentPreview != null) ? filesize(documentPreview.size) : '-'

  let uploadHost = '-'
  if (documentPreview != null) uploadHost = new URL(documentPreview.url).host

  // TODO: horizontal description list & input component with labels
  return (
    <div className="w-[300px] px-4 py-3 divide-y divide-dashed !bg-white text-xs text-gray-400 border border-gray-700">
      <div className='inline-flex gap-2 pb-4'>
        <Icon icon='document' size='xs'/>
        <div className='flex-1'>
          <p className="text-gray-700">{documentPreview?.name}</p>
          <p className='font-thin space-x-1'>
            <span>url:</span>
            <a href={documentPreview?.url} target='_blank' rel='noreferrer'
               className="cursor-pointer text-gray-700 underline decoration-dashed underline-offset-4">
              {uploadHost}
            </a>
            <span>|</span>
            <span>size:</span>
            <span className='text-gray-700'>{uploadFileSize}</span>
          </p>
        </div>
      </div>

      <div className='inline-flex gap-2 pt-3'>
        <Icon icon='cog' size='xs'/>

        <div className='flex-1 space-y-1.5'>
          <p className='text-gray-700 font-thin'>Upload parameters</p>

          <div className='space-y-1'>
            <div className='w-full inline-flex items-center gap-3'>
              <label className='font-thin'>name:</label>
              <Input variant='transparent' size='xs' className='flex-1'
                     value={uploadFileName} onChange={({ target: { value } }) => { setFileName(value as string) }}/>
            </div>

            <div className='w-full inline-flex items-center gap-3'>
              <label className='font-thin'>folder:</label>
              <Input variant='transparent' size='xs' disabled className='flex-1' value='root'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
