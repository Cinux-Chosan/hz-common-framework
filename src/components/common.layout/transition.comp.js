import React from 'react'
import { isObjectTheSame } from '../../libs/utils';

export class TransitionWrapper extends React.Component {

    state = { 
        styles: {}, 
        // 组件是否需要被卸载，即从 DOM 移除：true 是，false 否
        unmount: true 
    }

    startTransition = () => {
        this.setState({ styles: this.props.enterStyles(), unmount: false }, () => {
            setTimeout(() => {
                const endStyles = this.props.endStyles()
                this.setState({ styles: endStyles })
                // 如果 transition 为 none 则立即调用 onTransitionEnd 函数，否则传给组件由组件触发 onTransitionEnd
                if (endStyles.transition === 'none') {
                    this.onTransitionEnd()
                }
            })
        })
    }

    componentWillReceiveProps = () => {
        // 组件未被卸载或者
        if (!this.state.unmount || this.props.isShow()) {
            // 是否和上一次的 transition 动画参数一样
            if (!isObjectTheSame(this.state.styles, this.props.endStyles())) {
                this.startTransition()
            }
        }
    }

    onTransitionEnd = () => {
        const { isShow , resetStyles } = this.props
        if (isShow) {
            if (!isShow()) {
                this.setState({ unmount: true })
            }
        }
    }

    componentDidMount() {
        this.startTransition()
    }

    render() {
        const { styles, unmount } = this.state
        const children = this.props.children(styles, this.onTransitionEnd)
        return unmount ? null : children && React.Children.only(children)
    }
}