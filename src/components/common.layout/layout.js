import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Spin } from 'untd'
import Header from './header/'
import Sidebar from './sidebar/'
import styles from './style.less'
import { COMMON_LAYOUT_TOGGLE_SIDEBAR, COMMON_LAYOUT_SHOW_SIDEBAR, COMMON_LAYOUT_HIDE_SIDEBAR } from './action.type'

import { getPrivilegeMenusTree, getPrivilegeMenus } from '../../libs/userRole';

const { Content } = Layout
export class CommonLayout extends Component {

    state = { isLoading: true }

    componentDidMount() {
        window.xxx = this.props.setSidebarVisibility.bind(this)
        setTimeout(() => {
            // this.props.setSidebarVisibility(false)
            this.setState({ isLoading: false })
        }, )

        // getPrivilegeMenus().then(res => console.log(res, 111));
        getPrivilegeMenusTree().then(res => console.log(res, '22222')).catch(res => console.log(res, 'cccc'));
    }

    layout = () => {
        const { bShowSidebar, bShowHeader } = this.props
        return (
            <Layout>
                {/* Page Header */}
                {bShowHeader ? <Header /> : null}
                {/* Main Page */}
                <Layout>
                    {/* Left side bar */}
                    {bShowSidebar ? <Sidebar /> : null}
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
        const { isLoading } = this.state
        return isLoading ? <Spin className={styles.spin} size="large"/> : <this.layout />
    }
}

const mapStateToProps = ({ bShowSidebar, bShowHeader }) => {
    return {
        bShowSidebar, bShowHeader
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
