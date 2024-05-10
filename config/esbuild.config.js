// Configuration for bundling the landing page
const esbuild = require('esbuild');
const { jsxFactory, jsxFragment } = require('esbuild-react');

esbuild.build({
	entryPoints: ['src/landingPage.tsx'],
	bundle: true,
	outfile: 'landing_page/bundle.js',
	minify: false,
	sourcemap: false,
	loader: {'.tsx': 'tsx'},
	jsxFactory,
	jsxFragment,
}).catch(() => process.exit(1))
