import fetch from 'cross-fetch'

export class InvalidPdfWebDocumentUrlError extends Error {}

export class WebPdfDocumentDownloadError extends Error {}

export class WebPdfDocument {
  static valid (documentUrl: string): boolean {
    return documentUrl.endsWith('.pdf')
  }

  static async initialize (documentUrl: string, name: string): Promise<WebPdfDocument> {
    if (!WebPdfDocument.valid(documentUrl)) {
      throw new InvalidPdfWebDocumentUrlError(`Attempt to initialize a WebPdfDocument with an URL whose extension is not PDF: ${documentUrl}`)
    }

    const downloadResponse = await fetch(documentUrl)

    if (!downloadResponse.ok) {
      throw new WebPdfDocumentDownloadError(`Failed to download PDF document from URL ${documentUrl}: ${await downloadResponse.text()}`)
    }

    const buffer = await downloadResponse.arrayBuffer()

    return new WebPdfDocument(buffer, name)
  }

  readonly #buffer: ArrayBuffer
  readonly #name: string
  readonly #size: number

  constructor (buffer: ArrayBuffer, name: string) {
    this.#buffer = buffer
    this.#name = name
    this.#size = buffer.byteLength
  }

  get buffer (): ArrayBuffer {
    return this.#buffer
  }

  get name (): string {
    return this.#name
  }

  get size (): number {
    return this.#size
  }
}
