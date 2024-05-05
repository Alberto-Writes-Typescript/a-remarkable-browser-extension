/**
 * Script to attach the upload widget component to DOM elements containing
 * references to downloadable documents compatible with the reMarkable Cloud
 */

import AnchorTrackingManager from '../lib/ui/uploadWidget/AnchorTrackingManager'

export {}

// TODO: display only once the extension is paired to a remarkable device
// eslint-disable-next-line no-new
new AnchorTrackingManager(document.body)
