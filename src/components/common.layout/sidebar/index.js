import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'untd'
import { Scrollbox } from 'untd'
import { COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE } from '../action.type'
import { TransitionMotion, spring, presets } from 'react-motion'
const { SubMenu } = Menu
const { Sider } = Layout
const defaultOpaqueConfig = { stiffness: 220, damping: 15, precision: 0.01 }
const SIDER_WIDTH = 300
const SIDER_WIDTH_COLLAPSED = 80
export class CommonSidebar extends Component {
  state = { siderWidth: 300 }
  scrollBoxInstanceRef = React.createRef()
  onOpenChange = () => {
    const { scrollBoxInstanceRef: { current: scrollBoxInstanceRef } } = this
    if (scrollBoxInstanceRef.refresh) {
      // 侧边栏高度变化，refresh iscroll
      setTimeout(() => scrollBoxInstanceRef.refresh(), 500)
    }
  }

  sider = props => {
    const { scrollBoxInstanceRef, onOpenChange, props: { bExpandSidebar } } = this
    console.log(props.style)
    return (
      <Sider style={{ willChange: 'margin-left', ...props.style }}
        collapsible
        collapsed={!bExpandSidebar}
        onCollapse={this.props.onCollapse}
        width={300}
        className="hz-common-layout-sider">
        <Scrollbox ref={scrollBoxInstanceRef}>
          <Menu
            mode="inline"
            theme="dark"
            onOpenChange={onOpenChange}
            defaultSelectedKeys={['1']}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>
                    subnav 1
                  </span>
                </span>
              }
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  <span>
                    subnav 2
                  </span>
                </span>
              }
            >
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            {/* <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />
                  <span>
                    subnav 3
                  </span>
                </span>
              }
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="13">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu> */}
          </Menu>
        </Scrollbox>
      </Sider>
    )
  }

  motionStyle = () => {
    const { isShow, motion } = this.props
    if (isShow) {
      return [{ style: { marginLeft: motion ? spring(0, { ...defaultOpaqueConfig, ...motion }) : 0 }, key: 'CommonSidebar' }]
    } else {
      return []
    }
  }

  motionWillLeave = () => {
    const { motion, bExpandSidebar } = this.props
    const width = bExpandSidebar ? SIDER_WIDTH : SIDER_WIDTH_COLLAPSED
    return { marginLeft: motion ? spring(-width, { ...defaultOpaqueConfig, ...motion }) : -width }
  }

  render() {
    const { bExpandSidebar } = this.props
    const width = bExpandSidebar ? SIDER_WIDTH : SIDER_WIDTH_COLLAPSED
    return <TransitionMotion
      styles={this.motionStyle}
      willEnter={() => ({ marginLeft: -width })}
      willLeave={this.motionWillLeave}
    >
      {
        interpolatedStyles => (
          <>
            {interpolatedStyles.map(config => <this.sider key={config.key} style={{ ...config.style }} />)
            }
          </>
        )
      }
    </TransitionMotion>
  }
}


const mapStateToProps = ({ bExpandSidebar, oShowSidebar }) => {
  const { show: isShow, motion } = oShowSidebar
  return {
    bExpandSidebar, isShow, motion
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCollapse: () => dispatch({ type: COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonSidebar)
