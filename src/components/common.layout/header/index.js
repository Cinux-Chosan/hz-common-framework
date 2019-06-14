import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon } from 'untd'
import { connect } from 'react-redux'
import { TransitionMotion, spring } from 'react-motion'
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
  </Menu>
);


export class CommonHeader extends Component {

  state = { collapsed: false }

  componentDidMount() {
    window.yyy = () => this.props.dispatch({ type: 'COMMON_LAYOUT_TOGGLE_HEADER_SLIDE' })
    window.xxx = () => this.props.dispatch({ type: 'COMMON_LAYOUT_TOGGLE_HEADER' })
  }

  navLink = () => {
    const { privilegeTreeData } = this.props
    console.log(privilegeTreeData)
    return <Menu
      className={styles.menuBox}
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      {privilegeTreeData.map((nav, index) => {
        return <Menu.Item key={nav.path || index}>{nav.name}</Menu.Item>
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
        <Dropdown overlay={menu} placement="bottomCenter">
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              用户名<Icon type="down" />
            </span>
          </div>
        </Dropdown>
        {/* <this.navLink /> */}
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

  render() {
    const { motion } = this.props
    return <TransitionMotion
      styles={this.motionStyle}
      willEnter={() => ({ marginTop: -HEADER_HEIGHT })}
      willLeave={() => ({ marginTop: motion ? spring(-HEADER_HEIGHT, { ...defaultOpaqueConfig, ...motion }) : -HEADER_HEIGHT })}
    >
      {interpolatedStyles => (
        <>
          {interpolatedStyles.map(config => <this.header key={config.key} style={{ ...config.style }} />)}
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
