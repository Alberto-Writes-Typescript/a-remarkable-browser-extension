import { sendToBackground } from '@plasmohq/messaging'
import React from 'react'
import Button from '../common/button'
import Input from '../common/input'

function DocumentUploader (): React.ReactElement {
  const [webDocumentName, setWebDocumentName] = React.useState<string>('')
  const [webDocumentUrl, setWebDocumentUrl] = React.useState<string>('')
  const [uploading, setUploading] = React.useState<boolean>(false)

  async function upload (): Promise<void> {
    if (canUpload()) {
      setUploading(true)
      try {
        await sendToBackground({ name: 'upload', body: { name: webDocumentName, webDocumentUrl } })
        setWebDocumentName('')
        setWebDocumentUrl('')
      } finally {
        setUploading(false)
      }
    }
  }

  function canUpload (): boolean {
    return webDocumentName.length > 0 && webDocumentUrl.length > 0
  }

  return (
    <div className="flex flex-col gap-10 text-smp-4">
      <div className="inline-flex gap-6 divide-x-[1px] divide-gray-700">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col">
            <label className="text-[10px] text-gray-400 font-semibold">name</label>
            <Input size="sm"
                  value={webDocumentName}
                  onChange={({ target: { value } }) => { setWebDocumentName(value as string) }}/>
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] text-gray-400 font-semibold">url</label>
            <Input size="sm"
                   value={webDocumentUrl}
                   onChange={({ target: { value } }) => { setWebDocumentUrl(value as string) }}/>
          </div>
        </div>

        <div className="w-[140px] pl-6 pr-2">
          <div className="border border-gray-400 w-full h-full"></div>
        </div>
      </div>

      <Button onClick={upload} disabled={!canUpload() || uploading}>
        { uploading ? 'uploading...' : 'upload to reMarkable' }
      </Button>
    </div>
  )
}

export default DocumentUploader
