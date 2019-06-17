import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon } from 'untd'
import { connect } from 'react-redux'
import { TransitionMotion, spring } from 'react-motion'
import { NavLink } from 'react-router-dom'
import { withRouter, matchPath } from "react-router";
import DropdownMenu from './dropdown'

import styles from './style.less'
import { getPathLevel } from '../router.config';
const { Header } = Layout

const defaultOpaqueConfig = { stiffness: 300, damping: 26 }

// 头部高度
const HEADER_HEIGHT = 64

export class CommonHeader extends Component {
  state = {}
  navLink = () => {
    const { privilegeTreeData, location: { pathname = '' } } = this.props
    console.log(this.props);
    
    const activeRouteKey = getPathLevel(pathname, 2)
    const { path: activeIfHttp } = privilegeTreeData.find(route => !window.location.href.indexOf(route.path)) || {}
    return <Menu
      className={styles.menuBox}
      theme="dark"
      mode="horizontal"
      selectedKeys={[activeRouteKey, activeIfHttp]}
      style={{ lineHeight: '64px' }}
    >
      {privilegeTreeData.map((nav) => {
        return (
          <Menu.Item key={nav.path}>
            {nav.path.match(/^https?:\/\//) ? <a href={nav.path}>{nav.path}</a> : <NavLink to={nav.path}>{nav.path}</NavLink>}
          </Menu.Item>
        )
      })}
    </Menu>
  }

  header = (props) => {
    const { privilegeTreeData } = this.props
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

  motionStyle = () => {
    const { motion, isShow } = this.props
    if (isShow) {
      return [{ style: { marginTop: motion ? spring(0, { ...defaultOpaqueConfig, ...motion }) : 0 }, key: 'CommmonHeader' }]
    } else {
      return []
    }
  }

  motionWillEnter = () => {
    return { marginTop: -HEADER_HEIGHT }
  }

  motionWillLeave = () => {
    const { motion } = this.props
    return { marginTop: motion ? spring(-HEADER_HEIGHT, { ...defaultOpaqueConfig, ...motion }) : -HEADER_HEIGHT }
  }

  render() {
    return <TransitionMotion
      styles={this.motionStyle}
      willEnter={this.motionWillEnter}
      willLeave={this.motionWillLeave}
    >
      {interpolatedStyles => (
        <>
          {interpolatedStyles.map(config => <this.header key={config.key} style={config.style} />)}
        </>
      )}
    </TransitionMotion>
  }
}

const mapStateToProps = ({ oShowHeader, privilegeTree: { payload: privilegeTreeData } }) => {
  const { bShow: isShow, motion } = oShowHeader
  return { privilegeTreeData, isShow, motion }
}
export default connect(mapStateToProps)(withRouter(CommonHeader))
