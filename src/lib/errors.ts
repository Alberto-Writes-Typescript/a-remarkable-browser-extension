/**
 * Triggered when trying to communicate with the reMarkable Cloud API
 * without having paired the extension with a reMarkable account.
 */
export class NoDevicePairedError extends Error {}

/**
 * Triggered when trying to communicate with the reMarkable Cloud API
 * without having a valid session token.
 */
export class SessionExpiredError extends Error {}
