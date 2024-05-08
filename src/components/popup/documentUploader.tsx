import React, { useState } from 'react'

import type DocumentPreview from '../../lib/models/DocumentPreview'
import Button from '../common/button'
import Heading from '../common/heading'
import Input from '../common/input'
import UploadPreview from '../common/uploadPreview'

// TODO: this should be handled together with the status update with a state machine
const BUTTON_LABEL = {
  waiting: 'upload to reMarkable',
  uploading: 'uploading...',
  uploaded: 'uploaded',
  failed: 'upload failed, try again'
}

export interface DocumentUploaderProps {
  getDocumentPreview: (string) => Promise<DocumentPreview>
  uploadDocument: (fileName: string, folder: string) => Promise<null | Error>
}

function DocumentUploader ({ getDocumentPreview, uploadDocument }: DocumentUploaderProps): React.ReactElement {
  const [url, setUrl] = React.useState<string>('')
  const [documentPreview, setDocumentPreview] = React.useState<DocumentPreview | null>(null)
  const [fileName, setFileName] = React.useState<string | undefined>(undefined)
  const [uploadStatus, setUploadStatus] = useState<string>('waiting')

  // Document Preview logic
  // ----------------------
  async function loadDocumentPreview (documentUrl: string): Promise<void> {
    const previousDocumentUrl = url

    setUrl(documentUrl)

    if (documentUrl != null && documentUrl !== '' && documentUrl !== previousDocumentUrl) {
      try {
        const documentPreview = await getDocumentPreview(documentUrl)
        setDocumentPreview(documentPreview)
        setFileName(documentPreview.name)
        setUploadStatus('waiting')
      } catch {
        setDocumentPreview(null)
        setFileName(undefined)
      }
    }
  }

  // Upload logic
  // ------------
  async function startUpload (): Promise<void> {
    if (fileName == null || documentPreview == null) return

    setUploadStatus('uploading')

    try {
      await uploadDocument(fileName, documentPreview.url)
      setUploadStatus('uploaded')
      setFileName(undefined)
      setUrl('')
    } catch {
      setUploadStatus('failed')
    }
  }

  return (
    <div className='h-full w-full px-8 pt-4 pb-8 space-y-2'>
      <div className='w-full flex flex-col items-start justify-center gap-4'>
        <Heading as='h2' leadingIcon='documentUpload' className='text-gray-700'>upload document</Heading>

        {
          uploadStatus === 'uploading'
            ? (
            <Input
              variant="box"
              label="Document name"
              disabled
              placeholder="Enter document URL..."
              className='w-full'
              size='sm'/>
              )
            : (
            <Input
              variant="box"
              label="Document name"
              value={url}
              onChange={async ({ target: { value } }) => { await loadDocumentPreview(value as string) }}
              placeholder="Enter document URL..."
              className='w-full'
              size='sm'/>)
        }
      </div>

      <div className='flex-grow'>
        {documentPreview != null && (
          <div className='contents space-y-2'>
            <UploadPreview
              documentPreview={documentPreview}
              className='w-full'
              fileName={fileName}
              setFileName={setFileName}/>

            <Button className='w-full'
                    disabled={uploadStatus === 'uploading' || uploadStatus === 'uploaded'}
                    onClick={async (): Promise<void> => { await startUpload() }}
                    size='base'>
              { BUTTON_LABEL[uploadStatus] }
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentUploader
