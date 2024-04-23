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
import React, { useEffect, useState } from 'react'
import IconButton from '../common/iconButton'
import UploadOverview from './uploadOverview'
import { WebPdfDocument } from '../../lib/models/WebPdfDocument'

export interface UploadButtonProps {
  url: string,

}

export default function UploadButton ({ url }: UploadButtonProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const [webDocument, setWebDocument] = useState<WebPdfDocument | null>(null)

  useEffect(() => {
    const fetchWebDocument = async (): Promise<void> => {
      try {
        const urlWebDocument = await WebPdfDocument.fromUrl(url)
        setWebDocument(urlWebDocument)
      } catch (error) {}
    }

    void fetchWebDocument().then(r => {})
  }, [])

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
      webDocument != null
        ? <>
            <IconButton size="small" ref={refs.setReference} {...getReferenceProps()}/>

            {isOpen && (
              <FloatingFocusManager context={context} modal={false}>
                <div ref={refs.setFloating} aria-labelledby={headingId} {...getFloatingProps()}>
                  <UploadOverview webDocument={webDocument}/>
                </div>
              </FloatingFocusManager>
            )}
          </>
        : <IconButton size="small"/>
    }
  </div>
}
