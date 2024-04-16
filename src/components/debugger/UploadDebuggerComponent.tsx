import { type DocumentReference } from 'a-remarkable-js-sdk'
import { sendToBackground } from '@plasmohq/messaging'
import { useState } from 'react'
import { type UploadMessageResponsePayload } from '../../background/messages/upload'

export default function PairDebuggerComponent (): React.ReactElement {
  const [webDocumentUrl, setWebDocumentUrl] = useState<string>('')
  const [documentReference, setDocumentReference] = useState<DocumentReference | null>(null)
  const [uploadingDocument, setUploadingDocument] = useState<boolean>(false)

  async function uploadDocument () {
    setUploadingDocument(true)

    try {
      const response: UploadMessageResponsePayload = await sendToBackground({ name: 'upload', body: { webDocumentUrl } })
      setDocumentReference(response.documentReference)
      setWebDocumentUrl('')
    } finally {
      setUploadingDocument(false)
    }
  }

  return (
    <div className="w-full space-y-3 overflow-hidden">
      <div className="w-full inline-flex gap-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full mt-[6px]"></div>

        <div className="grow">
          <h2 className="font-semibold text-sm">Upload Flow</h2>
          <p className="text-xs">Test extension can upload documents to reMarkable Cloud</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <input
            value={webDocumentUrl}
            onChange={(e) => { setWebDocumentUrl(e.target.value) }}
            className="w-[100px] border-[1.5px] border-gray-400 py-[6px] px-2 text-xs rounded-lg" placeholder="Document URL"/>
          {
            uploadingDocument
              ? <button
                disabled={true}
                className="bg-gray-500 text-xs px-3 py-2 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300">
                uploading...
              </button>
              : <button
                onClick={uploadDocument}
                disabled={webDocumentUrl === ''}
                className="bg-gray-500 text-xs px-3 py-2 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300">
                pair
              </button>
          }
        </div>
      </div>

      <div className="ml-4 border border-gray-200 rounded-lg p-2 text-xs space-y-2">
        <h2 className="font-semibold">Pair outcome</h2>
        {
          uploadingDocument
            ? <p>Upload in process...</p>
            : <p className="line-clamp-1 max-w-[300px]">{ documentReference?.id }</p>
        }
      </div>
    </div>
  )
}
