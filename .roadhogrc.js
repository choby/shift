const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry: 'src/index.ts',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  publicPath: `/${version}/`,
  outputPath: `./dist/${version}`,
  // 接口代理示例
  // proxy: {
  //   "/development/api/v1": {
  //     "target": "http://localhost:8899",
  //     "changeOrigin": true,
  //     //"pathRewrite": { "^/api/v2" : "/api/v2" }
  //   },
  //   // "/api/v2": {
  //   //   "target": "http://192.168.0.110",
  //   //   "changeOrigin": true,
  //   //   "pathRewrite": { "^/api/v2" : "/api/v2" }
  //   // }
  // },
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    }
  },
  dllPlugin: {
    exclude: ["babel-runtime", "roadhog", "cross-env"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  // module: {
  //   rules: [
  //     // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' } },
  //     { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' } },
  //     // addition - add source-map support
  //     { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
  //   ],
  //   loaders: [
  //     { test: /\.ts$/, loader: 'ts-loader' }
  //   ]
  // },

}
