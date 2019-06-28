import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'untd'
import { Scrollbox } from 'untd'
import { COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE } from '../action.type'
import { TransitionMotion, spring } from 'react-motion'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { treeWalker } from '../router.config';
import { TransitionWrapper } from '../transition.comp'
import styles from './style.less'
const { SubMenu } = Menu
const { Sider } = Layout

const SIDER_WIDTH = 300
const SIDER_WIDTH_COLLAPSED = 80
export class CommonSidebar extends Component {
  state = {
    transitionStyle: {}
  }
  scrollBoxInstanceRef = React.createRef()
  onOpenChange = (openKeys) => {
    const { scrollBoxInstanceRef: { current: scrollBoxInstanceRef } } = this
    this.setState({ openKeys })
    if (scrollBoxInstanceRef && scrollBoxInstanceRef.refresh) {
      // 侧边栏高度变化，refresh iscroll
      // setTimeout(() => scrollBoxInstanceRef.refresh(), 500)
    }
  }

  menus = () => {
    const { onOpenChange,
      props: { subRoutes, location: { pathname = '' } } } = this
    const defaultOpenKeys = [...treeWalker(subRoutes, 'child')].filter(route => route.defaultOpen).map(({ path }) => path)
    return (
      <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[pathname]}
          openKeys={this.state.openKeys || defaultOpenKeys}
          defaultOpenKeys={defaultOpenKeys}
          onOpenChange={onOpenChange}
          forceSubMenuRender={true}
          inlineCollapsed={true}
          onClick={(item = {}) => {
            const { key } = item
            if (key.match(/^https?:\/\//)) {
              window.location.href = key
            } else {
              this.props.history.push(item.key)
            }
          }}
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
                        return (
                          <Menu.Item key={ssr.path} className={styles.siderMenuItem}>
                              <NavLink to={ssr.path}>{ssr.path}</NavLink>
                          </Menu.Item>
                          )
                      })
                    }
                  </SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={subRoute.path}>
                    <Icon type="search" />
                    <span>
                      <NavLink className={styles.navLink} to={subRoute.path}>{subRoute.path}</NavLink>
                    </span>
                  </Menu.Item>
                )
              }
            })
          }
        </Menu>
    )
  }

  sider = props => {
    const { props: { bExpandSidebar, } } = this
    return (
      <Sider {...props}
        width={300}
        collapsible
        collapsed={!bExpandSidebar}
        onCollapse={this.props.onCollapse}
        className="hz-common-layout-sider">
        {/* <Scrollbox ref={scrollBoxInstanceRef}> */}
          <this.menus />
        {/* </Scrollbox> */}
      </Sider>
    )
  }

  enterStyles = () => {
    const { isShow, bExpandSidebar } = this.props
    return {
      transition: 'all .2s',
      opacity: isShow ? 0 : 1,
      marginLeft: isShow ? -(bExpandSidebar ? SIDER_WIDTH : SIDER_WIDTH_COLLAPSED) : 0
    }
  }

  endStyles = () => {
    const { isShow, bExpandSidebar } = this.props
    return {
      transition: 'all .2s',
      opacity: isShow ? 1 : 0,
      marginLeft: isShow ? 0 : -(bExpandSidebar ? SIDER_WIDTH : SIDER_WIDTH_COLLAPSED)
    }
  }

  isShow = () => {
    return this.props.isShow
  }

  render() {
    const { motion, isShow } = this.props
    return (
      <TransitionWrapper 
        enterStyles={this.enterStyles}
        endStyles={this.endStyles}
        resetStyles={this.resetStyles}
        isShow={this.isShow}
        >
        {(styles, onTransitionEnd) => {
          if (motion) {
            return <this.sider style={styles} onTransitionEnd={onTransitionEnd} />
          } else {
            return isShow ? <this.sider /> : null
          }
        }}
      </TransitionWrapper>
    )
  }
}


const mapStateToProps = ({ bExpandSidebar, oShowSidebar, privilegeTree: { payload: privilegeTreeData }, subRoutes }) => {
  const { show: isShow, motion } = oShowSidebar
  return {
    bExpandSidebar, isShow, motion, privilegeTreeData, subRoutes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCollapse: () => dispatch({ type: COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonSidebar))
