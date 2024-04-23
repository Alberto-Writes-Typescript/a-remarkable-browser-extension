import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId
} from '@floating-ui/react'
import React, { useState } from 'react'
import type DocumentPreview from '../../lib/models/DocumentPreview'
import IconButton from '../common/iconButton'
import UploadPreview from './uploadPreview'

export interface UploadButtonProps {
  documentPreview?: DocumentPreview
  fileName?: string
}

export default function UploadButton ({ documentPreview, fileName }: UploadButtonProps): React.ReactElement {
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

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } =
    useInteractions([click, dismiss, role])

  const headingId = useId()

  return <div>
    {
      documentPreview != null
        ? <>
          <IconButton size="small" ref={refs.setReference} {...getReferenceProps()}/>

          {isOpen && (
            <FloatingFocusManager context={context} modal={false}>
              <div ref={refs.setFloating} aria-labelledby={headingId} {...getFloatingProps()}>
                <UploadPreview fileName={ fileName } documentPreview={documentPreview}/>
              </div>
            </FloatingFocusManager>
          )}
        </>
        : <IconButton size="small"/>
    }
  </div>
}
