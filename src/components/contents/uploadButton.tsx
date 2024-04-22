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
import IconButton from '../common/iconButton'
import UploadOverview from './uploadOverview'

export interface UploadButtonProps {
  anchor: HTMLAnchorElement
}

export default function UploadButton ({ anchor }: UploadButtonProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right-end',
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
    <IconButton size="small" ref={refs.setReference} {...getReferenceProps()}/>

    {isOpen && (
      <FloatingFocusManager context={context} modal={false}>
        <div ref={refs.setFloating} aria-labelledby={headingId} {...getFloatingProps()}>
          <UploadOverview/>
        </div>
      </FloatingFocusManager>
    )}
  </div>
}
