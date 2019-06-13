import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon } from 'untd'
import { connect } from 'react-redux'
import styles from './style.less'
const { Header } = Layout


const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
        </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
        </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
        </a>
    </Menu.Item>
  </Menu>
);


export class CommonHeader extends Component {


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
      {privilegeTreeData.map(nav => {
        return <Menu.Item key={nav.path}>{nav.name}</Menu.Item>
      })}
    </Menu>
  }


  render() {
    const { privilegeTreeData } = this.props
    return <Header className="hz-common-layout-header">
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
      <this.navLink />
    </Header>
  }
}

const mapStateToProps = ({ privilegeTree: { payload: privilegeTreeData } }) => ({ privilegeTreeData })
export default connect(mapStateToProps)(CommonHeader)
