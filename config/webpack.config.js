/*
 * @Author: Chosan.Zhangjianjun
 * @Date: 2019-02-27 14:21:02
 * @Last Modified by: Chosan.Zhangjianjun
 * @Last Modified time: 2019-02-27 17:34:42
 */

const { resolve, join } = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpackMerge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devConfig = require("./webpack.config.dev");
const prodConfig = require("./webpack.config.prod");

const rootDir = resolve(__dirname, "..");

const browsers = "ie >= 9";

const baseConfig = {
  entry: "./es/index.js",
  target: "web",
  output: {
    path: join(rootDir, "dist"),
    filename: "index.js",
    // access this lib via window.ReactPluginDemo
    library: "ReactPluginDemo",
    libraryTarget: "umd"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: rootDir
    }),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    alias: {
      "@components": join(rootDir, "src/components/"),
      "@app": join(rootDir, "test/app/")
    }
  },
  optimization: {
    usedExports: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    // https://github.com/browserslist/browserslist
                    browsers
                  },
                  useBuiltIns: "usage"
                }
              ],
              "@babel/preset-react"
            ],
            plugins: ["react-hot-loader/babel",
              [
                'import', {
                  libraryName: 'untd',
                  libraryDirectory: 'es',
                  style: 'css',
                }],
              "@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, // "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-preset-env')({
                  browsers
                }),
                require('cssnano')()
              ]
            }
          },
          "less-loader"]
      },
      {
        test: /\.(css|scss)$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,// "style-loader", 
          {
            loader: "css-loader",
          }, "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      }
    ]
  }
};

module.exports = (env, argv) => {
  switch (argv.mode) {
    case "development": {
      return webpackMerge.smart(baseConfig, devConfig);
    }
    case "production": {
      return webpackMerge.smart(baseConfig, prodConfig);
    }
    default:
      return baseConfig;
  }
};
