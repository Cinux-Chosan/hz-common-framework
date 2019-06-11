import { version, name } from '../package';
const gNamespace = window || global || {}
const { reactPluginVersions = {} } = gNamespace;
gNamespace.reactPluginVersions = { ...reactPluginVersions, [name]: version };

// 不要使用 @components，如 @components/demo，
// 因为在未通过 webpack 打包的情况下被第三方引用（如：import { Demo } from 'react-plugin-demo/index'）会找不到 @components
// 另外由于 package.json 中 module 字段指定为当前文件，
// 因此在其它 webpack 项目中直接 import { Demo } from 'react-plugin-demo' 会进入到 module 字段指定的文件而非 main
export { default as ResourceTree } from '../src/components/resource.tree';