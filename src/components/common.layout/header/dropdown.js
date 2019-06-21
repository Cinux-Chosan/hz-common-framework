import React from 'react'
import { Menu } from 'untd'

export default () => {
    return (
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
    )
}