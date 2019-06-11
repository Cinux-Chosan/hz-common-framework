// "hot(App)" shall only be used as export.
// Please refer to "Getting Started" (https://github.com/gaearon/react-hot-loader/).
import React from 'react';
import { hot } from 'react-hot-loader/root'
import ResourceTree from '@components/resource.tree/demo';
import CommonLayout from '@components/common.layout/demo';

const Tip = () => {
    const demoUrl = `${location.origin}/?cp=CommonLayout`
    return <h1 style={{textAlign: 'center', lineHeight: 5}}> 啊哦~ 没有组件 /(ㄒoㄒ)/~~，请使用查询参数 cp 指定组件，如 <a href={demoUrl}>{demoUrl}</a></h1>
}

const App = () => {
    const [, WhichComponent] = location.search.match(/cp=([^&]*)/) || []
    switch (WhichComponent) {
        case 'CommonLayout':
            return <CommonLayout />
        case 'ResourceTree':
            return <ResourceTree />
        default: 
            return <Tip />
    }
}
export default hot(App);