declare let browser: typeof chrome

export default class ExtensionManager {
  readonly #runtime: unknown

  constructor () {
    this.#runtime = this.#browser.runtime
  }

  get extensionId (): string {
    // @ts-expect-error - expected error
    return this.#runtime.id
  }

  get #browser (): typeof browser | typeof chrome {
    if (typeof browser !== 'undefined') {
      return browser
    } else {
      return chrome
    }
  }
}
