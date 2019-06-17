import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon } from 'untd'
import { connect } from 'react-redux'
import { TransitionMotion, spring } from 'react-motion'
import { Link } from 'react-router-dom'
import styles from './style.less'
const { Header } = Layout

const defaultOpaqueConfig = { stiffness: 300, damping: 26 }

// 头部高度
const HEADER_HEIGHT = 64

const menu = (
  <Menu>
    <Menu.Item key={1}>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
        </a>
    </Menu.Item>
    <Menu.Item key={2}>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
        </a>
    </Menu.Item>
    <Menu.Item key={3}>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
        </a>
    </Menu.Item>
    <Menu.Item key={4}>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
        </a>
    </Menu.Item>
    <Menu.Item key={5}>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
        </a>
    </Menu.Item>
  </Menu>
);


export class CommonHeader extends Component {

  navLink = () => {
    const { privilegeTreeData } = this.props
    console.log(privilegeTreeData);
    return <Menu
      className={styles.menuBox}
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '64px' }}
    >
      {/* {menu} */}
      {privilegeTreeData.map((nav) => {
        return <Menu.Item key={nav.path}>
          <Link to={nav.path}>{nav.path}</Link>
          {/* <a href={nav.path}> {nav.path}</a> */}
        </Menu.Item>
      })}
    </Menu>
  }

  header = (props) => {
    const { privilegeTreeData } = this.props
    console.log(privilegeTreeData);
    return (
      <Header {...props} className="hz-common-layout-header">
        <div className={styles.logo}>
          <div className={styles.logoImgWrapper}>
            <img src='https://github.com/skipjack.png?size=90' alt="logo" />
          </div>
          Platform Name
        </div>
        <div className={styles.navMenuAndUserInfo}>
          <Dropdown overlay={menu} placement="bottomCenter">
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
export default connect(mapStateToProps)(CommonHeader)
