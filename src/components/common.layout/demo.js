import React from 'react'
import { Button } from 'untd'
import Layout from '.'
import store from '../../redux'
import * as actions from './action.type'

export default () => {

    return <Layout>
        <div style={{ textAlign: 'center', marginTop: 300 }}>
            <Button onClick={() => store.dispatch({ type: actions.COMMON_LAYOUT_TOGGLE_HEADER })}>头部显示切换</Button>
            <Button onClick={() => store.dispatch({ type: actions.COMMON_LAYOUT_TOGGLE_SIDEBAR })}>侧边栏显示切换</Button>
            <Button onClick={() => store.dispatch({ type: actions.COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE })}>栏切换折叠切换</Button>
        </div>
    </Layout>
}
