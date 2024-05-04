import {
  useFloating,
  useInteractions,
  useId, useHover, safePolygon, offset, flip, shift, autoUpdate
} from '@floating-ui/react'
import React, { useState } from 'react'

import type DocumentPreview from '../../lib/models/DocumentPreview'
import IconButton from '../common/iconButton'
import UploadPreview from './uploadPreview'

export interface UploadButtonProps {
  documentPreview: DocumentPreview
  fileName?: string
  setFileName: (fileName: string) => void
}

export default function UploadButton ({ documentPreview, fileName, setFileName }: UploadButtonProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)

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
    <div className="w-fit">
      <div ref={refs.setReference} {...getReferenceProps()}>
        <IconButton icon="upload" size="sm"/>
      </div>

      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} aria-labelledby={headingId} {...getFloatingProps()}>
          <UploadPreview fileName={fileName} setFileName={setFileName} documentPreview={documentPreview}/>
        </div>
      )}
    </div>
  )
}