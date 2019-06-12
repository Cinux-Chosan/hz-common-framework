import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Spin } from 'untd'
import Header from './header/'
import Sidebar from './sidebar/'
import { COMMON_LAYOUT_TOGGLE_SIDEBAR, COMMON_LAYOUT_SHOW_SIDEBAR, COMMON_LAYOUT_HIDE_SIDEBAR } from './action.type'
const { Content } = Layout
export class CommonLayout extends Component {
    componentDidMount() {
        debugger
        setTimeout(() => this.props.setSidebarVisibility(false), 100)
    }
    render() {
        const { showSidebar } = this.props
        return (
            <Layout>
                {/* Page Header */}
                <Header />
                {/* Main Page */}
                <Layout>
                    {/* Left side bar */}
                    {showSidebar ? <Sidebar /> : null}
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

const mapStateToProps = ({ showSidebar }) => {
    return {
        showSidebar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSidebar: () => dispatch({ type: COMMON_LAYOUT_TOGGLE_SIDEBAR }),
        setSidebarVisibility: isSHow => dispatch({ type: isSHow ? COMMON_LAYOUT_SHOW_SIDEBAR : COMMON_LAYOUT_HIDE_SIDEBAR })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonLayout)
