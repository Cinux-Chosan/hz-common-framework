// "hot(App)" shall only be used as export.
// Please refer to "Getting Started" (https://github.com/gaearon/react-hot-loader/).
import React from 'react';
import { hot } from 'react-hot-loader/root'
import ResourceTree from '@components/resource.tree/demo';
import CommonLayout from '@components/common.layout/demo';
import { TransitionMotion, spring } from 'react-motion';

const Tip = () => {
    const demoUrl = `${location.origin}/?cp=CommonLayout`
    return <h1 style={{ textAlign: 'center', lineHeight: 5 }}> 啊哦~ 没有组件 /(ㄒoㄒ)/~~，请使用查询参数 cp 指定组件，如 <a href={demoUrl}>{demoUrl}</a></h1>
}

class Test extends React.Component {
    constructor() {
        super(...arguments)
        this.state = this.getInitialState()
    }
    getInitialState() {
        return {
            items: [{ key: 'a', size: 10 }, { key: 'b', size: 20 }, { key: 'c', size: 100 }],
        };
    }
    componentDidMount() {
        
        this.setState({
            items: [{ key: 'a', size: 10 }, { key: 'b', size: 100 }], // remove c.
        });
    }
    willLeave() {
        // triggered when c's gone. Keeping c until its width/height reach 0.
        return { width: spring(0), height: spring(0) };
    }
    render() {
        return (
            <TransitionMotion
                willLeave={this.willLeave}
                styles={this.state.items.map(item => ({
                    key: item.key,
                    style: { width: item.size, height: item.size },
                }))}>
                {interpolatedStyles =>
                    // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                    <div>
                        {interpolatedStyles.map(config => {
                            console.log(config.style)
                            return <div key={config.key} style={{ ...config.style, border: '1px solid' }} />
                        })}
                    </div>
                }
            </TransitionMotion>
        );

    }
}

const App = () => {
    const [, WhichComponent = ''] = location.search.match(/cp=([^&]*)/) || []
    switch (WhichComponent.toLowerCase()) {
        case 'commonlayout':
            return <CommonLayout />
        case 'resourcetree':
            return <ResourceTree />
        case 'motion':
            return <Test />
        default:
            return <Tip />
    }
}
export default hot(App);
