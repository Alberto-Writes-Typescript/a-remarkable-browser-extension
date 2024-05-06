import DocumentPreview from '../../lib/models/DocumentPreview'
import uploadButton from './uploadButton'

export default {
  title: 'Contents/UploadButton',
  component: uploadButton
}

export const Default = {
  args: {
    documentPreview: new DocumentPreview('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 100),
    uploadDocument: async (fileName: string, url: string) => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => { resolve(null) }, 3000)
      })

      await promise

      console.log('Uploading document:', fileName, 'from:', url)
    }
  }
}

export const UnsuccesfulUpload = {
  args: {
    documentPreview: new DocumentPreview('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 100),
    uploadDocument: async (fileName: string, url: string) => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => { resolve(null) }, 3000)
      })

      await promise

      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw ('Failed to upload document')
    }
  }
}
