const browserify = require('@cypress/browserify-preprocessor');

const options = browserify.defaultOptions;
// transform[1][1] is "babelify"
// so we just add our code instrumentation plugin to the list
options.browserifyOptions.transform[1][1].plugins.push('babel-plugin-istanbul');
options.typescript = require.resolve('typescript');

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
	require('@cypress/code-coverage/task')(on, config);
	on('file:preprocessor', browserify(options));
	return config;
};
