import React from 'react'
import ResourceTree from '@components/resource.tree/demo';
import CommonLayout from '@components/common.layout/demo';
import Large from '@testComponents/large'
import TransitionMotionTest from '@testComponents/motion/transition'
import MotionTest from '@testComponents/motion/motion'

const Tip = () => {
    const demoUrl = `${location.origin}/?cp=CommonLayout`
    return <h1 style={{ textAlign: 'center', lineHeight: 5 }}> 啊哦~ 没有组件 /(ㄒoㄒ)/~~，请使用查询参数 cp 指定组件，如 <a href={demoUrl}>{demoUrl}</a></h1>
}

export default class extends React.Component {
    render() {
        return <CommonLayout >
            {this.props.yield}
        </CommonLayout>
        // const [, WhichComponent = ''] = location.search.match(/cp=([^&]*)/) || []
        // switch (WhichComponent.toLowerCase()) {
        //     case 'commonlayout':
        //         return <CommonLayout >
        //             {this.props.yield}
        //         </CommonLayout>
        //     case 'resourcetree':
        //         return <ResourceTree />
        //     case 'transitionmotion':
        //         return <TransitionMotionTest />
        //     case 'motion':
        //         return <MotionTest />
        //     case 'large':
        //         return <Large />
        //     default:
        //         return <Tip />
        // }
    }
}