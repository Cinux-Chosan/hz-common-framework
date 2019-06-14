import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'untd'
import { Scrollbox } from 'untd'
import { COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE } from '../action.type'
import { TransitionMotion, spring } from 'react-motion'
const { SubMenu } = Menu
const { Sider } = Layout

export class CommonSidebar extends Component {
  state = { collapsed: false }
  scrollBoxInstanceRef = React.createRef()
  onOpenChange = () => {
    const { scrollBoxInstanceRef: { current: scrollBoxInstanceRef } } = this
    if (scrollBoxInstanceRef.refresh) {
      // 侧边栏高度变化，refresh iscroll
      setTimeout(() => scrollBoxInstanceRef.refresh(), 500)
    }
  }

  componentDidMount() {
    window.xxx = () => this.setState({ collapsed: !this.state.collapsed })
  }

  sider = () => {
    const { scrollBoxInstanceRef, onOpenChange, props: { bExpandSidebar } } = this
    return (
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
    )
  }

  render() {
    const { collapsed } = this.state
    const { scrollBoxInstanceRef, onOpenChange, props: { bExpandSidebar } } = this

    return <TransitionMotion
      willLeave={() => ({ marginLeft: spring(-300) })}
      styles={collapsed ? [{ key: 'aaa', style: { marginLeft: -300 } }] : [{ key: 'aaa', style: { marginLeft: 0 } }]}
    >
      {interpolatedStyles => <Sider collapsible collapsed={!bExpandSidebar} onCollapse={this.props.onCollapse} width={300} className="hz-common-layout-sider">
        {
          interpolatedStyles.map(config => {
            return <this.sider key={config.key} style={{ ...config.style }} />
          })
        }
      </Sider>
      }

    </TransitionMotion>
  }
}


const mapStateToProps = ({ bExpandSidebar }) => ({
  bExpandSidebar
})

const mapDispatchToProps = dispatch => {
  return {
    onCollapse: collapsed => dispatch({ type: COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonSidebar)
