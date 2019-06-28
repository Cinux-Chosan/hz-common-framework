import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon } from 'untd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter, matchPath } from "react-router";
import DropdownMenu from './dropdown'
import { COMMON_LAYOUT_SET_SUB_ROUTES } from '../action.type'
import styles from './style.less'
import { TransitionWrapper } from '../transition.comp';
const { Header } = Layout

// 头部高度
const HEADER_HEIGHT = 64

export class CommonHeader extends Component {
  state = {}
  
  navLink = () => {
    const { privilegeTreeData, location: { pathname = '' } } = this.props
    return <Menu
      className={styles.menuBox}
      theme="dark"
      mode="horizontal"
      selectedKeys={[]}
      style={{ lineHeight: '64px' }}
      onClick={({ item }) => {
        // this.props.setSubRoute(item.props.nav.child)
      }}
    >
      {privilegeTreeData.map((nav) => {
        // path 是否以 http 开头
        const isHttp = nav.path.match(/^https?:\/\//)
        // 判断含有 http 的 path 是否被激活，判断依据为当前 url 是否包含 path
        const isHttpActive = isHttp && !window.location.href.indexOf(nav.path)
        // 判断 path 是否与 react-router#location 匹配
        const isMatchByRouter = matchPath(this.props.location.pathname, nav.path)
        // 上述 2 种任意匹配即认为路由为激活状态，设置子路由数据
        if (isHttpActive || isMatchByRouter) {
          setTimeout(() => this.props.setSubRoute(nav.child), )
        }
        return (
          <Menu.Item key={nav.path} nav={nav} className={styles.headerMenuItem}>
            {isHttp
              ? <a href={nav.path} target={nav.target || '_self'} className={[styles.navItem, isHttpActive ? 'active' : ''].join(' ')}>{nav.path}</a>
              : <NavLink to={nav.path} className={styles.navItem}>{nav.path}</NavLink>}
          </Menu.Item>
        )
      })}
    </Menu>
  }

  header = (props) => {
    return (
      <Header {...props} className="hz-common-layout-header">
        <div className={styles.logo}>
          <div className={styles.logoImgWrapper}>
            <img src='https://github.com/skipjack.png?size=90' alt="logo" />
          </div>
          Platform Name
        </div>
        <div className={styles.navMenuAndUserInfo}>
          <Dropdown overlay={DropdownMenu} placement="bottomCenter">
            <div className={styles.userInfo}>
              <span className={styles.userName}>
                用户名<Icon className={styles.userInfoDropDownIcon} type="down" />
              </span>
            </div>
          </Dropdown>
          <div className={styles.navMenuWidgetContainer}>
            {this.props.widgets}
          </div>
          <this.navLink />
        </div>
      </Header>
    )
  }

  enterStyles = () => {
    const { motion, isShow } = this.props
    return {
      transition: motion ? 'all .2s' : 'none',
      opacity: isShow ? 0 : 1,
      marginTop: isShow ? -HEADER_HEIGHT : 0
    }
  }

  endStyles = () => {
    const { motion, isShow } = this.props
    return {
      transition: motion ? 'all .2s' : 'none',
      opacity: isShow ? 1 : 0,
      marginTop: isShow ? 0 : -HEADER_HEIGHT
    }
  }

  isShow = () => {
    return this.props.isShow
  }

  render() {
    return (
      <TransitionWrapper
        enterStyles={this.enterStyles}
        endStyles={this.endStyles}
        isShow={this.isShow}
        >
        {(styles, onTransitionEnd) => {
          return styles ? <this.header style={styles} onTransitionEnd={onTransitionEnd} /> : null
        }}
      </TransitionWrapper>
    )
  }
}

const mapStateToProps = ({ oShowHeader, privilegeTree: { payload: privilegeTreeData } }) => {
  const { bShow: isShow, motion } = oShowHeader
  return { privilegeTreeData, isShow, motion }
}

const mapDispatchToProps = dispatch => {
  return {
    setSubRoute: payload => dispatch({ type: COMMON_LAYOUT_SET_SUB_ROUTES, payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonHeader))
