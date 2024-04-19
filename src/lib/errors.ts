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

/**
 * Triggered when trying to set a session token that does not belong
 * to the current device.
 */
export class UnknownSessionDeviceError extends Error {}

/**
 * Triggered when a given token as device token does not resemble
 * an actual JWT device token.
 */
export class InvalidDeviceTokenError extends Error {}

/**
 * Triggered when a given token as session token does not resemble
 * an actual JWT session token.
 */
export class InvalidSessionTokenError extends Error {}
