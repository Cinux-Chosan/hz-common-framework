import React from 'react'
import { TransitionMotion, spring } from 'react-motion'

export default class extends React.Component {
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
        console.log('willLeave', arguments)
        return  null //{ width: spring(0), height: spring(0) };
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
