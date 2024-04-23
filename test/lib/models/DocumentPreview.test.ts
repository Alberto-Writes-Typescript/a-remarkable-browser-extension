import DocumentPreview from '../../../src/lib/models/DocumentPreview'
import { UnsuccessfulRequestError } from '../../../src/lib/errors'

describe('DocumentPreview', () => {
  describe('#from', () => {
    it('if URL points to a valid document, returns document preview', async () => {
      const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      const document = await DocumentPreview.from(url)

      expect(document.name).toBe('dummy')
      expect(document.size).toBeGreaterThan(0)
      expect(document.extension).toBe('pdf')
    })

    it('if URL is invalid, throws an error', async () => {
      const url = 'https://example.com/unexisting-document'

      await expect(DocumentPreview.from(url)).rejects.toThrow(UnsuccessfulRequestError)
    })
  })

  describe('.name', () => {
    it('returns the name of the document', async () => {
      const url = 'https://example.com/document'
      const document = new DocumentPreview(url, 0)

      expect(document.name).toBe('document')
    })

    it('if URL contains a file extension, returns the name of the document', async () => {
      const url = 'https://example.com/document.pdf'
      const document = new DocumentPreview(url, 0)

      expect(document.name).toBe('document')
    })

    it('if URL contains query parameters, returns the name of the document', async () => {
      const url = 'https://example.com/document.pdf?query=param'
      const document = new DocumentPreview(url, 0)

      expect(document.name).toBe('document')
    })
  })

  describe('.extension', () => {
    it('returns the extension of the document', async () => {
      const url = 'https://example.com/document.pdf'
      const document = new DocumentPreview(url, 0)

      expect(document.extension).toBe('pdf')
    })

    it('if URL contains query parameters, returns the extension of the document', async () => {
      const url = 'https://example.com/document.pdf?query=param'
      const document = new DocumentPreview(url, 0)

      expect(document.extension).toBe('pdf')
    })

    it('if URL does not contain a file extension, returns undefined', async () => {
      const url = 'https://example.com/document'
      const document = new DocumentPreview(url, 0)

      expect(document.extension).toBeUndefined()
    })
  })
})
