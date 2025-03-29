const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },
  devServer: {
    hot: true, //热加载
    host: 'localhost',
    port: 8080, //端口
    https: false, //false关闭https，true为开启
    open: true, //自动打开浏览器
    proxy: {
      '/file': {
        target:  'https://124.71.203.87',
        // target:  'http://localhost:4001',
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/milliaApi': '/'
        // }
      },
      // '/': {
      //   target:'http://localhost:4001' ,
      //   ws: true,
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/milliaApi': '/'
      //   // }
      // },
      /*
      其他基地址，项目如对接不同基地址数据且需交互http与https，
      修改public文件夹里的index.html在head中添加
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
      */
      // '/MilliaOtherApi': {
      //   target: 'https://xx.xxx.xxxx/xxx',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/MilliaOtherApi': '/'
      //   }
      // },
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          API_BASE_URL: JSON.stringify(process.env.NODE_ENV === 'production' ? 'https://124.71.203.87' : 'http://localhost:3000')
        }
      })
    ]
  }
})
