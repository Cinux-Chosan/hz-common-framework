import React from 'react'
import { Motion, spring } from 'react-motion'

export default class extends React.Component {
    render() {
        return <Motion 
        defaultStyle={{ x: 0 }}
        style={{ x: spring(10) }}
        onRest={() => { console.log('onRest') }}>
            {interpolatingStyle => <div >{interpolatingStyle.x}</div>}
        </Motion>
    }
}
