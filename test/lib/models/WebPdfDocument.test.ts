import {
  InvalidPdfWebDocumentUrlError,
  WebPdfDocument,
  WebPdfDocumentDownloadError
} from '../../../src/lib/models/WebPdfDocument'

describe('WebPdfDocument', () => {
  describe('#valid', () => {
    it('if URL refers to a PDF file, returns true', () => {
      expect(WebPdfDocument.valid('http://example.com/document.pdf')).toBe(true)
    })

    it('if URL refers to a PDF file, returns true', () => {
      expect(WebPdfDocument.valid('http://example.com/document.epub')).toBe(false)
    })
  })

  describe('#initialize', () => {
    it(`
      if PDF URL is given,
        and URL endpoint contains a PDF,
          creates WebPdfDocument with PDF file
    `, async () => {
      const document = await WebPdfDocument.initialize(
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        'dummy'
      )

      expect(document.name).toBe('dummy')
      expect(document.size).toBe(13264)
    })

    it(`
      if non-PDF URL is given,
          throws invalid PDF URL error
    `, async () => {
      await expect(
        WebPdfDocument.initialize('https://example.com/document.epub', 'dummy')
      ).rejects.toThrow(InvalidPdfWebDocumentUrlError)
    })

    it(`
      if PDF URL is given,
        and PDF download request is not successful,
          throws PDF download error
    `, async () => {
      await expect(
        WebPdfDocument.initialize('https://example.com/i-dont-exists.pdf', 'dummy')
      ).rejects.toThrow(WebPdfDocumentDownloadError)
    })
  })
})
