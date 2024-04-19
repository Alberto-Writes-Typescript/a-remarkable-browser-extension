import { type DocumentReference } from 'a-remarkable-js-sdk'
import RemarkableManager from './RemarkableManager'
import { WebPdfDocument } from '../../models/WebPdfDocument'
import { NoDevicePairedError } from '../../errors'

export default class UploadManager extends RemarkableManager {
  async upload (name: string, documentUrl: string): Promise<DocumentReference> {
    const client = await this.remarkableClient()

    if (!client.paired) {
      throw new NoDevicePairedError('Impossible to connect with reMarkable Cloud: extension not paired')
    }

    if (client.sessionExpired) await client.connect()

    const webDocument = await WebPdfDocument.initialize(documentUrl, name)

    return await client.upload(webDocument.name, webDocument.buffer)
  }
}
