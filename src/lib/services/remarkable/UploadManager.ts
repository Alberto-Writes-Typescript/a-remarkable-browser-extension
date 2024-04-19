import { type DocumentReference } from 'a-remarkable-js-sdk'
import { WebPdfDocument } from '../../models/WebPdfDocument'
import RemarkableManager from './RemarkableManager'

export default class UploadManager extends RemarkableManager {
  async upload (name: string, documentUrl: string): Promise<DocumentReference> {
    const client = await this.remarkableClient()

    const webDocument = await WebPdfDocument.initialize(documentUrl, name)

    return await client.upload(webDocument.name, webDocument.buffer)
  }
}
