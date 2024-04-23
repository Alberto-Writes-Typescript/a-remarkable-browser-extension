import React from 'react'
import type { PlasmoCSUIProps, PlasmoGetOverlayAnchor } from 'plasmo'
import UploadButton from '../components/contents/uploadButton'

// @ts-expect-error - Expected error
export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => {
  return document.querySelector('#file-name-id')
}

const UploadWidget = ({ anchor: { element } }: PlasmoCSUIProps): React.ReactElement => {
  return (
    <div style={ { marginLeft: `${element.scrollWidth + 5}px`, marginTop: '-10px' } }>
      <UploadButton url={ 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }/>
    </div>
  )
}

export default UploadWidget
