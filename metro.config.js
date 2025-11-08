// const { withSentryConfig } = require('@sentry/react-native/metro');
const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  resolver: {sourceExts, assetExts},
} = getDefaultConfig(__dirname);
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    nodeModulesPaths: [path.resolve(`${__dirname}/node_modules`)],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
