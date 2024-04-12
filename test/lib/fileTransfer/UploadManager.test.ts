import UploadManager from '../../../src/lib/fileTransfer/UploadManager'

describe('UploadManager', () => {
  describe('.upload', () => {
    it(
      `
      if document URL is valid, uploads document to reMarkable Cloud
    `,
      async () => {
        const uploadManager = new UploadManager(process.env.DEVICE_TOKEN!)

        const documentReference = await uploadManager.upload(
          'dummy',
          'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        )

        expect(documentReference).toBeDefined()
      }
    )
  })
})
