/**
 * Script to attach the upload widget component to DOM elements containing
 * references to downloadable documents compatible with the reMarkable Cloud
 */

import MouseTracker from '../lib/ui/uploadWidget/MouseTracker'

export {}

// eslint-disable-next-line no-new
new MouseTracker(document.body)
