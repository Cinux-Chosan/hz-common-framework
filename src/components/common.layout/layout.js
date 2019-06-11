import React, { Component } from 'react'
import { Layout } from 'untd'
import Header from './header/'
import Sidebar from './sidebar/'

const { Content } = Layout
export default class extends Component {
    render() {
        return (
            <Layout>
                {/* Page Header */}
                <Header>
                    aaa
                </Header>
                {/* Main Page */}
                <Layout>
                    {/* Left side bar */}
                    <Sidebar></Sidebar>
                    <Layout>
                        {/* Page Content */}
                        <Content>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}