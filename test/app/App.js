// "hot(App)" shall only be used as export.
// Please refer to "Getting Started" (https://github.com/gaearon/react-hot-loader/).
import React from 'react';
import { hot } from 'react-hot-loader/root'
import ResourceTree from '@components/resource.tree/demo';
import CommonLayout from '@components/common.layout/demo';
import Large from './components/large'
import TransitionMotionTest from './components/motion/transition'
import MotionTest from './components/motion/motion'

const Tip = () => {
    const demoUrl = `${location.origin}/?cp=CommonLayout`
    return <h1 style={{ textAlign: 'center', lineHeight: 5 }}> 啊哦~ 没有组件 /(ㄒoㄒ)/~~，请使用查询参数 cp 指定组件，如 <a href={demoUrl}>{demoUrl}</a></h1>
}

const App = () => {
    const [, WhichComponent = ''] = location.search.match(/cp=([^&]*)/) || []
    switch (WhichComponent.toLowerCase()) {
        case 'commonlayout':
            return <CommonLayout />
        case 'resourcetree':
            return <ResourceTree />
        case 'transitionmotion':
            return <TransitionMotionTest />
        case 'motion':
            return <MotionTest />
        case 'large':
            return <Large />
        default:
            return <Tip />
    }
}
export default hot(App);
