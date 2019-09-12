const NODE_ENV = process.env.NODE_ENV;
const ENV = process.env;
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  baseUrl: NODE_ENV === "production" ? ENV.VUE_APP_BASEURL : "/",
  productionSourceMap: false, //不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  devServer: {
    proxy: {
      "/dev": {
        target: "http://hikflowsit2.hikvision.com.cn:8086", // dev
        // target: "http://irdmspre4.hikvision.com.cn:8035", // 新dev
        // target: "http://hikflowsit2.hikvision.com.cn", // sit
        changeOrigin: true,
        pathRewrite: {
          "^/dev": ""
        }
      },
      "/nameServer": { // 选择人员、选择部门
        target: "http://jsapi-test.hikvision.com/prd/", //prd
        changeOrigin: true,
        pathRewrite: {
          "^/nameServer": ""
        }
      },
      //附件上传接口
      "/file": {
        target: "http://HIK-NTJava.hikvision.com:6088", // sit
        // target: "http://att.hikvision.com.cn:8088", // prd
        changeOrigin: true,
        pathRewrite: {
          "^/file": ""
        }
      },
    }
  },
  configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "./src/main.js"]; //入口文件
    let plugins = [];
    if (NODE_ENV === 'production') {
      plugins.push(new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, //匹配文件名
        threshold: 10240, //对超过10k的数据进行压缩
      }))
    }
    return {
      plugins
    }
  },
  chainWebpack: config => {
    if (ENV.VUE_APP_CURRENTMODE === 'report') {
      // 生成打包报告
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              minSize: 30000, // 模块的最小体积
              minChunks: 1, // 模块的最小被引用次数
              maxAsyncRequests: 5, // 按需加载的最大并行请求数
              maxInitialRequests: 3, // 一个入口最大并行请求数
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        })
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: `@import "@/style/scss-global.scss";`
      }
    }
  }

};
