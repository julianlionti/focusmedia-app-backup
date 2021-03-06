// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('metro-config')

const asyncConfig = async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig()

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer')
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  }
}

module.exports = asyncConfig()
