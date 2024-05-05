import uploadPreview from './uploadPreview'
import DocumentPreview from '../../lib/models/DocumentPreview'

export default {
  title: 'Contents/UploadPreview',
  component: uploadPreview
}

export const Default = {
  args: {
    documentPreview: new DocumentPreview('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/my dummy file.pdf', 100),
    fileName: 'my dummy file.pdf',
    setFileName: (fileName: string) => { return fileName }
  }
}
