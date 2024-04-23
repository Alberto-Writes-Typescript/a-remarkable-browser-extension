import fetch from 'cross-fetch'
import { UnsuccessfulRequestError } from '../errors'

export default class DocumentPreview {
  static async from (url: string): Promise<DocumentPreview> {
    async function contentLength (url: string): Promise<number> {
      const response = await fetch(url, { method: 'HEAD' })

      if (!response.ok) {
        throw new UnsuccessfulRequestError(`Failed to fetch content length for URL ${url}: ${await response.text()}`)
      }

      return Number(response.headers.get('content-length'))
    }

    return new DocumentPreview(url, await contentLength(url))
  }

  readonly #url: string
  readonly #name: string
  readonly #extension?: string
  readonly #size: number

  constructor (url: string, size: number) {
    this.#url = url
    this.#size = size

    const fileRegex = /\/([^/?#]+?)(?:\.([^./?#]+))?(?=\?|$)/
    const match = url.match(fileRegex)

    if (match != null) {
      this.#name = match[1]
      this.#extension = match[2]
    }
  }

  get url (): string {
    return this.#url
  }

  get name (): string {
    return this.#name
  }

  get extension (): string | undefined {
    return this.#extension
  }

  get size (): number {
    return this.#size
  }
}
