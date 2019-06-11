# react-plugin-demo

一个开箱即用的 React 插件框架。

## Get Started

`npm i` or `yarn`

## Development

组件开发在 `src/components` 目录下，参考 `src/components/demo`

### export component

在 `index.js` 中导出组件，参考 `index.js`

## Test Component

本地测试代码在 `test/app` 目录下，参考 `test/app/index.js`。

运行命令 `npm run start` 启动本地测试。

## Error

在其他 webpack 项目中直接通过  `import { Demo } from 'react-plugin-demo'` 使用组件可能会报 `can't find module xxx` 的错误，请确保外部项目安装了对应依赖，或者使用 `import { Demo } from 'react-plugin-demo/dist'` 来使用打包过后的组件包。