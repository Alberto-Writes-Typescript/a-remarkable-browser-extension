import { sendToBackground } from '@plasmohq/messaging'
import { type GetConfigurationMessageResponsePayload } from '../../background/messages/getConfiguration'
import {
  type GetDocumentPreviewMessageRequestPayload,
  type GetDocumentPreviewMessageResponsePayload
} from '../../background/messages/getDocumentPreview'
import { type GetExtensionMetadataResponsePayload } from '../../background/messages/getExtensionMetadata'
import type { PairMessageRequestPayload, PairMessageResponsePayload } from '../../background/messages/pair'
import { type SerializedError } from '../serializers/error'
import { type UnpairMessageResponsePayload } from '../../background/messages/unpair'
import { type UploadMessageRequestPayload, type UploadMessageResponsePayload } from '../../background/messages/upload'

export class UnprocessedMessageError extends Error {}

export default class MessageManager {
  static async sendGetDocumentPreviewMessage (url: string): Promise<GetDocumentPreviewMessageResponsePayload> {
    const messageManager = await this.#messageManager()
    const body = { url } satisfies GetDocumentPreviewMessageRequestPayload
    return (await messageManager.send('getDocumentPreview', body)) as GetDocumentPreviewMessageResponsePayload
  }

  static async sendGetExtensionMetadataMessage (): Promise<GetExtensionMetadataResponsePayload> {
    const messageManager = await this.#messageManager()
    return (await messageManager.send('getExtensionMetadata')) as GetExtensionMetadataResponsePayload
  }

  static async sendGetConfigurationMessage (): Promise<GetConfigurationMessageResponsePayload> {
    const messageManager = await this.#messageManager()
    return (await messageManager.send('getConfiguration')) as GetConfigurationMessageResponsePayload
  }

  static async sendPairMessage (oneTimeCode: string): Promise<PairMessageResponsePayload> {
    const messageManager = await this.#messageManager()
    const body = { oneTimeCode } satisfies PairMessageRequestPayload
    return (await messageManager.send('pair', body)) as PairMessageResponsePayload
  }

  static async sendUnpairMessage (): Promise<UnpairMessageResponsePayload> {
    const messageManager = await this.#messageManager()
    return (await messageManager.send('unpair')) as UnpairMessageResponsePayload
  }

  static async sendUploadMessage (fileName: string, url: string): Promise<UploadMessageResponsePayload> {
    const messageManager = await this.#messageManager()
    const body = { name: fileName, webDocumentUrl: url } satisfies UploadMessageRequestPayload
    return (await messageManager.send('upload', body)) as UploadMessageResponsePayload
  }

  static async #messageManager (): Promise<MessageManager> {
    const extensionlessMessageManager = new MessageManager()
    const extensionId = (await extensionlessMessageManager.send('getExtensionMetadata') as GetExtensionMetadataResponsePayload).id
    return new MessageManager(extensionId)
  }

  readonly #extensionId?: string

  constructor (extensionId?: string) {
    this.#extensionId = extensionId
  }

  async send (name: string, body: Record<string, string> = {}): Promise<unknown> {
    // @ts-expect-error - Expected error
    const response = await sendToBackground({ name, body, extensionId: this.#extensionId })

    if (response.error != null) throw new UnprocessedMessageError((response as SerializedError).message)

    return response
  }
}
