const webpack = require('webpack');
const WebpackObfuscator = require('webpack-obfuscator');
const { loaderByName, addBeforeLoader } = require('@craco/craco')
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const isEnvProduction = env === 'production';
      const isEnvDevelopment = env === 'development';
      const doOfuscator = process.env.SOURCECODE_OBFUSCATOR !== 'false';
      let pluginCustom = [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        })
      ]
      let ruleCustom = [
        {
          test: /\.css$/i,
          use: [
            {
              loader: 'style-loader',
              options: { injectType: 'singletonStyleTag' },
            },
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff2|woff)$/i,
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        }
      ]
      if (doOfuscator) {
        pluginCustom = pluginCustom.concat([
          new WebpackObfuscator ({
            rotateStringArray: true,
          }, [])
        ])
        ruleCustom = ruleCustom.concat([{
          test: /\.js$/,
          enforce: 'post',
          use: {
            loader: WebpackObfuscator.loader,
            options: {
              rotateStringArray: true
            }
          }
        }])
      }
      for(const p of webpackConfig.plugins) {pluginCustom.push(p)}
      webpackConfig.optimization = {
        runtimeChunk: false,
        splitChunks: {
          cacheGroups: {
            default: false,
          },
        }
      }
      webpackConfig.output = {
        path: isEnvProduction ? paths.appBuild : undefined,
        pathinfo: isEnvDevelopment,
        filename: 'static/js/[name].[hash:8].js',
        // TODO: remove this when upgrading to webpack 5
        futureEmitAssets: true,
        chunkFilename: 'static/js/[name].[hash:8].chunk.js',
        publicPath: paths.publicUrlOrPath,
        globalObject: 'this',
      }
      webpackConfig.plugins = pluginCustom
      for (const item of ruleCustom) {
        addBeforeLoader(webpackConfig, loaderByName('file-loader'), item)
      }

      return webpackConfig;
    },
  },
  plugins: [

  ],
};
