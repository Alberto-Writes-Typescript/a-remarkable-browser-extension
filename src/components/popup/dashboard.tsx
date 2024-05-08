import React from 'react'

import { type Device } from 'a-remarkable-js-sdk'
import DocumentUploader from './documentUploader'
import type DocumentPreview from '../../lib/models/DocumentPreview'
import Icon from '../common/icon'
import IconButton from '../common/iconButton'

interface DashboardProps {
  device: Device
  getDocumentPreview: (string) => Promise<DocumentPreview>
  uploadDocument: (fileName: string, url: string) => Promise<null | Error>
}

function Dashboard ({ device, getDocumentPreview, uploadDocument }: DashboardProps): React.ReactElement {
  return (
    <div className="w-[500px] min-h-[200px] flex flex-col bg-gray-50 divide-y divide-gray-400 border border-gray-400">
      <div className="inline-flex items-center justify-between">
        <Icon icon='logo' size='lg' className='h-[38px] -mt-3 ml-3'/>

        <div className='inline-flex'>
          <IconButton icon="cog" size="lg" variant="transparent"/>
        </div>
      </div>

      <div className="flex-1 inline-flex divide-x divide-gray-400">
        <div>
          <IconButton icon="documentUpload" size="lg" variant="transparent"/>
          <IconButton icon="queue" size="lg" variant="transparent"/>
          <IconButton icon="heart" size="lg" variant="transparent"/>
        </div>

        <div className='flex-grow'>
          <DocumentUploader getDocumentPreview={getDocumentPreview} uploadDocument={uploadDocument}/>
        </div>
      </div>

      <div className="h-8 px-3 flex items-center text-[10px] text-gray-700 font-thin italic">
        <p><b>a</b> <b>r</b>eMarkable <b>b</b>rowser <b>e</b>xtension - by <a className='underline underline-offset-2 decoration-dashed'>Alberto Hernandez Cerezo</a></p>
      </div>
    </div>
  )
}

export default Dashboard
