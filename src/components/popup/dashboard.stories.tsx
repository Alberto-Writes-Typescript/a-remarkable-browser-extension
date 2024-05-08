import dashboard from './dashboard'
import DocumentPreview from '../../lib/models/DocumentPreview'

export default {
  title: 'Popup/Dashobard',
  component: dashboard
}

export const Default = {
  args: {
    device: {
      id: '4b9794f4-37e4-4ce8-87fd-b62abbaf0ade',
      connectedAt: '12.12.2024'
    },
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
