import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'untd'
import { Scrollbox } from 'untd'
import { COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE } from '../action.type'
import { TransitionMotion, spring, presets } from 'react-motion'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getSubRoutes, getPathLevel } from '../router.config';

const { SubMenu } = Menu
const { Sider } = Layout
// const defaultOpaqueConfig = { stiffness: 300, damping: 30, precision: 0.01 }
const defaultOpaqueConfig = { stiffness: 300, damping: 26 }
const SIDER_WIDTH = 300
const SIDER_WIDTH_COLLAPSED = 80
export class CommonSidebar extends Component {
  state = {}
  scrollBoxInstanceRef = React.createRef()
  onOpenChange = (openKeys) => {
    const { scrollBoxInstanceRef: { current: scrollBoxInstanceRef } } = this
    this.setState({ openKeys })
    if (scrollBoxInstanceRef.refresh) {
      // 侧边栏高度变化，refresh iscroll
      setTimeout(() => scrollBoxInstanceRef.refresh(), 500)
    }
  }

  sider = props => {
    const { scrollBoxInstanceRef, onOpenChange, props: { bExpandSidebar, privilegeTreeData, location: { pathname = '' } } } = this
    const subRoutes = getSubRoutes(getPathLevel(pathname, 2), privilegeTreeData)
    
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
            selectedKeys={[this.props.location.pathname]}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
            {
              subRoutes.map(subRoute => {
                if (subRoute && subRoute.child) {
                  return (
                    <SubMenu
                      key={subRoute.path}
                      title={<span><Icon type="user" /><span>{subRoute.path}</span></span>}
                    >
                      {
                        subRoute.child.map(ssr => {
                          return <Menu.Item key={ssr.path}><NavLink to={ssr.path}>{ssr.path}</NavLink></Menu.Item>
                        })
                      }
                    </SubMenu>
                  )
                } else {
                  return (
                    <Menu.Item key={subRoute.path}><NavLink to={subRoute.path}>{subRoute.path}</NavLink></Menu.Item>
                  )
                }
              })
            }
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

  motionWillEnter = () => {
    const { bExpandSidebar } = this.props
    const width = bExpandSidebar ? SIDER_WIDTH : SIDER_WIDTH_COLLAPSED
    return { marginLeft: -width }
  }

  motionWillLeave = () => {
    const { motion, bExpandSidebar } = this.props
    const width = bExpandSidebar ? SIDER_WIDTH : SIDER_WIDTH_COLLAPSED
    return { marginLeft: motion ? spring(-width, { ...defaultOpaqueConfig, ...motion }) : -width }
  }

  render() {
    return <TransitionMotion
      styles={this.motionStyle}
      willEnter={this.motionWillEnter}
      willLeave={this.motionWillLeave}
    >
      {
        interpolatedStyles => (
          <>
            {
              interpolatedStyles.map(config => <this.sider key={config.key} style={config.style} />)
            }
          </>
        )
      }
    </TransitionMotion>
  }
}


const mapStateToProps = ({ bExpandSidebar, oShowSidebar, privilegeTree: { payload: privilegeTreeData } }) => {
  const { show: isShow, motion } = oShowSidebar
  return {
    bExpandSidebar, isShow, motion, privilegeTreeData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCollapse: () => dispatch({ type: COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonSidebar))
