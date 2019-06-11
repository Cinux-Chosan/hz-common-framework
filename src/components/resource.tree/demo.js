import React from 'react';
import { Icon } from 'antd';
import ResourceTree from '.';

const btn = (props) => {
    if (props.node.collected) {
        return <Icon type="star" theme={'outlined'} onClick={e => {
            props.node.collected = !props.node.collected;
            props.forceUpdate();
        }} />
    } else {
        return <Icon type="twitter" theme={props.node.collected ? 'filled' : 'outlined'} onClick={e => {
            props.node.collected = !props.node.collected;
            props.forceUpdate();
        }} />
    }
}

const statusIcon = (props) => {
    return <Icon type="info-circle" onClick={e => {
        console.log(props)
    }} />
}

const subMenuTools = ({ node: { statistics_status } }) => {
    if (statistics_status) {
        return (<span style={{ marginLeft: '1em' }}>
            <Icon type="exclamation-circle" theme="twoTone" /> {statistics_status[0]}
            <Icon type="stop" theme="twoTone" /> {statistics_status[1]}
        </span>)
    } else {
        return null;
    }
}

export default () => {
    return (
        <ResourceTree
            // 自定义状态图标 StatusIcon:Component（每一项最前面）
            StatusIcon={statusIcon}
            // 自定义工具按钮 toolBtns:Array<Component>（每一项最后的按钮，可多个）
            toolBtns={[btn]}
            // 非叶子节点状态信息，即资源树子节点状态统计信息
            SubMenuTools={subMenuTools}
            // --------------------------------------
            // 搜索框 placeholder
            // searchPlaceholder = "搜索框 placeholder"
            // --------------------------------------
            // 是否允许多选
            // multiple
            // --------------------------------------
            // 查询参数，会被用于 url query params
            queries={{
                // 资源 identity，需要使用方传入
                identity: "UDM",
                // 
                type: 1,
                // 
                statistics_node_type: 5
            }}

        />
    )
}