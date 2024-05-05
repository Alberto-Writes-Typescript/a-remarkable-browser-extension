import {
  useFloating,
  useInteractions,
  useId, useHover, safePolygon, offset, flip, shift, autoUpdate
} from '@floating-ui/react'
import React, { useState } from 'react'

import type DocumentPreview from '../../lib/models/DocumentPreview'
import IconButton from '../common/iconButton'
import Button from '../common/button'
import UploadPreview from './uploadPreview'
import Icon from '../common/icon'

const BUTTON_ICON = {
  waiting: 'logoAcronym',
  uploading: 'logoAcronym',
  uploaded: 'check',
  failed: 'warning'
}

const BUTTON_LABEL = {
  waiting: 'upload to reMarkable',
  uploading: 'uploading...',
  uploaded: 'uploaded',
  failed: 'upload failed, try again'
}

const BUTTON_LABEL_ICON = {
  waiting: 'documentUpload',
  uploading: 'spin',
  failed: 'documentUpload'
}

export interface UploadButtonProps {
  documentPreview: DocumentPreview
  uploadDocument: (fileName: string, url: string) => Promise<void>
}

export default function UploadButton ({ documentPreview, uploadDocument }: UploadButtonProps): React.ReactElement {
  const [fileName, setFileName] = useState<string | undefined>(documentPreview.name)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [uploadStatus, setUploadStatus] = useState<string>('waiting')

  // Upload logic
  // ------------
  async function startUpload (): Promise<void> {
    if (!['waiting', 'failed'].includes(uploadStatus)) return

    setUploadStatus('uploading')

    try {
      await uploadDocument(fileName as string, documentPreview.url)

      setUploadStatus('uploaded')
    } catch {
      setUploadStatus('failed')
    }
  }

  // Tooltip Configuration
  // ---------------------
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top-end',
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift()
    ],
    whileElementsMounted: autoUpdate
  })

  const hover = useHover(context, { handleClose: safePolygon() })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const headingId = useId()

  return (
    <div className='w-fit'>
      <div className='group/upload-button w-fit inline-flex' ref={refs.setReference} {...getReferenceProps()}>
        <IconButton
          className='border-r-0'
          icon={ BUTTON_ICON[uploadStatus] }
          onClick={async (): Promise<void> => { await startUpload() }}
          size='sm'
        />
        <Button
          className={
            `
              border-l-0 inline-flex items-center justify-center gap-2 text-nowrap
              animate-all ease-out duration-400 overflow-hidden !w-0 !px-0
              group-hover/upload-button:!w-[200px] group-hover/upload-button:!px-4
            `
          }
          onClick={async (): Promise<void> => { await startUpload() }}
          size='sm'
        >
          { BUTTON_LABEL[uploadStatus] }
          <Icon icon={ BUTTON_LABEL_ICON[uploadStatus] } size='xxs' className={ uploadStatus === 'uploading' && 'animate-spin' }/>
        </Button>
      </div>

      {isOpen && uploadStatus !== 'uploaded' && (
        <div ref={refs.setFloating} style={floatingStyles} aria-labelledby={headingId} {...getFloatingProps()}>
          <UploadPreview fileName={fileName} setFileName={setFileName} documentPreview={documentPreview}/>
        </div>
      )}
    </div>
  )
}
