const path = require('path');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	rootDir: '..',
	/**
	 * Using `node` environment instead of `jsdom` to avoid web browser
	 * network security restrictions when downloading and uploading files.
	 *
	 * The reMarkable Cloud API and web browsers contain certain security
	 * restrictions when it comes to downloading and uploading files. These
	 * restrictions are not present in the service worker browser extensions
	 * use.
	 *
	 * To emulate a test environment which is closer to our experience with
	 * the service worker running environment we use the `node` environment.
	 */
	testEnvironment: 'node',
	setupFilesAfterEnv: ['./test/jest.setup.ts']
}
