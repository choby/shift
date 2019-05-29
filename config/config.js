import pageRoutes from './router.config';
const path = require('path');
// const svgSpriteDirs = [
//   path.resolve(__dirname, 'src/svg/'),
//   require.resolve('antd').replace(/index\.js$/, '')
// ]
/// <reference types="umi" />

export default {
  extraBabelIncludes: ['node_modules'],
  // proxy: {
  //   "/development/api/v1": {
  //     "target": "http://localhost:8000",
  //     "changeOrigin": true,
  //     "pathRewrite": { "/development/api/v1" : "/mock/api/v1" }
  //   },

  //   // "/development/api/v1": {
  //   //   "target": "http://localhost:8001",
  //   //   "changeOrigin": true,
  //   //   "pathRewrite": { "^/development/api/v1" : "/mock/api/v1" }
  //   // },

  //   // "/api/v1": {
  //   //   "target": "http://uat-scm.hmcloud.com.cn",
  //   //   "changeOrigin": true,
  //   //   //"pathRewrite": { "^/api/v1/weather": "/v3/weather" }
  //   // },
  //   // "/api/v2": {
  //   //   "target": "http://192.168.0.110",
  //   //   "changeOrigin": true,
  //   //   "pathRewrite": { "^/api/v2" : "/api/v2" }
  //   // }
  // },
  alias: {
    components: path.resolve(__dirname, '../src/components/'),
    permissions: path.resolve(__dirname, '../src/common/permissions/'),
    config: path.resolve(__dirname, '../src/utils/config/'),
    utils: path.resolve(__dirname, '../src/utils/'),
    common: path.resolve(__dirname, '../src/common/'),
    core: path.resolve(__dirname, '../src/core/'),
    types: path.resolve(__dirname, '../src/types/')
  },
  ignoreMomentLocale: true,
  theme: './theme.config.js',
  disableDynamicImport: false,
  publicPath: '/',
  hash: true,
  targets: { //兼容IE11
    ie: 11,
    chrome: 49,
    firefox: 45, 
    safari: 8,
    edge: 13,
    ios: 8
  },
  plugins: [[
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
    }
  ],
    "umi-plugin-polyfill" //兼容IE11需要的插件
  ],
  // 路由配置
  routes: pageRoutes,
  chainWebpack(config, { webpack }) {
    //console.log(config.module.rules)
    // config.module.rules = [
    //   // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' } },
    //   { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' } },
    //   // addition - add source-map support
    //   { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    // ];
    config.module.rule("awesome").test(/\.(t|j)sx?$/).use('awesome').loader("awesome-typescript-loader");
    config.module.rule("sourceMap").test(/\.js$/).pre().use("sourceMap").loader("source-map-loader");
  
  }
};
