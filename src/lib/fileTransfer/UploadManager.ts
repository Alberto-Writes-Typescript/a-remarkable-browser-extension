import { type DocumentReference, RemarkableClient } from 'a-remarkable-js-sdk'
import { WebPdfDocument } from './WebPdfDocument'

export default class UploadManager {
  readonly #reMarkableClient: RemarkableClient

  constructor (
    deviceToken: string,
    sessionToken?: string
  ) {
    this.#reMarkableClient = RemarkableClient.withFetchHttpClient(deviceToken, sessionToken)
  }

  async upload (name: string, documentUrl: string): Promise<DocumentReference> {
    if (this.#reMarkableClient.sessionExpired) {
      await this.#reMarkableClient.connect()
    }

    const webDocument = await WebPdfDocument.initialize(documentUrl, name)

    const documentReference = await this.#reMarkableClient.upload(name, webDocument.buffer)

    return documentReference
  }
}
