import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Spin } from 'untd'
import Header from './header/'
import Sidebar from './sidebar/'
import styles from './style.less'
import {
    COMMON_LAYOUT_TOGGLE_SIDEBAR,
    COMMON_LAYOUT_SHOW_SIDEBAR,
    COMMON_LAYOUT_HIDE_SIDEBAR,
    GET_PRIVILEGE_MENU_TREE
} from './action.type'


const { Content } = Layout
export class CommonLayout extends Component {

    constructor(props) {
        super(props)
        this.props.getPrivilegeMenusTree()
    }

    layout = () => {
        return (
            <Layout>
                {/* Page Header */}
                <Header />
                {/* Main Page */}
                <Layout>
                    {/* Left side bar */}
                    <Sidebar />
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

    render() {
        const { privilegeTree: { isLoading } } = this.props
        console.log(isLoading)
        return isLoading ? <Spin className={styles.spin} size="large" /> : <this.layout />
    }
}

const mapStateToProps = ({ privilegeTree }) => {
    return {
        privilegeTree
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSidebar: () => dispatch({ type: COMMON_LAYOUT_TOGGLE_SIDEBAR }),
        setSidebarVisibility: isSHow => dispatch({ type: isSHow ? COMMON_LAYOUT_SHOW_SIDEBAR : COMMON_LAYOUT_HIDE_SIDEBAR }),
        getPrivilegeMenusTree: () => dispatch({ type: GET_PRIVILEGE_MENU_TREE })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonLayout)
