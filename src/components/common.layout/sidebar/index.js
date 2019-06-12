import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'untd'
import { Scrollbox } from 'untd'
const { SubMenu } = Menu
const { Sider } = Layout

export default class extends Component {
  scrollBoxInstanceRef = React.createRef()
  onOpenChange = () => {
    // const { scrollBoxInstanceRef: { current: scrollBoxInstanceRef } } = this
    // if (scrollBoxInstanceRef.refresh) {
    //   setTimeout(() => scrollBoxInstanceRef.refresh(), 300)
    // }
  }
  render() {
    const { scrollBoxInstanceRef, onOpenChange } = this
    return (
      <Sider collapsible width={300} className="hz-common-layout-sider">
        <Scrollbox ref={scrollBoxInstanceRef}>
          <Menu
            mode="inline"
            theme="dark"
            onOpenChange={onOpenChange}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>
                    subnav 1
                  </span>
                </span>
              }
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  <span>
                    subnav 2
                  </span>
                </span>
              }
            >
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />
                  <span>
                    subnav 3
                  </span>
                </span>
              }
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="13">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Scrollbox>
      </Sider>
    )
  }
}
