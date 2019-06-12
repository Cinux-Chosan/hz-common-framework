import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon } from 'untd'
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
  
  
export default class extends Component {
    render() {
        return <Header className="hz-common-layout-header">
            <div className={styles.logo}>
                <div className={styles.logoImgWrapper}>
                    <img src='https://github.com/skipjack.png?size=90' alt="logo" />
                </div>
                Platform Name
            </div>
            <div className={styles.userInfo}>
                <Dropdown overlay={menu}>
                    <span className={styles.userName}>
                        用户名<Icon type="down" />
                    </span>
                </Dropdown>
            </div>
            <Menu
                className={styles.menuBox}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Header>
    }
}
