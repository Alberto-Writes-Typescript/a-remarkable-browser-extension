import DocumentPreview from '../../lib/models/DocumentPreview'
import documentUploader from './documentUploader'

export default {
  title: 'Popup/DocumentUploader',
  component: documentUploader
}

export const Default = {
  args: {
    getDocumentPreview: async (url: string) => {
      try {
        return new DocumentPreview('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 100)
      } catch (error) {
        return error
      }
    },
    uploadDocument: async (fileName: string, url: string) => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => { resolve(null) }, 3000)
      })

      await promise

      console.log('Uploading document:', fileName, 'from:', url)
    }
  }
}
