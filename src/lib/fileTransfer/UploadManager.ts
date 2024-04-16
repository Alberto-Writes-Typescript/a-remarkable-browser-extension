import { type DocumentReference } from 'a-remarkable-js-sdk'
import RemarkableManager from '../RemarkableManager'
import { WebPdfDocument } from './WebPdfDocument'

export class NoDevicePairedError extends Error {}

export class SessionExpiredError extends Error {}

export default class UploadManager extends RemarkableManager {
  async upload (name: string, documentUrl: string): Promise<DocumentReference> {
    if (!this.remarkableClient.paired) {
      throw new NoDevicePairedError('Impossible to connect with reMarkable Cloud: extension not paired')
    }

    if (this.remarkableClient.sessionExpired) {
      throw new SessionExpiredError('Impossible to upload web document: session expired')
    }

    const webDocument = await WebPdfDocument.initialize(documentUrl, name)

    return await this.remarkableClient.upload(webDocument.name, webDocument.buffer)
  }
}
