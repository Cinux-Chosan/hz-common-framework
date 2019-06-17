import React from 'react'
import { Button } from 'untd'
import Layout from '.'
import store from '../../redux'
import * as actions from './action.type'

export default props => {
    return <Layout>
        <div style={{ textAlign: 'center', marginTop: 300 }}>
            {props.children}
            <div style={{paddingTop:20}}>
                <Button onClick={() => store.dispatch({ type: actions.COMMON_LAYOUT_TOGGLE_HEADER })}>头部显示切换</Button>
                <Button onClick={() => store.dispatch({ type: actions.COMMON_LAYOUT_TOGGLE_SIDEBAR })}>侧边栏显示切换</Button>
                <Button onClick={() => store.dispatch({ type: actions.COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE })}>折叠/展开侧边栏</Button>
                <Button onClick={() => store.dispatch({ type: actions.COMMON_LAYOUT_TOGGLE_HEADER_SLIDE })}>头部渐变切换</Button>
                <Button onClick={() => store.dispatch({ type: actions.COMMON_LAYOUT_TOGGLE_SIDEBAR_SLIDE })}>侧边栏渐变切换</Button>
            </div>
        </div>
    </Layout>
}
