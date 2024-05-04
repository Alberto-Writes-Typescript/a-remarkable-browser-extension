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

export interface UploadButtonProps {
  documentPreview: DocumentPreview
  uploadDocument: (fileName: string, url: string) => Promise<void>
}

export default function UploadButton ({ documentPreview, uploadDocument }: UploadButtonProps): React.ReactElement {
  const [fileName, setFileName] = useState<string | undefined>(documentPreview.name)
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
          icon='logoAcronym'
          onClick={() => uploadDocument(fileName as string, documentPreview.url)}
          size='sm'
        />
        <Button
          className={
            `
              border-l-0 inline-flex items-center justify-center gap-2 text-nowrap
              animate-all ease-out duration-400 overflow-hidden w-0 px-0
              group-hover/upload-button:w-[200px] group-hover/upload-button:px-4
            `
          }
          onClick={() => uploadDocument(fileName as string, documentPreview.url)}
          size='sm'
        >
          upload to reMarkable
          <Icon icon='documentUpload' size='xs'/>
        </Button>
      </div>

      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} aria-labelledby={headingId} {...getFloatingProps()}>
          <UploadPreview fileName={fileName} setFileName={setFileName} documentPreview={documentPreview}/>
        </div>
      )}
    </div>
  )
}
