import React, { Component } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { box } from './style.less'

export default class extends Component {
  state = {
    show: true
  }

  componentDidMount() {
    this.setState({
      show: false
    })
  }

  clickHandler() {
    this.setState({
      show: !this.state.show
    })
  }

  willEnter(styleThatEnter) {
    console.log('willEnter')
    return { scale: 0 }
  }

  willLeave(styleThatLeft) {
    
    const ret = { scale: spring(0) }
    console.log('willLeave:', ret)
    return ret
  }

  render() {
    return (
      <div>
        <button onClick={this.clickHandler.bind(this)}>run</button>
        <TransitionMotion styles={this.state.show ? [{
          key: 'test',
          style: { scale: spring(1) }
        }] : []}
          willEnter={this.willEnter}
          willLeave={this.willLeave}>
          {inStyles => (
              inStyles[0] ? (
                <div className={box}
                  key={inStyles[0].key}
                  style={{
                    transform: `scale(${inStyles[0].style.scale},${inStyles[0].style.scale})`
                  }}></div>
              ) : null
          )}
        </TransitionMotion>

      </div>
    )
  }

}
