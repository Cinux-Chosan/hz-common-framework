import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import styles from './style.scss'
const { Header } = Layout

export default class extends Component {
    render() {
        return <Header>
            <div className={styles.logo} />
            <Menu
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