import DocumentPreview from '../../lib/models/DocumentPreview'
import uploadButton from './uploadButton'

export default {
  title: 'Contents/UploadButton',
  component: uploadButton
}

export const Default = {
  args: {
    documentPreview: new DocumentPreview('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 100),
    fileName: 'my dummy PDF'
  }
}
